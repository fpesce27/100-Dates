import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargandoServiceService {

  private count = 0
  private cargado = new BehaviorSubject<string>("");

  constructor() { }

  getCargado() : Observable<string>{
    return this.cargado.asObservable();
  }

  requestStarted(){
    if (this.count++ === 0){
      this.cargado.next("start");
    }
  }

  requestEnded(){
    if (--this.count === 0 || this.count === 0){
      this.cargado.next("stop");
    }
  }

  resetCargador(){
    this.count = 0;
    this.cargado.next("stop");
  }
}
