import { Component, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifsService } from '../../services/gifs.services';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [ListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {


  gifService = inject( GifsService );
  gifs = signal<Gif[]>([]);

  onSearch(query : string) {
      this.gifService.searchGifs(query)
        .subscribe ( (response) => {
            this.gifs.set(response);
        })
  }

}
