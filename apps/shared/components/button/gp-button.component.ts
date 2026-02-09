import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GpIconComponent } from '../icon/gp-icon.component';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'danger' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonState = 'default' | 'hover' | 'focus' | 'active';
type ButtonIcon = 'add' | 'search' | 'filter' | 'delete' | 'arrow-right' | 'half-moon' | 'eye' | 'eye-closed';

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
  @Output() clicked = new EventEmitter<void>();

  hasProjectedContent = false;

  @HostBinding('class.button--small')
  get isSmall(): boolean {
    return this.size === 'small';
  }

  @HostBinding('class.button--medium')
  get isMedium(): boolean {
    return this.size === 'medium';
  }

  @HostBinding('class.button--large')
  get isLarge(): boolean {
    return this.size === 'large';
  }

  @HostBinding('class.button--icon-only')
  get isIconOnly(): boolean {
    return this.iconOnly;
  }

  @ContentChild(GpIconComponent)
  set projectedIcon(value: GpIconComponent | undefined) {
    this.hasProjectedContent = !!value;
  }

  get buttonClass(): string {
    let sizeClass = 'button--medium';
    const variantClass = this.variant === 'ghost' ? 'tertiary' : this.variant;

    if (this.size === 'small') {
      sizeClass = 'gp-button--sm p-button-sm button--small';
    } else if (this.size === 'large') {
      sizeClass = 'gp-button--lg p-button-lg button--large';
    }
    const stateClass = this.demo && this.state !== 'default' ? `is-${this.state}` : '';
    const hasIcon = Boolean(this.icon) || this.hasProjectedContent;
    const iconOnlyClass = hasIcon && (this.iconOnly || !this.label) ? 'button--icon-only' : '';
    const iconRightClass =
      this.icon && !iconOnlyClass && this.iconPosition === 'trailing' ? 'gp-button--icon-right' : '';
    return [
      'gp-button',
      `gp-button--${variantClass}`,
      sizeClass,
      iconOnlyClass,
      iconRightClass,
      stateClass
    ]
      .filter(Boolean)
      .join(' ');
  }

  get severity(): 'primary' | 'secondary' | 'danger' | undefined {
    switch (this.variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'danger':
        return 'danger';
      // PrimeNG "text" and "outlined" are modifiers on top of a severity.
      // Use secondary as the non-primary base for these Percepta variants.
      case 'tertiary':
      case 'text':
      case 'ghost':
        return 'secondary';
      default:
        return undefined;
    }
  }

  get isText(): boolean {
    return this.variant === 'text' || this.variant === 'ghost';
  }

  get isOutlined(): boolean {
    return this.variant === 'tertiary';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.state !== 'default' && !this.demo) {
      console.warn('[gp-button] The "state" input is for documentation only. Avoid using it in product code.');
    }
    if (this.iconOnly && !this.ariaLabel) {
      console.warn('[gp-button] iconOnly=true requires ariaLabel for accessibility.');
    }
  }

  @HostListener('click')
  handleClick(): void {
    if (this.disabled || this.loading) {
      return;
    }
    this.clicked.emit();
  }

}
