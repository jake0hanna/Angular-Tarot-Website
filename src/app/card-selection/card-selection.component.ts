import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut } from '../shared-scripts/animations';
import { TarotService } from '../tarot.service';
import { Card, Deck, Layout } from '../shared-scripts/interfaces';


@Component({
  selector: 'app-card-selection',
  templateUrl: './card-selection.component.html',
  styleUrls: ['./card-selection.component.css'],
  animations: [fadeInOut]
})
  //WAIT FOR DATA TO LOAD BY SUBSCRIBING TO TAROT SERVICES OBSERVABLE

  //Retreive the amount of potential cards and the amount of cards neede for the selected layout

  //DISPLAY X facedown cards, each associated with a number 0-X (X being the amount of cards in the activedeck)

  //feed the number(s) clicked to the tarot service

  //navigate to the reading display page

  export class CardSelectionComponent 
  {

    maximumCards: number = this.tarotService.selectedDeck.cards.length;
    selectedCards: number[] = [];
  
    constructor(private tarotService: TarotService, private router: Router) { }
  
    selectCard(index: number): void 
    {
      if (this.selectedCards.length < this.tarotService.selectedLayout.cardAmount) {
        this.selectedCards.push(index);

        if (this.tarotService.selectCards(this.selectedCards)) 
        {
          this.navigateToReading();
        }
      }
    }
  
    navigateToReading(): void {
      this.router.navigate(['/reading']); 
    }
  }
  