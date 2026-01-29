import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { GpIconComponent } from '../../../shared/components/icon/gp-icon.component';

@Component({
  selector: 'gp-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, ButtonModule, GpIconComponent],
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
    { label: 'How Percepta works', route: '/getting-started/how-percepta-works' },
    { label: 'Typography tokens', route: '/getting-started/typography-tokens' }
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

  get isComponentsPage(): boolean {
    return this.router.url.startsWith('/components');
  }

  get isPrimeBaseline(): boolean {
    return this.router.url.startsWith('/prime-baseline');
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
