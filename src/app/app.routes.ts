import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path : 'dashboard',
    loadComponent: () =>
        import ('./gifs/pages/dashboard-pages/dashboard-pages.component')
        .then(m => m.DashboardPagesComponent),
    children : [
      {
        path : 'trending',
        loadComponent: () =>
            import ('./gifs/pages/trending-page/trending-page.component')
            .then(t => t.TrendingPageComponent),
      },
      {
        path : 'search',
        loadComponent: () =>
            import ('./gifs/pages/search-page/search-page.component')
            .then(s => s.SearchPageComponent),
      },
      {
        path : 'history/:query',
        loadComponent: () =>
            import ('./gifs/pages/gif-history/gif-history.component')
            .then(h => h.GifHistoryComponent),
      },
      {
        path : '**',
        redirectTo : 'trending'
      }
    ]
  },
  {
    path : '**',
    redirectTo : 'dashboard'
  }

];
