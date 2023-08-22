import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

/**
 *    1. Fade in to main menu 
 *    2. display main menu with start button and drop down options to select from predefined decks and layouts 
 *    3. fade out main menu when start button is pressed and then fade in cards 
 *    4. select cards by clicking on each card and then removing the selected card. when the amount of selected cards is equal to the number defined by the selected layout fade out 
 *    5. display the facedown cards with a button to flip them face up one by one and change the text to match the cards value for the selected layout. after all cards are displayed, an "end the reading" button should be shown. 
 *    6. Once the end the reading button is clicked, it should fade out and then a small menu that displays, "thanks, please donate to keep the site alive" and a button to go back to the main menu should fade in. 
 *    7. upon clicking the return to main menu button, the menu should fade out and then we should return to step 1
 * 
 * 
 *    Create components:
 *      1. Main Menu
 *      2. Card Selection
 *      3. Reading Display
 *      4. End Menu
 * 
 *    
 *    
 * 
 */


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

