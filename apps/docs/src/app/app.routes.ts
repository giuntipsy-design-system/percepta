import { Routes } from '@angular/router';
import { AccessibilityComponent } from './pages/accessibility/accessibility.component';
import { ChangelogComponent } from './pages/changelog/changelog.component';
import { ButtonComponent } from './pages/components/button/button.component';
import { ComponentsComponent } from './pages/components/components.component';
import { IconComponent } from './pages/components/icon/icon.component';
import { InputComponent } from './pages/components/input/input.component';
import { SelectComponent } from './pages/components/select/select.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { PatternsComponent } from './pages/patterns/patterns.component';
import { TokensComponent } from './pages/tokens/tokens.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: OverviewComponent,
    title: 'Overview · Percepta'
  },
  {
    path: 'tokens',
    component: TokensComponent,
    title: 'Tokens · Percepta'
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
        path: 'select',
        component: SelectComponent,
        title: 'Select · Percepta'
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
