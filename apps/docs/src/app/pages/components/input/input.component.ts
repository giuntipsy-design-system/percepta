import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GpInputComponent } from '../../../../../../shared/components/input/gp-input.component';

type InputSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'gp-input-doc',
  standalone: true,
  imports: [FormsModule, SelectButtonModule, GpInputComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  currentSection = 'overview';
  sizes = [
    { label: 'Small', value: 'small' },
    { label: 'Default', value: 'medium' },
    { label: 'Large', value: 'large' }
  ];
  selectedSize: InputSize = 'medium';

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
