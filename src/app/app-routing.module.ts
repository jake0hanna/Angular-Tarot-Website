import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { CardSelectionComponent } from './card-selection/card-selection.component';
import { ReadingDisplayComponent } from './reading-display/reading-display.component';
import { EndMenuComponent } from './end-menu/end-menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'main-menu', pathMatch: 'full' },
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'cards-selection', component: CardSelectionComponent },
  { path: 'reading-display', component: ReadingDisplayComponent },
  { path: 'end-reading', component: EndMenuComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
