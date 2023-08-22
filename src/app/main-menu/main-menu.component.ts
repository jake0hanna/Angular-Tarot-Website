import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarotService } from '../tarot.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { fadeInOut } from 'src/app/shared-scripts/animations';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  animations: [fadeInOut]
})
export class MainMenuComponent implements OnInit {

  private dataLoadedSubscription: Subscription | undefined;

  selectedDeck: string = '';
  decks: string[] = [];

  selectedLayout: string = '';
  layouts: string[] = [];

  constructor(private tarotService: TarotService, private router: Router) {}

  ngOnInit(): void {
    this.dataLoadedSubscription = this.tarotService.onDataLoaded().subscribe(() => 
    {
      this.decks = this.tarotService.getDeckNames();
      this.layouts = this.tarotService.getLayoutNames();

      this.selectedDeck = this.decks[0];
      this.selectedLayout = this.layouts[0];

    });
  }

  ngOnDestroy(): void {
    if (this.dataLoadedSubscription) {
      this.dataLoadedSubscription.unsubscribe();
    }
  }

  onDeckSelect(deck: string) 
  {  
    this.tarotService.setSelectedDeckByName(deck);
  }

  onLayoutSelect(layout: string) 
  {
    this.tarotService.setSelectedLayoutByName(layout);
  }

  moveToCardSelection() 
  {
    this.router.navigate(['/cards-selection']);
  }
  

}
