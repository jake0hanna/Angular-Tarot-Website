import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { interfaces } from '.../shared-scripts/interfaces';

@Injectable({  providedIn: 'root'  })

export class TarotService 
{

  private dataLoadedSubject = new Subject<void>();

  potentialDecks: Deck[] = [];
  potentialLayouts: Layout[] = [];
  cards: Card[] = [];

  selectedDeck: Deck | undefined;
  selectedLayout: Layout | undefined;
  selectedCards: Card[] = [];


  constructor(private http: HttpClient) {
    this.loadData().subscribe(data => {
      this.potentialDecks = data.decks;
      this.potentialLayouts = data.layouts;
      this.cards = data.cards;
      this.dataLoadedSubject.next();
    });
  }
  
  onDataLoaded() {
    return this.dataLoadedSubject.asObservable();
  }

  private loadData(): Observable<any> {
    return this.http.get('/assets/TarotData.json');
  }


  getDecks(): Deck[] 
  {
    return this.potentialDecks;
  }
  
  getDeckNames(): string[]
  {
    return this.potentialDecks.map(deck => deck.name);
  }

  getLayouts(): Layout[] 
  {
    return this.potentialLayouts;
  }

  getLayoutNames(): string[]
  {
    return this.potentialLayouts.map(layout => layout.name);
  }

  getAllCards(): Card[] 
  {
    return this.cards;
  }

  getCardsByDeck(deck:Deck): Card[]
  {
    return this.cards.filter(card => deck.cards.includes(card.id));
  } 

  setSelectedDeckByName(deck: String): void 
  {
    this.selectedDeck = this.potentialDecks.find(d => d.name === deck);
  }
  
  setSelectedDeck(deck: Deck): void 
  {
    this.selectedDeck = deck;
  }

  setSelectedLayout(layout: Layout): void 
  {
    this.selectedLayout = layout;
  }

  setSelectedLayoutByName(layout: String): void
  {
    this.selectedLayout = this.potentialLayouts.find(l => l.name === layout);
  }

  addSelectedCard(card: Card): void 
  {
    this.selectedCards.push(card);
  }

  resetSelectedCards(): void 
  {
    this.selectedCards = [];
  }

}

 