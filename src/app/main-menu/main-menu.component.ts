import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
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

  fadingOut: boolean = false;

  private dataLoadedSubscription: Subscription | undefined;

  selectedDeck: string = '';
  decks: string[] = [];

  selectedLayout: string = '';
  layouts: string[] = [];

  constructor(private tarotService: TarotService, private router: Router, private renderer: Renderer2, private el: ElementRef,) {}

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

  moveToCardSelection() {
    this.fadingOut = true;
  
    setTimeout(() => {
      const mainMenuDiv = this.el.nativeElement.querySelector('.main-menu');
      this.renderer.setStyle(mainMenuDiv, 'display', 'none'); //Manual hiding is neccessary
      setTimeout(() => {
        this.router.navigate(['/cards-selection']);
      }, 200)
      
    }, 1000); 
  }
  
  
  

}
