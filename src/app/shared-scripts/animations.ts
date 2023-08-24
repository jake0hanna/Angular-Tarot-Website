import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [ 
    style({ opacity: 0 }),
    // 2000ms delay and then 2000ms animation
    animate('1000ms 1000ms ease-in', style({ opacity: 1 }))
  ]),
  transition(':leave', [  
    animate(1000, style({ opacity: 0 }))
  ])
]);
