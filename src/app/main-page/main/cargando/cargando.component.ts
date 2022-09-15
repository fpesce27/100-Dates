import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { CargandoServiceService } from './cargando-service.service';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CargandoComponent implements OnInit {

  cargando : boolean = false;

  constructor(
    private cargandoService : CargandoServiceService,
    private cdr : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargandoService.getCargado().subscribe((data : string) => {
      this.cargando = data === "start";
      this.cdr.detectChanges();
    });
  }

}
