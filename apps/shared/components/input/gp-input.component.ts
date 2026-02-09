import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, forwardRef, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

type InputSize = 'small' | 'medium' | 'large';
type InputState = 'default' | 'hover' | 'focus' | 'active' | 'error';
type LeadingIcon = 'search' | 'bell';

let nextId = 0;

@Component({
  selector: 'gp-input',
  standalone: true,
  imports: [CommonModule, InputTextModule],
  templateUrl: './gp-input.component.html',
  styleUrl: './gp-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GpInputComponent),
      multi: true
    }
  ]
})
export class GpInputComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value: string | number | null = '';
  @Input() size: InputSize = 'medium';
  @Input() state: InputState = 'default';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() disabled = false;
  @Input() helperText = '';
  @Input() errorText = '';
  @Input() error = false;
  @Input() leadingIcon?: LeadingIcon;
  @Input() trailingAction = false;
  @Input() inputId = '';
  @Input() ariaLabel = '';
  @Input() demo = false;

  resolvedId = '';
  internalValue: string | number | null = '';
  internalDisabled = false;
  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  private ngControl: NgControl | null = null;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.resolvedId = this.inputId || `gp-input-${++nextId}`;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    if (!this.ngControl) {
      this.internalValue = this.value;
      this.internalDisabled = this.disabled;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.ngControl && changes['value']) {
      this.internalValue = this.value;
    }
    if (!this.ngControl && changes['disabled']) {
      this.internalDisabled = this.disabled;
    }
  }

  writeValue(value: string | number | null): void {
    this.internalValue = value;
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled = isDisabled;
  }

  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const nextValue = this.type === 'number' && value !== '' ? Number(value) : value;
    this.internalValue = nextValue;
    this.onChange(nextValue);
  }

  handleBlur(): void {
    this.onTouched();
  }

  get resolvedDisabled(): boolean {
    return this.ngControl ? this.internalDisabled : this.disabled;
  }

  get isFormError(): boolean {
    const control = this.ngControl?.control;
    if (!control) {
      return false;
    }
    return control.invalid && (control.touched || control.dirty);
  }

  get isError(): boolean {
    return this.error || this.state === 'error' || !!this.errorText || this.isFormError;
  }

  get inputClass(): string {
    const stateClass =
      this.isError
        ? 'is-error'
        : this.demo && this.state !== 'default'
        ? `is-${this.state}`
        : '';

    const primeSizeClass =
      this.size === 'small'
        ? 'p-inputtext-sm'
        : this.size === 'large'
        ? 'p-inputtext-lg'
        : '';

    return ['gp-input', stateClass, primeSizeClass].filter(Boolean).join(' ');
  }

  get labelClass(): string {
    let sizeClass = '';

    if (this.size === 'small') {
      sizeClass = 'gp-input-label--sm';
    } else if (this.size === 'large') {
      sizeClass = 'gp-input-label--lg';
    }
    return ['gp-input-label', sizeClass].filter(Boolean).join(' ');
  }

  get leadingIconClass(): string {
    if (this.leadingIcon === 'bell') {
      return 'pi-bell';
    }
    return 'pi-search';
  }

  get helperId(): string {
    return `${this.resolvedId}-helper`;
  }

  get errorId(): string {
    return `${this.resolvedId}-error`;
  }

  get describedBy(): string | null {
    if (this.isError && this.errorText) {
      return this.errorId;
    }
    if (!this.isError && this.helperText) {
      return this.helperId;
    }
    return null;
  }
}
