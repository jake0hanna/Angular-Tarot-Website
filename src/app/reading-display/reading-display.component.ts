import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TarotService } from '../tarot.service';
import { Card, Layout } from '../shared-scripts/interfaces';
import { Renderer2, ElementRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subscription } from 'rxjs';
import { fadeInOut } from '../shared-scripts/animations';

@Component({
  selector: 'app-reading-display',
  templateUrl: './reading-display.component.html',
  styleUrls: ['./reading-display.component.css'],
  animations: [
    fadeInOut
  ]
})
export class ReadingDisplayComponent {

  constructor(private router: Router, private tarotService: TarotService, private renderer: Renderer2, private el: ElementRef) { }

  fadingOut: boolean = false;

  selectedCards: Card[] = this.tarotService.selectedCards;

  selectedLayout: Layout = this.tarotService.selectedLayout;

  activeCard: Card = this.selectedCards[0];


  //generate random up or down for each card when this component is loaded

  uprightOrReversed: boolean[] = [];

  ngOnInit(): void {
    this.selectedCards.forEach(card => {
      this.uprightOrReversed.push(Math.random() < 0.5);
    });
    this.fadingOut = false;
  }

  getDescription(card: Card): string {
    const layoutName = this.selectedLayout.name;
    const cardIndex = this.selectedCards.indexOf(card);
    const descriptionObj = card.descriptions.find(desc => desc.layoutName === layoutName && desc.position === cardIndex);
    const isUpright = this.uprightOrReversed[cardIndex];
    return descriptionObj ? (isUpright ? descriptionObj.descriptionUpright : descriptionObj.descriptionReversed) : 'Not Found';
  }


  goToPreviousCard(): void
  {
    if(this.selectedCards.indexOf(this.activeCard) > 0)
      this.activeCard = this.selectedCards[this.selectedCards.indexOf(this.activeCard) - 1];

  }

  goToNextCard(): void
  {
    if(this.selectedCards.indexOf(this.activeCard) < this.selectedCards.length - 1)
      this.activeCard = this.selectedCards[this.selectedCards.indexOf(this.activeCard) + 1];

  }
  
  endReading(): void
  {
    this.fadingOut = true;
  
    setTimeout(() => {
      const mainMenuDiv = this.el.nativeElement.querySelector('.main-menu');
      this.renderer.setStyle(mainMenuDiv, 'display', 'none'); //Manual hiding is neccessary
      setTimeout(() => {
        this.router.navigate(['/cards-selection']);
      }, 200)
      
    }, 1000); 
    this.router.navigate(['/end-reading']);

  }

}
