import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { LoginServiceService } from 'src/app/login/login-service.service';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private url : string = environment.apiUrl;
  token : string
  user_id = 1

  constructor(
    private http : HttpClient,
    private loginService : LoginServiceService
    ) {
      this.token = this.loginService.getIdToken();
     }


  public datesGet(user_id : string){
    return this.http.get(this.url + "/datos/" + user_id + ".json?auth=" + this.token);
  }

  public datePost(date : Date, user_id : string){
    return this.http.post(this.url + "/datos/" + user_id + ".json?auth=" + this.token, date);
  }

  public dateDelete(date_id : string, user_id : string){
    return this.http.delete(this.url + "/datos/" + user_id + "/" + date_id + ".json?auth=" + this.token);
  }

  public datePut(date : Date, date_id : string, user_id : string){
    return this.http.put(this.url + "/datos/" + user_id + "/" + date_id + ".json?auth=" + this.token, date);
  }
}
