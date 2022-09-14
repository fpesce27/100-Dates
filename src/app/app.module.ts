import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/material.module';
import { LoginModule } from './login/login.module';
import { MainPageModule } from './main-page/main-page.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import firebase from 'firebase/compat/app';
import { CookieService } from 'ngx-cookie-service';
import { BackgroundComponent } from './background/background.component';

@NgModule({
  declarations: [
    AppComponent, BackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LoginModule,
    MainPageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    firebase.initializeApp({
      apiKey: "AIzaSyC-KKyQBkcg5DH0j8gptRtyFnJzJ74bmAI",
      authDomain: "citas-85ff9.firebaseapp.com",
  });
 }
}
