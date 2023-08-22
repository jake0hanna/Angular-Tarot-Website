import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut } from '../shared-scripts/animations';
import { TarotService } from '../tarot.service';

@Component({
  selector: 'app-card-selection',
  templateUrl: './card-selection.component.html',
  styleUrls: ['./card-selection.component.css'],
  animations: [fadeInOut]
})
export class CardSelectionComponent 
{

  selectedCards: Card[] = [];

  constructor(private tarotService: TarotService, private router: Router) { }





}
