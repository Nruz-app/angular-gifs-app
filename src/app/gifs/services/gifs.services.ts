
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalStoage = () => {

    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '[]';
    return JSON.parse(gifsFromLocalStorage);

}


@Injectable({providedIn: 'root'})
export class GifsService {

  private readonly http = inject(HttpClient);

  trendingGifsLoading = signal<boolean>(false);
  private trendingPage = signal(0);


  trendingGifs = signal<Gif[]>([]);

  /**********************************************************************************
  * * Record<string,Gif[]> => Se Asigna un valor con esta estructura <string,array>
  * *  {
  * *    'goku'     : [gif1mgif2,gif3],
  * *    'saaitama' : [gif1mgif2,gif3],
  * *    'pokemon'  : [gif1mgif2,gif3]
  * *  }
  ****************************************************************************************/
  searchHistory = signal<Record<string,Gif[]>>( loadFromLocalStoage() );
  searchHistoryKeys = computed( () => Object.keys(this.searchHistory()));


  trendingGifGroup = computed<Gif[][]>(() => {

    const groups = [];
    for(let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3 ));
    }
    return groups; //[gifs1,gifs2,gifs3],[gifs4,gifs5],[gifs6]
  });


  constructor() { this.loadTrendingGifs(); }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY,historyString);
  })

  loadTrendingGifs() {

    if(this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params : {
        api_key : environment.giphyApiKey,
        limit : 20,
        offset :this.trendingPage() * 20
      }
    })
    .subscribe((response) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray( response.data);
        this.trendingGifs.update(currentGifs => [
          ...currentGifs,
          ...gifs,
        ]);
        this.trendingPage.update((page) => page + 1);
        this.trendingGifsLoading.set(false);
    })
  }

  searchGifs(query : string) {

    debugger;

    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params : {
        api_key : environment.giphyApiKey,
        limit : 20,
        q     : query
      }
    })
    .pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

      //Historial
      tap( (items) => {

        this.searchHistory.update(( history) => ({
          ...history,
          [query.toLocaleLowerCase()]: items
        }));
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
