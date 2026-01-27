import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'gp-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private readonly router: Router) {}

  readonly componentsNav = {
    ready: [
      { label: 'Button', route: '/components/button' },
      { label: 'Icon', route: '/components/icon' },
      { label: 'Input Text', route: '/components/input' },
      { label: 'Select', route: '/components/select' }
    ],
    planned: [
      'Checkbox',
      'Radio',
      'Switch',
      'Textarea',
      'Datepicker',
      'Table',
      'Dialog',
      'Tabs',
      'Tooltip',
      'Toast',
      'Badge',
      'Tag',
      'Avatar',
      'Card'
    ]
  };

  readonly gettingStartedNav = [
    { label: 'Overview', route: '/getting-started/overview' },
    { label: 'How Percepta works', route: '/getting-started/how-percepta-works' }
  ];

  get isGettingStartedPage(): boolean {
    return this.router.url.startsWith('/getting-started');
  }

  get isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }

  get isComponentsPage(): boolean {
    return this.router.url.startsWith('/components');
  }
}
