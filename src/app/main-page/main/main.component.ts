import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/login/login-service.service';
import { CargandoServiceService } from './cargando/cargando-service.service';
import { ApiServiceService } from './extras/api-service.service';
import { Date } from './extras/date';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  datosObtenidos : Date[];
  getData(user_id : string){
    this.cargandoService.requestStarted();
    this.api.datesGet(user_id).subscribe((data: any) => {
      if (data != null){
        //convert data to array
        let key = Object.keys(data);
        data = Object.values(data);
        // add key as an id in data
        for (let i = 0; i < data.length; i++) {
        data[i].id = key[i];
      }
      this.datosObtenidos = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else{
      this.dataSource = new MatTableDataSource();
    }
    this.cargandoService.requestEnded();
  });
}

  displayedColumns: string[] = ['dateNumber','name', 'horario', 'planeacion_previa', 'actions'];
  dataSource : MatTableDataSource<Date>;
  logged : boolean = false;
  user_id : string;
  progress = 0
  completado : boolean

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private api : ApiServiceService,
    private loginService : LoginServiceService,
    private router : Router,
    private cargandoService : CargandoServiceService
  ) {
    try {
      this.user_id = this.loginService.getUserUid();
      this.getData(this.user_id);

      this.logged = this.loginService.isLoged() ? true : false;
      if (this.logged == false){
        this.router.navigate(['/login']);
        this.cargandoService.resetCargador();
      }
    } catch (error) {
      this.router.navigate(['/login']);
      this.cargandoService.resetCargador();
    }
  }
  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRow(row: any) {
    const dialogRef = this.dialog.open(EditDialogComponent, {data : {name : row.name, horario : row.horario, planeacion_previa : row.planeacion_previa}});

    dialogRef.afterClosed().subscribe(result => {

      result.name = null ? row.name : result.name;

      if (result.horario == 0){
        result.horario = "Mañana";
      }
      else if (result.horario == 1){
        result.horario = "Tarde";
      }
      else if (result.horario == 2){
        result.horario = "Noche";
      }
      else if (result.horario == 3){
        result.horario = "Indeterminado"
      }
      else{
        result.horario = row.horario;
      }

      if (result.planeacion_previa == "true"){
        result.planeacion_previa = "Si";
      }
      else if (result.planeacion_previa == "false"){
        result.planeacion_previa = "No";
      }
      else{
        result.planeacion_previa = row.planeacion_previa;
      }

      //replace the edited row with the new one
      this.api.datePut(result, row.id, this.user_id).subscribe((data: any) => {});
      this.dataSource.data[this.dataSource.data.indexOf(row)] = result;
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteRow(e : any, row : any) {
    row.delete = true
    this.progress = e / 10;
    if (this.progress > 150) {
      this.api.dateDelete(row.id, this.user_id).subscribe((data: any) => {});
      this.dataSource.data.splice(row.id, 1);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.progress = 0;
    }
  }

  addRow(){
    const dialogRef = this.dialog.open(AddDialogComponent, {data : {name : "", horario : "", planeacion_previa : "", completed : false}});

    dialogRef.afterClosed().subscribe(result => {

      result.name = result.name.charAt(0).toUpperCase() + result.name.slice(1);

      if (result.horario == 0){
        result.horario = "Mañana";
      }
      else if (result.horario == 1){
        result.horario = "Tarde";
      }
      else if (result.horario == 2){
        result.horario = "Noche";
      }
      else{
        result.horario = "Indeterminado"
      }

      if (result.planeacion_previa == "true"){
        result.planeacion_previa = "Si";
      }
      else{
        result.planeacion_previa = "No";
      }

      this.api.datePost(result, this.user_id).subscribe((data: any) => {});
      this.dataSource.data.push(result);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  randomDate(){
    //select a random date from the list
    let random = Math.floor(Math.random() * this.dataSource.data.length);
    let citaRandom = this.dataSource.data[random];
    //open dialog with the random date
    const dialogRef = this.dialog.open(RandomDialogComponent, {data : {name : citaRandom.name, horario : citaRandom.horario, planeacion_previa : citaRandom.planeacion_previa}, width: '500px'});
  }

  completed(e : any, row : any){
    row.completed = true;
    this.progress = e / 10;
    if (this.progress > 150){
      row.completed = true;
      this.api.datePut(row, row.id, this.user_id).subscribe((data: any) => {});
      this.progress = 0;
    }
    row.completed = false;
  }
}

@Component({
  selector: 'editDialogComponent',
  templateUrl: 'dialogs/editDialogComponent.html',
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date,
  ) { }

  save(){
    this.dialogRef.close(this.data);
  }

  cancel(){
    this.dialogRef.close();
  }
}

@Component({
  selector: 'deleteDialogComponent',
  templateUrl: 'dialogs/deleteDialogComponent.html',
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date,
  ) { }

  confirm(){
    this.dialogRef.close(true);
  }

  cancel(){
    this.dialogRef.close();
  }
}

@Component({
  selector: 'addDialogComponent',
  templateUrl: 'dialogs/addDialogComponent.html',
})
export class AddDialogComponent {

  nameFormControl = new FormControl('', [Validators.required])
  horarioFormControl = new FormControl('', [Validators.required])
  planeacionFormControl = new FormControl('', [Validators.required])

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date,
    private cdr : ChangeDetectorRef
  ) { }

  add(){
    this.dialogRef.close(this.data);
  }

  cancel(){
    this.dialogRef.close();
  }
}

@Component({
  selector: 'randomDialogComponent',
  templateUrl: 'dialogs/randomDialogComponent.html',
})
export class RandomDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RandomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date,
  ) { }

  close(){
    this.dialogRef.close();
  }
}
