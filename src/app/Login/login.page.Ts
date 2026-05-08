import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  username: string = '';
  email: string = '';

  constructor(private router: Router) {}

  entrar() {
    if (this.username && this.email) {
      console.log("Usuário:", this.username);
      console.log("Email:", this.email);

      // depois podemos redirecionar para home
      this.router.navigate(['/home']);
    } else {
      alert("Preencha todos os campos!");
    }
  }

  login() {
    this.router.navigate(['Home&Busca'])
  }

}