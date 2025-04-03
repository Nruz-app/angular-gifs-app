import { Injectable, signal } from "@angular/core";


@Injectable({providedIn: 'root'})
export class ScrollStateService {
  constructor() { }

  trendingScrollState = signal(0);

  PagesScrolllState : Record<string,number> = {

      'page1' : 100,
      'pag2'   : 0,
      'aboutPage' : 50,
      'page20' : 0
  }

}
