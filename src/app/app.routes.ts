import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'list-pokemons',
    loadComponent: () => import('./pages/list-pokemons/list-pokemons.page').then( m => m.ListPokemonsPage)
  },
  {
    path: 'pokemon-detail/:id',
    loadComponent: () => import('./pages/pokemon-detail/pokemon-detail.page').then(m => m.PokemonDetailPage)
  },
];
