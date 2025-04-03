import { Component, inject } from '@angular/core';
import { MenuOption } from '../../../interfaces/menu-options.interface';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { GifsService } from 'src/app/gifs/services/gifs.services';

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  styleUrl: './side-menu-options.component.css'
})
export class SideMenuOptionsComponent {

  gifsService = inject(GifsService);


  menuOptions : MenuOption[] = [
    {
        icon : 'fa-solid fa-chart-line',
        label : 'Trending',
        subLabel : 'Gifs Populares',
        route : '/dashboard/trending'
    },
    {
      icon : 'fa-solid fa-magnifying-glass',
      label : 'Buscador',
      subLabel : 'Buscador Gifs',
      route : '/dashboard/search'
    }
  ];

}
