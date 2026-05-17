import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false
})
export class InicioPage implements OnInit {

  apiKey = '0addb9c264e21b7a959566dd9ff2cc27';

  filmes: any[] = [];

  generos: any[] = [];

  busca = '';

  diretor = '';

  generoSelecionado = '';

  anoSelecionado = '';

  duracaoSelecionada = '';

  carregando = false;

  constructor(private http: HttpClient,  private router: Router) {}

  ngOnInit() {
    this.carregarGeneros();
    this.buscarFilmes();
  }

  // =========================
  // GÊNEROS
  // =========================

  carregarGeneros() {

    const url =
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=pt-BR`;

    this.http.get(url).subscribe((res: any) => {

      this.generos = res.genres;

    });

  }

  // =========================
  // BUSCA PRINCIPAL
  // =========================

  buscarFilmes() {

    this.carregando = true;

    let url =
    `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=pt-BR`;

    // ======================
    // GÊNERO
    // ======================

    if (this.generoSelecionado) {

      url += `&with_genres=${this.generoSelecionado}`;

    }

    // ======================
    // ANO
    // ======================

    if (this.anoSelecionado) {

      url += `&primary_release_year=${this.anoSelecionado}`;

    }

    // ======================
    // DURAÇÃO
    // ======================

    if (this.duracaoSelecionada === '90') {

      url += `&with_runtime.lte=90`;

    }

    if (this.duracaoSelecionada === '120') {

      url += `&with_runtime.gte=120`;

    }

    // ======================
    // BUSCA POR NOME
    // ======================

    if (this.busca.trim()) {

      url =
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.busca}&language=pt-BR`;

    }

    this.http.get(url).subscribe((res: any) => {

      this.filmes = res.results;

      // ======================
      // FILTRO DIRETOR
      // ======================

      if (this.diretor.trim()) {

        this.filtrarDiretor();

      } else {

        this.carregando = false;

      }

    });

  }

  // =========================
  // DIRETOR
  // =========================

  filtrarDiretor() {

    const diretorBusca =
      this.diretor.toLowerCase();

    const filmesFiltrados: any[] = [];

    let processados = 0;

    this.filmes.forEach((filme) => {

      const url =
      `https://api.themoviedb.org/3/movie/${filme.id}/credits?api_key=${this.apiKey}`;

      this.http.get(url).subscribe((res: any) => {

        const diretorFilme =
          res.crew.find(
            (pessoa: any) =>
              pessoa.job === 'Director'
          );

        if (
          diretorFilme &&
          diretorFilme.name
            .toLowerCase()
            .includes(diretorBusca)
        ) {

          filmesFiltrados.push(filme);

        }

        processados++;

        if (processados === this.filmes.length) {

          this.filmes = filmesFiltrados;

          this.carregando = false;

        }

      });

    });

  }

  // =========================
  // POSTER
  // =========================

  getPoster(path: string) {

    return `https://image.tmdb.org/t/p/w500${path}`;

  }

  abrirDetalhes(id: number){
    this.router.navigate(['/detalhes', id]);
  }

}