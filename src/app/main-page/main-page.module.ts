import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { GeneralsModule } from './generals/generals.module';
import { AddDialogComponent, DeleteDialogComponent, EditDialogComponent, MainComponent, RandomDialogComponent } from './main/main.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BackgroundComponent } from '../background/background.component';
import { HoldableDirective } from './holdable.directive';
import { CargandoComponent } from './main/cargando/cargando.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    MainComponent, EditDialogComponent, DeleteDialogComponent, AddDialogComponent, RandomDialogComponent, HoldableDirective, CargandoComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    GeneralsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  exports: [
    CargandoComponent
  ]
})
export class MainPageModule { }
