import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: false
})
export class DetalhesPage implements OnInit {

  apiKey = '0addb9c264e21b7a959566dd9ff2cc27';

  filme: any;

  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.buscarDetalhes(id);

  }

  buscarDetalhes(id: any) {

    const url =
    `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=pt-BR&append_to_response=credits,recommendations`;

    this.http.get(url).subscribe((res: any) => {

      this.filme = res;

      this.carregando = false;

    });

  }

  voltarInicio() {

    this.router.navigate(['/inicio']);

  }

  getPoster(path: string) {

    if (!path) {
      return '';
    }

    return `https://image.tmdb.org/t/p/w500${path}`;

  }

  getBackdrop(path: string) {

    if (!path) {
      return '';
    }

    return `https://image.tmdb.org/t/p/original${path}`;

  }

  pegarDiretor() {

    if (!this.filme?.credits?.crew) {
      return 'Unknown';
    }

    const diretor = this.filme.credits.crew.find(
      (pessoa: any) => pessoa.job === 'Director'
    );

    return diretor ? diretor.name : 'Unknown';

  }

  adicionarAssistidos() {

    let assistidos =
      JSON.parse(localStorage.getItem('filmesAssistidos') || '[]');

    const jaExiste = assistidos.find(
      (filme: any) => filme.id === this.filme.id
    );

    if (!jaExiste) {

      assistidos.push(this.filme);

      localStorage.setItem(
        'filmesAssistidos',
        JSON.stringify(assistidos)
      );

      this.mostrarToast('Adicionado a assistidos');

    } else {

      this.mostrarToast('Filme já esta na lista de assistidos');

    }

  }

  async mostrarToast(mensagem: string) {

    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'top',
      color: 'dark'
    });

    await toast.present();

  }

  abrirDetalhes(id: number){
    this.router.navigate(['/detalhes', id]);
  }

}