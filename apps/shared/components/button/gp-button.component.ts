import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GpIconComponent } from '../icon/gp-icon.component';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonState = 'default' | 'hover' | 'focus' | 'active';
type ButtonIcon = 'add' | 'search' | 'filter' | 'delete' | 'arrow-right';

@Component({
  selector: 'gp-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, GpIconComponent],
  templateUrl: './gp-button.component.html',
  styleUrl: './gp-button.component.scss'
})
export class GpButtonComponent implements OnChanges {
  @Input() label = '';
  @Input() ariaLabel = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() state: ButtonState = 'default';
  @Input() demo = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon?: ButtonIcon;
  @Input() iconPosition: 'leading' | 'trailing' = 'leading';
  @Input() iconOnly = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get buttonClass(): string {
    let sizeClass = '';

    if (this.size === 'small') {
      sizeClass = 'gp-button--sm';
    } else if (this.size === 'large') {
      sizeClass = 'gp-button--lg';
    }
    const stateClass =
      this.demo && this.state !== 'default' ? `is-${this.state}` : '';
    const iconOnlyClass = this.icon && (this.iconOnly || !this.label) ? 'gp-button--icon' : '';
    const iconRightClass =
      this.icon && !iconOnlyClass && this.iconPosition === 'trailing' ? 'gp-button--icon-right' : '';
    return ['gp-button', `gp-button--${this.variant}`, sizeClass, iconOnlyClass, iconRightClass, stateClass]
      .filter(Boolean)
      .join(' ');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.state !== 'default' && !this.demo) {
      console.warn('[gp-button] The "state" input is for documentation only. Avoid using it in product code.');
    }
    if (this.iconOnly && !this.ariaLabel) {
      console.warn('[gp-button] iconOnly=true requires ariaLabel for accessibility.');
    }
  }

  get iconSize(): 'sm' | 'md' | 'lg' {
    if (this.size === 'small') {
      return 'sm';
    }
    if (this.size === 'large') {
      return 'lg';
    }
    return 'md';
  }
}
