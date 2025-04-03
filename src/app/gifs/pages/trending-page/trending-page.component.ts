import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
//import { ListComponent } from '../../components/list/list.component';
import { GifsService } from '../../services/gifs.services';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  //imports: [ListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css'
})
/********************************************************************************
* * AfterViewInit => Es uno de los Pasos de ciclo de vida de Angular que indica
* * llamar un metodo cuando la vista esta inicianda
**********************************************************************************/
export class TrendingPageComponent implements AfterViewInit {

  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);

  //Referencia al objeto Html
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('divGroup');


  ngAfterViewInit() : void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();

  }


  onScroll(event : Event)  {

    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;


    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.trendingScrollState.set(scrollTop);

    //Ejecuta el service cuando esta por llegar al final de la pagina (scrollInfinite)
    if(isAtBottom) {
      this.gifService.loadTrendingGifs();
    }

  }

}
