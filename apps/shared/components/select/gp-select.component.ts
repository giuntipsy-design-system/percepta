import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Optional, Self, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { SelectModule } from 'primeng/select';

type SelectSize = 'small' | 'medium' | 'large';
type SelectState = 'default' | 'hover' | 'focus' | 'active' | 'error';
type SelectMode = 'native' | 'custom';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
  disabled?: boolean;
}

let nextId = 0;

@Component({
  selector: 'gp-select',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule],
  templateUrl: './gp-select.component.html',
  styleUrl: './gp-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GpSelectComponent),
      multi: true
    }
  ]
})
export class GpSelectComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value: string | number | null = null;
  @Input() options: SelectOption[] = [];
  @Input() groups: SelectGroup[] = [];
  @Input() size: SelectSize = 'medium';
  @Input() state: SelectState = 'default';
  @Input() mode: SelectMode = 'custom';
  @Input() disabled = false;
  @Input() helperText = '';
  @Input() errorText = '';
  @Input() error = false;
  @Input() inputId = '';
  @Input() ariaLabel = '';
  @Input() optionLabel = 'label';
  @Input() optionValue = 'value';
  @Input() optionDisabled = 'disabled';
  @Input() groupLabel = 'label';
  @Input() groupOptions = 'options';
  @Input() demo = false;

  resolvedId = '';
  labelId = '';
  internalValue: string | number | null = null;
  internalDisabled = false;
  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl | null) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.resolvedId = this.inputId || `gp-select-${++nextId}`;
    this.labelId = `${this.resolvedId}-label`;
    if (!this.ngControl) {
      this.internalValue = this.value;
      this.internalDisabled = this.disabled;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.demo && changes['state'] && this.state !== 'default') {
      console.warn('[gp-select] The "state" input is for documentation only. Avoid using it in product code.');
    }
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

  handleNativeChange(event: Event): void {
    const rawValue = (event.target as HTMLSelectElement).value;
    const nextValue = this.resolveNativeValue(rawValue);
    this.internalValue = nextValue;
    this.onChange(nextValue);
  }

  handleCustomChange(event: { value: string | number | null }): void {
    const nextValue = event?.value ?? null;
    this.internalValue = nextValue;
    this.onChange(nextValue);
  }

  handleBlur(): void {
    this.onTouched();
  }

  get resolvedDisabled(): boolean {
    return this.ngControl ? this.internalDisabled : this.disabled;
  }

  get hasGroups(): boolean {
    return !!this.groups?.length;
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

  get sizeClass(): string {
    if (this.size === 'small') {
      return 'gp-select--sm';
    }
    if (this.size === 'large') {
      return 'gp-select--lg';
    }
    return '';
  }

  get stateClass(): string {
    if (this.isError) {
      return 'is-error';
    }
    if (this.demo && this.state !== 'default') {
      return `is-${this.state}`;
    }
    return '';
  }

  get selectClass(): string {
    return ['gp-select', this.sizeClass, this.stateClass].filter(Boolean).join(' ');
  }

  get nativeSelectClass(): string {
    return ['gp-select-native', this.sizeClass, this.stateClass].filter(Boolean).join(' ');
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

  private get allOptions(): SelectOption[] {
    if (this.hasGroups) {
      return this.groups.flatMap((group) => group.options);
    }
    return this.options;
  }

  private resolveNativeValue(rawValue: string): string | number | null {
    if (rawValue === '') {
      return null;
    }
    const match = this.allOptions.find((option) => String(option.value) === rawValue);
    return match ? match.value : rawValue;
  }
}
