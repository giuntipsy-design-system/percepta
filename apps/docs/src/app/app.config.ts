import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import Lara from '@primeuix/themes/lara';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: 'none'
        }
      }
    })
  ]
};
