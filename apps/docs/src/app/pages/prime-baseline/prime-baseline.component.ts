import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';

interface BaselineOption {
  label: string;
  value: string;
}

@Component({
  selector: 'gp-prime-baseline',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DatePickerModule, InputTextModule, SelectModule, TooltipModule],
  templateUrl: './prime-baseline.component.html',
  styleUrl: './prime-baseline.component.scss'
})
export class PrimeBaselineComponent {
  options: BaselineOption[] = [
    { label: 'Rome', value: 'rome' },
    { label: 'Madrid', value: 'madrid' },
    { label: 'Lisbon', value: 'lisbon' }
  ];

  selectedOption: BaselineOption | null = null;
  textValue = '';
  dateValue: Date | null = null;
}
