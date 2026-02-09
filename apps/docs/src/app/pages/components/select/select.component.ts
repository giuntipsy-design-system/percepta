import { AfterViewInit, Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectGroup {
  label: string;
  items: SelectOption[];
  disabled?: boolean;
}

@Component({
  selector: 'gp-select-doc',
  standalone: true,
  imports: [FormsModule, SelectModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements AfterViewInit {
  currentSection = 'overview';

  options: SelectOption[] = [
    { label: 'Rome', value: 'rome' },
    { label: 'Madrid', value: 'madrid' },
    { label: 'Lisbon', value: 'lisbon' }
  ];

  groupedOptions: SelectGroup[] = [
    {
      label: 'Europe',
      items: [
        { label: 'Barcelona', value: 'barcelona' },
        { label: 'Milan', value: 'milan' },
        { label: 'Paris', value: 'paris' }
      ]
    },
    {
      label: 'Americas',
      items: [
        { label: 'Buenos Aires', value: 'buenos-aires' },
        { label: 'Mexico City', value: 'mexico-city' },
        { label: 'New York', value: 'new-york' }
      ]
    }
  ];

  selectedDefault: string | null = null;
  selectedGrouped: string | null = null;

  ngAfterViewInit(): void {
    this.updateCurrentSection();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateCurrentSection();
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
