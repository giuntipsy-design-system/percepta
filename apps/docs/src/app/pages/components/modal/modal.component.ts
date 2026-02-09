import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GpButtonComponent } from '../../../../../../shared/components/button/gp-button.component';
import {
  GpModalBodyDirective,
  GpModalComponent
} from '../../../../../../shared/components/modal/gp-modal.component';

@Component({
  selector: 'gp-modal-doc',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    SelectButtonModule,
    GpButtonComponent,
    GpModalComponent,
    GpModalBodyDirective
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit {
  currentSection = 'overview';

  isInfoOpen = false;
  isConfirmOpen = false;
  isDestructiveOpen = false;
  selectedType: 'informational' | 'confirmation' | 'destructive' = 'informational';
  selectedSize: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  readonly typeOptions = [
    { label: 'Informational', value: 'informational' },
    { label: 'Confirmation', value: 'confirmation' },
    { label: 'Destructive', value: 'destructive' }
  ];

  readonly sizeOptions = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra large', value: 'xl' }
  ];

  ngAfterViewInit(): void {
    this.updateCurrentSection();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateCurrentSection();
  }

  openInfo(): void {
    this.isInfoOpen = true;
  }

  openConfirm(): void {
    this.isConfirmOpen = true;
  }

  openDestructive(): void {
    this.isDestructiveOpen = true;
  }

  closeInfo(): void {
    this.isInfoOpen = false;
  }

  closeConfirm(): void {
    this.isConfirmOpen = false;
  }

  closeDestructive(): void {
    this.isDestructiveOpen = false;
  }

  openSelected(): void {
    if (this.selectedType === 'informational') {
      this.openInfo();
      return;
    }
    if (this.selectedType === 'confirmation') {
      this.openConfirm();
      return;
    }
    this.openDestructive();
  }

  get modalWidth(): 'sm' | 'md' | 'lg' | 'xl' {
    return this.selectedSize;
  }

  scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    this.currentSection = id;
    const target = document.getElementById(id);
    const tabs = document.querySelector<HTMLElement>('.section-tabs');
    const header = document.querySelector<HTMLElement>('.app-header');
    if (!target) {
      return;
    }
    if (id === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetRect = target.getBoundingClientRect();
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const tabsHeight = tabs?.offsetHeight ?? 0;
    const extraGap = 24;
    const offset = targetRect.top + window.scrollY - headerHeight - tabsHeight - extraGap;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }

  private updateCurrentSection(): void {
    const anchors = Array.from(document.querySelectorAll<HTMLElement>('.section-anchor'));
    if (!anchors.length) {
      return;
    }
    const tabs = document.querySelector<HTMLElement>('.section-tabs');
    const header = document.querySelector<HTMLElement>('.app-header');
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const tabsHeight = tabs?.offsetHeight ?? 0;
    const extraGap = 24;
    const position = window.scrollY + headerHeight + tabsHeight + extraGap + 1;
    let active = anchors[0].id || 'overview';
    for (const anchor of anchors) {
      if (anchor.offsetTop <= position) {
        active = anchor.id;
      }
    }
    this.currentSection = active || 'overview';
  }
}
