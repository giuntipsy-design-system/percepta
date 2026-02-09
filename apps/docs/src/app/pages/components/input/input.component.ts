import { AfterViewInit, Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GpButtonComponent } from '../../../../../../shared/components/button/gp-button.component';
import { GpInputComponent } from '../../../../../../shared/components/input/gp-input.component';

type InputSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'gp-input-doc',
  standalone: true,
  imports: [FormsModule, SelectButtonModule, GpInputComponent, GpButtonComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements AfterViewInit {
  currentSection = 'overview';
  showPassword = false;
  sizes = [
    { label: 'Small', value: 'small' },
    { label: 'Default', value: 'medium' },
    { label: 'Large', value: 'large' }
  ];
  selectedSize: InputSize = 'medium';

  ngAfterViewInit(): void {
    this.updateCurrentSection();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateCurrentSection();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
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
