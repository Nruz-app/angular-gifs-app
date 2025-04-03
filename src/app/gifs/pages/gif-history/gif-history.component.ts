import { Component, computed, inject } from '@angular/core';
import { GifsService } from '../../services/gifs.services';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-gifs-gif-history',
  imports: [ListComponent],
  templateUrl: './gif-history.component.html',
  styleUrl: './gif-history.component.css'
})
export class GifHistoryComponent {

  gifService = inject(GifsService);

  //El params lo convierte en signal
  query =  toSignal(
    inject(ActivatedRoute).params
      .pipe(
        map((params) => params['query'])
      )
  );

  gifsByKeys = computed( () => this.gifService.getHistoryGifs(this.query()));

}
