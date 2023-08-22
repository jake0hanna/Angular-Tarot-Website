import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-menu',
  templateUrl: './end-menu.component.html',
  styleUrls: ['./end-menu.component.css']
})
export class EndMenuComponent {

  constructor(private router: Router) { }

goToMainMenu() {
  this.router.navigate(['/main-menu']);
}

}
