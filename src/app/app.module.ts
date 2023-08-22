import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { CardSelectionComponent } from './card-selection/card-selection.component';
import { ReadingDisplayComponent } from './reading-display/reading-display.component';
import { EndMenuComponent } from './end-menu/end-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    CardSelectionComponent,
    ReadingDisplayComponent,
    EndMenuComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
