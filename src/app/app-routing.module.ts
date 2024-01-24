import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {masonryRoute} from "./routes/routes";

const routes: Routes = [...masonryRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
