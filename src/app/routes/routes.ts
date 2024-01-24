import {Routes} from "@angular/router";
import {MASONRY_ROUTE} from "../../global-constants";

export const masonryRoute: Routes = [
  {
    path: MASONRY_ROUTE,
    title: 'Masonry grid',
    loadComponent: () => import('../components/masonry-grid/masonry-grid.component').then(module => module.MasonryGridComponent)
  },
]
