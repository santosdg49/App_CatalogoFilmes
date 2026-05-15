import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  ToastController
} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ContaPage {

  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  async criarConta() {

    if (
      !this.nome ||
      !this.email ||
      !this.senha ||
      !this.confirmarSenha
    ) {
      this.mostrarToast('Preencha todos os campos');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mostrarToast('As senhas não coincidem');
      return;
    }

    // salva usuário no localStorage
    const usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    localStorage.setItem(
      'usuarioCinephile',
      JSON.stringify(usuario)
    );

    this.mostrarToast('Conta criada com sucesso!');

    // redireciona para login
    this.router.navigate(['/login']);
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