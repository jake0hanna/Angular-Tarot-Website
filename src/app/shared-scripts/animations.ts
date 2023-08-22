import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [   // :enter is alias to 'void => *'
    style({ opacity: 0 }),
    animate(600, style({ opacity: 1 }))
  ]),
  transition(':leave', [   // :leave is alias to '* => void'
    animate(600, style({ opacity: 0 }))
  ])
]);
