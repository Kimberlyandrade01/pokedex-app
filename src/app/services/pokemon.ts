// src/app/services/pokemon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  // lista paginada: limit y offset
  getPokemons(limit = 20, offset = 0) {
    return this.http.get<{results:any[]}>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        map((res: any) => res.results) // devuelve array con { name, url }
      );
  }

  // detalles de un pokemon por nombre o id
  getPokemonByNameOrId(nameOrId: string | number) {
    return this.http.get(`${this.baseUrl}/pokemon/${nameOrId}`);
  }

  // opcional: obtener imagen directa (sprites)
  getPokemonSprite(pokemonData: any) {
    // ejemplo de acceso a sprite: pokemonData.sprites.front_default
    return pokemonData?.sprites?.front_default || null;
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
