  import { Router } from '@angular/router';
  import { fadeInOut } from '../shared-scripts/animations';
  import { TarotService } from '../tarot.service';
  import { Card, Deck, Layout } from '../shared-scripts/interfaces';
  import { Component, AfterViewInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { Subscription } from 'rxjs';
  import {HttpClientModule } from '@angular/common/http';

  @Component({
    selector: 'app-card-selection',
    templateUrl: './card-selection.component.html',
    styleUrls: ['./card-selection.component.css'],
    animations: [
      fadeInOut
    ]
  })
  export class CardSelectionComponent implements AfterViewInit, OnDestroy 
  {
    cards: { x: number, y: number, vx: number, vy: number, selected: boolean }[] = [];
    maximumCards: number = 0;
    containerWidth: number = window.innerWidth-80;
    containerHeight: number = window.innerHeight-120;    
    animationFrameId: number | null = null;
    selectedCards: number[] = [];

    fadingOut: boolean = false;

    private dataLoadedSubscription: Subscription | null = null;

    constructor(private tarotService: TarotService, private router: Router, private renderer: Renderer2, private el: ElementRef,) 
    {
      this.dataLoadedSubscription = this.tarotService.onDataLoaded().subscribe(() => 
      {
        this.maximumCards = this.tarotService.selectedDeck ? this.tarotService.selectedDeck.cards.length : 0;
        this.maximumCards = 0;
        console.log('Selected Deck:', this.tarotService.selectedDeck);
        console.log('Maximum cards:', this.maximumCards);
        this.animate();
      });
    }

    ngOnInit(): void {
      this.fadingOut = false;
    }
    
    
    ngAfterViewInit(): void {
      console.log('ngAfterViewInit executed');
      this.animate();

      this.dataLoadedSubscription = this.tarotService.onDataLoaded().subscribe(() => {
        console.log('onDataLoaded triggered');
        this.maximumCards = this.tarotService.selectedDeck ? this.tarotService.selectedDeck.cards.length : 0;
        this.initializeCards();
      });
    }
    

    initializeCards() 
    {
      console.log('Maximum cards:', this.maximumCards);
      for (let i = 0; i < this.maximumCards; i++) {
        this.cards.push({
          x: Math.random() * this.containerWidth,
          y: Math.random() * this.containerHeight,
          vx: (Math.random() * 2 - 1) ,
          vy: (Math.random() * 2 - 1) ,
          selected: false
        });
      }
    }

    animate() {
      for (const card of this.cards) {
        card.x += card.vx;
        card.y += card.vy;
    
        // Bounce off edges
        if (card.x < 0 || card.x > this.containerWidth - 20) card.vx = -card.vx;
        if (card.y < 0 || card.y > this.containerHeight - 30) card.vy = -card.vy;
    
        // Find the corresponding DOM element for this card by unique id
        const cardElement = document.getElementById(`facedown-card-${this.cards.indexOf(card)}`);
    
        // Update the position of the card element
        if (cardElement) {
          this.renderer.setStyle(cardElement, 'left', card.x + 'px');
          this.renderer.setStyle(cardElement, 'top', card.y + 'px');
        }
      }
    
      this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
    

    ngOnDestroy(): void {
      // Stop animation
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
      }
  
      // Unsubscribe from data loaded subject
      if (this.dataLoadedSubscription !== null) {
        this.dataLoadedSubscription.unsubscribe();
      }
    }
    
    selectCard(index: number): void {
      console.log('Selected card index:', index);
      console.log('Selected cards:', this.selectedCards);
      if (this.selectedCards.length < this.tarotService.selectedLayout.cardAmount) {
        this.selectedCards.push(index);
        this.cards[index].selected = true;    

        if (this.tarotService.selectCards(this.selectedCards)) {
          this.navigateToReading();
        }
      }
    }

    isSelected(index: number): boolean {
      return this.selectedCards.includes(index);
    }
    
    
    navigateToReading(): void {
      this.fadingOut = true;
    
      // Wait for the animation to complete, then navigate to the next page
      setTimeout(() => {
        this.router.navigate(['/reading-display']);
      }, 1000); // This should match the duration of your fade-out animation
    }
    
    
  }
    