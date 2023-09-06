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
export class MainMenuComponent implements OnInit 
{

  private dataLoadedSubscription: Subscription | undefined;

  selectedDeck: string = '';
  decks: string[] = [];

  selectedLayout: string = '';
  layouts: string[] = [];

  //Animation Data///////////
  fadingOut: boolean = false;

  shadowOpacity: number = 0.3;
  intervalId: any;

  specks: any[] = [];
  numOfSpecks: number = 5;
  speckIntervalId: any;
  ///////////////////////////

  constructor(private tarotService: TarotService, private router: Router, private renderer: Renderer2, private el: ElementRef,) {}

  ngOnInit(): void 
  {
    this.dataLoadedSubscription = this.tarotService.onDataLoaded().subscribe(() => 
    {
      this.decks = this.tarotService.getDeckNames();
      this.layouts = this.tarotService.getLayoutNames();

      this.selectedDeck = this.decks[0];
      this.selectedLayout = this.layouts[0];

    });
    this.startShadowAnimation();
    //this.generateSpecks();
    //this.moveSpecks();
  }

  ngOnDestroy(): void 
  {
    if (this.dataLoadedSubscription) {
      this.dataLoadedSubscription.unsubscribe();
    }
    clearInterval(this.intervalId);
    clearInterval(this.speckIntervalId);
  }

  startShadowAnimation() 
  {
    let increasing = true;
  
    this.intervalId = setInterval(() => {
      if (this.shadowOpacity > 1.2) increasing = false;
      if (this.shadowOpacity < 0.5) increasing = true;
  
      if (increasing) {
        this.shadowOpacity += 0.01;
      } else {
        this.shadowOpacity -= 0.01;
      }
  
      const mainMenuDiv = this.el.nativeElement.querySelector('.main-menu');
      this.renderer.setStyle(mainMenuDiv, 'box-shadow', `0px 0px 50px rgba(255, 255, 255, ${this.shadowOpacity})`);
    }, 50);
  }
  
  generateSpecks() {
    for (let i = 0; i < this.numOfSpecks; i++) 
    {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      const speck = this.renderer.createElement('div');
      this.renderer.addClass(speck, 'speck');
      this.renderer.setStyle(speck, 'left', x + 'px');
      this.renderer.setStyle(speck, 'top', y + 'px');
      
      this.specks.push(speck);
    }
    
    const backgroundDiv = this.el.nativeElement.querySelector('.background');
    for (const speck of this.specks) 
    {
      this.renderer.appendChild(backgroundDiv, speck);
    }
  }
  
  moveSpecks() {
    this.speckIntervalId = setInterval(() => {
      for (const speck of this.specks) 
      {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        this.renderer.setStyle(speck, 'left', x + 'px');
        this.renderer.setStyle(speck, 'top', y + 'px');
      }
    }, 1000);
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
