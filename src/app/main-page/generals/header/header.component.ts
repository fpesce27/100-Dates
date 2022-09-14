import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/login/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private loginService : LoginServiceService) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/login']);
  }

  estaLogeado(){
    return this.loginService.isLoged();
  }

  logout(){
    this.loginService.logout();
  }

}
