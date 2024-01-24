import {Component} from '@angular/core';
import {MASONRY_ROUTE} from "../global-constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
  }

  protected readonly MASONRY_ROUTE = MASONRY_ROUTE;
}
