import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';

interface RadioOption {
  label: string;
  value: string;
}

@Component({
  selector: 'gp-radio-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonModule, SelectButtonModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})
export class RadioComponent {
  currentSection = 'overview';

  readonly sizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Default', value: 'default' },
    { label: 'Large', value: 'large' }
  ];

  selectedSize: 'small' | 'default' | 'large' = 'default';

  readonly previewOptions: RadioOption[] = [
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'Office', value: 'office' }
  ];

  previewValue: string | null = 'remote';

  sizeSmallValue: string | null = 'remote';
  sizeDefaultValue: string | null = 'remote';
  sizeLargeValue: string | null = 'remote';

  stateValue: string | null = 'checked';
  groupingValue: string | null = 'alpha';

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
