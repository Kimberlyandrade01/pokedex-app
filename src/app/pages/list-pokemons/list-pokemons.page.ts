import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonItem, IonLabel, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonThumbnail } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, IonList, IonInfiniteScrollContent, IonInfiniteScroll, IonButton, IonLabel, IonItem, IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonThumbnail]
})
export class ListPokemonsPage implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  loading = false;
  searchTerm = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    if (this.loading) return;
    this.loading = true;
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe(list => {
      // por cada entry, pedir detalles
      const calls = list.map((p: any) =>
        this.pokemonService.getPokemonByNameOrId(p.name).toPromise()
      );
      Promise.all(calls).then(fullData => {
        this.pokemons.push(...fullData);
        this.offset += this.limit;
        this.loading = false;
        if (event) event.target.complete();
      }).catch(err => {
        console.error(err);
        this.loading = false;
        if (event) event.target.complete();
      });
    }, err => {
      console.error(err);
      this.loading = false;
      if (event) event?.target?.complete();
    });
  }

  // filtro local por nombre
  onSearchChange(ev: any) {
    this.searchTerm = ev.detail.value?.toLowerCase() || '';
  }

  // navegar a detalle (agrega navegación simple)
  openDetail(pokemon: any, navCtrl: any) {
    // aquí usar Router para navegar, p.e. /pokemon-detail/:id
  }
}