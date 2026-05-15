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

    // verifica se existe usuário salvo
    const usuarioSalvo = localStorage.getItem('usuarioCinephile');

    // se não existir conta
    if (!usuarioSalvo) {

      await this.mostrarToast(
        'Nenhuma conta encontrada. Crie uma conta primeiro.'
      );

      this.router.navigate(['/conta']);
      return;
    }

    // converte JSON para objeto
    const usuario = JSON.parse(usuarioSalvo);

    // valida login
    if (
      this.email === usuario.email &&
      this.senha === usuario.senha
    ) {

      console.log('Login realizado com sucesso!');

      // salva sessão simples
      localStorage.setItem('usuarioLogado', 'true');

      await this.mostrarToast('Login realizado com sucesso!');


    } else {

      await this.mostrarToast('Email ou senha inválidos');
      this.criarConta();
    }

  }

  criarConta() {
    this.router.navigate(['/conta']);
  }

  login() {
    this.router.navigate(['/home']);
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