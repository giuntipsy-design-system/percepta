import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';

interface CheckboxOption {
  label: string;
  value: string;
}

@Component({
  selector: 'gp-checkbox-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, SelectButtonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements AfterViewInit {
  currentSection = 'overview';

  readonly sizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Default', value: 'default' },
    { label: 'Large', value: 'large' }
  ];

  selectedSize: 'small' | 'default' | 'large' = 'default';

  readonly previewOptions: CheckboxOption[] = [
    { label: 'Cognitive ability', value: 'cognitive' },
    { label: 'Personality traits', value: 'personality' },
    { label: 'Emotional intelligence', value: 'emotional' },
    { label: 'Behavioral risk', value: 'behavioral' }
  ];

  previewValues: string[] = ['cognitive', 'emotional', 'behavioral'];

  sizeSmallValues: string[] = ['cognitive'];
  sizeDefaultValues: string[] = ['cognitive'];
  sizeLargeValues: string[] = ['cognitive'];

  readonly groupingOptions = [
    { label: 'Cognitive ability', value: 'cognitive' },
    { label: 'Personality traits', value: 'personality' },
    { label: 'Emotional intelligence', value: 'emotional' },
    { label: 'Behavioral risk', value: 'behavioral' }
  ];

  groupingSelections: Record<string, boolean> = {
    cognitive: true,
    personality: false,
    emotional: true,
    behavioral: false
  };

  allSelected = false;
  allIndeterminate = true;

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

  onGroupAllChange(): void {
    const nextValue = this.allSelected;
    this.groupingOptions.forEach((option) => {
      this.groupingSelections[option.value] = nextValue;
    });
    this.allIndeterminate = false;
  }

  onGroupItemChange(): void {
    const values = this.groupingOptions.map((option) => this.groupingSelections[option.value]);
    const selectedCount = values.filter(Boolean).length;
    this.allSelected = selectedCount === values.length;
    this.allIndeterminate = selectedCount > 0 && selectedCount < values.length;
  }
}
