import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeInOut } from 'src/app/shared-scripts/animations';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { TarotService } from '../tarot.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-end-menu',
  templateUrl: './end-menu.component.html',
  styleUrls: ['./end-menu.component.css'],
 animations: [fadeInOut]
})
export class EndMenuComponent {

  fadingOut: boolean = false;

  constructor(private tarotService: TarotService, private router: Router, private renderer: Renderer2, private el: ElementRef) {}

goToMainMenu() {
  this.fadingOut = true;
  
  setTimeout(() => {
      const mainMenuDiv = this.el.nativeElement.querySelector('.end-menu');
      this.renderer.setStyle(mainMenuDiv, 'display', 'none'); //Manual hiding is neccessary
      setTimeout(() => {
        this.router.navigate(['']);
      }, 200)
      
    }, 1000); 
  }
}


