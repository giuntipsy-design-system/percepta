import { Component } from '@angular/core';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { ButtonModule } from 'primeng/button';
import { GpButtonComponent } from '../../../../../../shared/components/button/gp-button.component';

type GpVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'danger';
type GpSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'gp-button-doc',
  standalone: true,
  imports: [ButtonModule, ButtonGroupModule, GpButtonComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  currentSection = 'overview';
  selectedVariant: GpVariant = 'primary';
  selectedSize: GpSize = 'large';

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
