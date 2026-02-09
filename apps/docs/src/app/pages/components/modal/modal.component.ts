import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class ModalComponent {
  currentSection = 'overview';

  isInfoOpen = false;
  isConfirmOpen = false;
  isDestructiveOpen = false;
  selectedType: 'informational' | 'confirmation' | 'destructive' = 'informational';
  selectedSize: 'sm' | 'md' | 'lg' = 'md';

  readonly typeOptions = [
    { label: 'Informational', value: 'informational' },
    { label: 'Confirmation', value: 'confirmation' },
    { label: 'Destructive', value: 'destructive' }
  ];

  readonly sizeOptions = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' }
  ];

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

  get modalWidth(): 'sm' | 'md' | 'lg' {
    return this.selectedSize;
  }

  scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    this.currentSection = id;
    const target = document.getElementById(id);
    const container = document.querySelector<HTMLElement>('.app-content');
    const tabs = document.querySelector<HTMLElement>('.section-tabs');
    if (!target || !container) {
      return;
    }
    if (id === 'overview') {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const tabsHeight = tabs?.offsetHeight ?? 0;
    const extraGap = 24;
    const offset =
      targetRect.top - containerRect.top + container.scrollTop - tabsHeight - extraGap;
    container.scrollTo({ top: offset, behavior: 'smooth' });
  }
}
