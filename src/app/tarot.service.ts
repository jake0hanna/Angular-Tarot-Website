import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Card, Deck, Layout } from './shared-scripts/interfaces';

@Injectable({  providedIn: 'root'  })

export class TarotService 
{

  private dataLoadedSubject = new BehaviorSubject<void>(null);

  potentialDecks: Deck[] = [];
  potentialLayouts: Layout[] = [];
  cards: Card[] = [];

  selectedDeck: Deck;
  selectedLayout: Layout; 
  selectedCards: Card[] = [];


  constructor(private http: HttpClient) {
    this.loadData().subscribe(data => {

      this.potentialDecks = data.decks;
      this.potentialLayouts = data.layouts;
      this.cards = data.cards;

      this.selectedDeck = this.potentialDecks[0];
      this.selectedLayout = this.potentialLayouts[0];
      
      this.dataLoadedSubject.next();
    });

  }
  
  onDataLoaded() {
    return this.dataLoadedSubject.asObservable();
  }

  private loadData(): Observable<any> {
    return this.http.get('/assets/TarotData.json');
  }

  selectCards(selectedIndices: number[]): boolean
  {

    if (selectedIndices.length === this.selectedLayout.cardAmount)
    {
      this.selectedCards = selectedIndices.map(index => this.cards.find(card => card.id === index)).filter((card): card is Card => card !== undefined);
      return true;
    }
    else
    {
      return false;
    }

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

  setSelectedDeckByName(deck: String): boolean 
  {
    const foundDeck = this.potentialDecks.find(d => d.name === deck);
    if (foundDeck) 
    {
      this.selectedDeck = foundDeck;
      return true;
    } 
    else 
    {
      return false;
    }
  }
  
  setSelectedDeck(deck: Deck): void 
  {
    this.selectedDeck = deck;
  }

  setSelectedLayout(layout: Layout): void 
  {
    this.selectedLayout = layout;
  }

  setSelectedLayoutByName(layout: String): boolean
  {
    const foundLayout = this.potentialLayouts.find(l => l.name === layout);
    if(foundLayout)
    {
      this.selectedLayout = foundLayout;
      return true;
    }
    else
    {
      return false;
    }
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

 