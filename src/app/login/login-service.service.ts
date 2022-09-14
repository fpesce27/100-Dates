import { Injectable } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private router: Router, private cookies : CookieService) { }

  token : string;
  userUid : string;

  login(email : string, password : string){
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        firebase.auth().currentUser?.getIdToken().then(
          token => {
            this.userUid = firebase.auth().currentUser!.uid;
            this.cookies.set("userUid", this.userUid);
            this.token = token;
            this.cookies.set("token", this.token);
            this.router.navigate(['/']);
          }
        )
      })
  }
  getIdToken(){
    return this.cookies.get("token");
  }

  getUserUid(){
    return this.cookies.get("userUid"); 
  }

  isLoged(){
    return this.cookies.get("token");
  }

  logout(){
    firebase.auth().signOut().then(() => {
      this.token = "";
      this.cookies.set("token", this.token);
      this.router.navigate(['/login']);
    });
  }

  register(email:string, password : string){
    firebase.app().auth().createUserWithEmailAndPassword(email, password).then(
      response => {
        firebase.auth().currentUser?.getIdToken().then(
          token => {
            this.token = token;
            this.cookies.set("token", this.token);
            this.router.navigate(['/']);
          }
        )
      })
  }
}
