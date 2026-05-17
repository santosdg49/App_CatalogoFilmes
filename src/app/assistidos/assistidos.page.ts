import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistidos',
  templateUrl: './assistidos.page.html',
  styleUrls: ['./assistidos.page.scss'],
  standalone: false
})
export class AssistidosPage implements OnInit {

  filmes: any[] = [];

  constructor(
    private router: Router
  ) {}

  ngOnInit() {

    this.carregarFilmes();

  }

  ionViewWillEnter() {

    this.carregarFilmes();

  }

  carregarFilmes() {

    this.filmes =
      JSON.parse(localStorage.getItem('filmesAssistidos') || '[]');

  }

  voltarInicio() {

    this.router.navigate(['/inicio']);

  }

  abrirDetalhes(id: number) {

    this.router.navigate(['/detalhes', id]);

  }

  removerFilme(id: number) {

    this.filmes =
      this.filmes.filter(f => f.id !== id);

    localStorage.setItem(
      'filmesAssistidos',
      JSON.stringify(this.filmes)
    );

  }

  getPoster(path: string) {

    if (!path) {
      return '';
    }

    return `https://image.tmdb.org/t/p/w500${path}`;

  }

}