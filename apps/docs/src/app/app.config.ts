import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import Lara from '@primeuix/themes/lara';
import { definePreset } from '@primeuix/themes';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';

const PerceptaPreset = definePreset(Lara, {
  components: {
    radiobutton: {
      root: {
        background: 'transparent',
        borderColor: '#92A3AC',
        hoverBorderColor: '#3356CC',
        focusBorderColor: 'rgba(114,87,255,0.30)',
        checkedBorderColor: '#3356CC',
        checkedHoverBorderColor: '#3356CC',
        checkedFocusBorderColor: 'rgba(114,87,255,0.30)',
        checkedBackground: '#3356CC',
        checkedHoverBackground: '#3356CC',
        disabledBackground: '#DAE4E9',
        checkedDisabledBorderColor: '#7B8F99',
        focusRing: {
          width: '1px',
          style: 'solid',
          color: 'rgba(114,87,255,0.30)',
          offset: '0',
          shadow: '0 0 0 2px rgba(114,87,255,0.2)'
        }
      },
      icon: {
        checkedColor: '#F3F6FF',
        checkedHoverColor: '#F3F6FF',
        disabledColor: '#7B8F99'
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: PerceptaPreset,
        options: {
          darkModeSelector: 'none'
        }
      }
    })
  ]
};
