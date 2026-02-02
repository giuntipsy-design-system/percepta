import { Routes } from '@angular/router';
import { AccessibilityComponent } from './pages/accessibility/accessibility.component';
import { ChangelogComponent } from './pages/changelog/changelog.component';
import { ButtonComponent } from './pages/components/button/button.component';
import { SwitchComponent } from './pages/components/switch/switch.component';
import { ComponentsComponent } from './pages/components/components.component';
import { CheckboxComponent } from './pages/components/checkbox/checkbox.component';
import { IconComponent } from './pages/components/icon/icon.component';
import { InputComponent } from './pages/components/input/input.component';
import { RadioComponent } from './pages/components/radio/radio.component';
import { SelectComponent } from './pages/components/select/select.component';
import { GettingStartedDesignToCodeComponent } from './pages/getting-started/design-to-code/getting-started-design-to-code.component';
import { GettingStartedOverviewComponent } from './pages/getting-started/overview/getting-started-overview.component';
import { GettingStartedTypographyTokensComponent } from './pages/getting-started/typography-tokens/getting-started-typography-tokens.component';
import { HomeComponent } from './pages/home/home.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { PatternsComponent } from './pages/patterns/patterns.component';
import { PrimeBaselineComponent } from './pages/prime-baseline/prime-baseline.component';
import { TokensComponent } from './pages/tokens/tokens.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Percepta'
  },
  {
    path: 'overview',
    component: OverviewComponent,
    title: 'Overview · Percepta'
  },
  {
    path: 'getting-started',
    title: 'Getting started · Percepta',
    children: [
      {
        path: '',
        component: GettingStartedOverviewComponent,
        title: 'Getting started · Percepta'
      },
      {
        path: 'overview',
        component: GettingStartedOverviewComponent,
        title: 'Getting started · Percepta'
      },
      {
        path: 'how-percepta-works',
        component: GettingStartedDesignToCodeComponent,
        title: 'How Percepta works · Percepta'
      },
      {
        path: 'typography-tokens',
        component: GettingStartedTypographyTokensComponent,
        title: 'Typography tokens · Percepta'
      }
    ]
  },
  {
    path: 'tokens',
    component: TokensComponent,
    title: 'Tokens · Percepta'
  },
  {
    path: 'prime-baseline',
    component: PrimeBaselineComponent,
    title: 'PrimeNG Baseline · Percepta'
  },
  {
    path: 'components',
    title: 'Components · Percepta',
    children: [
      {
        path: '',
        component: ComponentsComponent
      },
      {
        path: 'button',
        component: ButtonComponent,
        title: 'Button · Percepta'
      },
      {
        path: 'checkbox',
        component: CheckboxComponent,
        title: 'Checkbox · Percepta'
      },
      {
        path: 'icon',
        component: IconComponent,
        title: 'Icon · Percepta'
      },
      {
        path: 'input',
        component: InputComponent,
        title: 'Input Text · Percepta'
      },
      {
        path: 'radio',
        component: RadioComponent,
        title: 'Radio Button · Percepta'
      },
      {
        path: 'select',
        component: SelectComponent,
        title: 'Select · Percepta'
      },
      {
        path: 'switch',
        component: SwitchComponent,
        title: 'Switch · Percepta'
      }
    ]
  },
  {
    path: 'patterns',
    component: PatternsComponent,
    title: 'Patterns · Percepta'
  },
  {
    path: 'accessibility',
    component: AccessibilityComponent,
    title: 'Accessibility · Percepta'
  },
  {
    path: 'changelog',
    component: ChangelogComponent,
    title: 'Changelog · Percepta'
  }
];
