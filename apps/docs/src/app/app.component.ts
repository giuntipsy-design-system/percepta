import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GpButtonComponent } from '../../../shared/components/button/gp-button.component';
import { GpIconComponent } from '../../../shared/components/icon/gp-icon.component';

@Component({
  selector: 'gp-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, GpButtonComponent, GpIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('appContent') appContent?: ElementRef<HTMLElement>;

  hasScrolled = false;

  constructor(private readonly router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => this.updateScrollState(), 0);
      }
    });
  }

  readonly componentsNav = {
    ready: [
      { label: 'Button', route: '/components/button' },
      { label: 'Checkbox', route: '/components/checkbox' },
      { label: 'Icon', route: '/components/icon' },
      { label: 'Input Text', route: '/components/input' },
      { label: 'Radio Button', route: '/components/radio' },
      { label: 'Select', route: '/components/select' },
      { label: 'Switch', route: '/components/switch' },
      { label: 'Textarea', route: '/components/textarea' },
      { label: 'Modal', route: '/components/modal' }
    ],
    planned: [
      'Datepicker',
      'Table',
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
    { label: 'How Percepta works', route: '/getting-started/how-percepta-works' },
    { label: 'Typography tokens', route: '/getting-started/typography-tokens' }
  ];

  readonly patternsNav = [
    { label: 'Form layout & validation', route: '/patterns/form-layout-validation' },
    { label: 'Modal usage & behavior', route: '/patterns/modal' }
  ];

  readonly patternsPlanned = [
    'Empty states',
    'Confirmation & destructive actions'
  ];

  get isGettingStartedPage(): boolean {
    return this.router.url.startsWith('/getting-started');
  }

  get isGettingStartedOverview(): boolean {
    return (
      this.router.url === '/getting-started' ||
      this.router.url === '/getting-started/overview'
    );
  }

  get isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }

  get isChangelogPage(): boolean {
    return this.router.url.startsWith('/changelog');
  }

  get isAccessibilityPage(): boolean {
    return this.router.url.startsWith('/accessibility');
  }

  get isComponentsPage(): boolean {
    return this.router.url.startsWith('/components');
  }

  get isPatternsPage(): boolean {
    return this.router.url.startsWith('/patterns');
  }

  get isPrimeBaseline(): boolean {
    return this.router.url.startsWith('/prime-baseline');
  }

  get isPrototypePage(): boolean {
    return this.router.url.startsWith('/prototypes');
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isHomePage) {
      return;
    }
    this.hasScrolled = window.scrollY > 0;
  }

  onContentScroll(event: Event): void {
    if (this.isHomePage) {
      return;
    }
    const target = event.target as HTMLElement | null;
    this.hasScrolled = (target?.scrollTop ?? 0) > 0;
  }

  private updateScrollState(): void {
    if (this.isHomePage) {
      this.hasScrolled = window.scrollY > 0;
      return;
    }
    this.hasScrolled = (this.appContent?.nativeElement.scrollTop ?? 0) > 0;
  }
}
