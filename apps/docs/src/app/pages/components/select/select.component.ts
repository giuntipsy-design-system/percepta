import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectGroup {
  label: string;
  options: SelectOption[];
  disabled?: boolean;
}

@Component({
  selector: 'gp-select-doc',
  standalone: true,
  imports: [FormsModule, SelectModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  currentSection = 'overview';

  options: SelectOption[] = [
    { label: 'Rome', value: 'rome' },
    { label: 'Madrid', value: 'madrid' },
    { label: 'Lisbon', value: 'lisbon' }
  ];

  groupedOptions: SelectGroup[] = [
    {
      label: 'Europe',
      options: [
        { label: 'Barcelona', value: 'barcelona' },
        { label: 'Milan', value: 'milan' },
        { label: 'Paris', value: 'paris' }
      ]
    },
    {
      label: 'Americas',
      options: [
        { label: 'Buenos Aires', value: 'buenos-aires' },
        { label: 'Mexico City', value: 'mexico-city' },
        { label: 'New York', value: 'new-york' }
      ]
    }
  ];

  selectedDefault: string | null = null;
  selectedGrouped: string | null = null;

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
