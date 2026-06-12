import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  username: string = '';
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  async entrar() {

    // verifica se existe conta criada
    const usuarioSalvo = localStorage.getItem('usuarioCinephile');

    if (!usuarioSalvo) {

      await this.mostrarToast(
        'Nenhuma conta encontrada. Crie uma conta.'
      );

      return;
    }

    // converte para objeto
    const usuario = JSON.parse(usuarioSalvo);

    // autenticação pela senha e email
    if (this.senha === usuario.senha && this.email === usuario.email) {

      localStorage.setItem('usuarioLogado', 'true');

      await this.mostrarToast(
        'Login realizado com sucesso!'
      );

      this.router.navigate(['/inicio']);

    } else {

      await this.mostrarToast(
        'Senha ou email do usuário incorretos'
      );

    }

  }

  criarConta() {
    this.router.navigate(['/conta']);
  }

  async mostrarToast(msg: string) {

    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color: 'dark'
    });

    await toast.present();

  }

}