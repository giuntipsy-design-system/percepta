import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface CityOption {
  name: string;
  code: string;
}

@Component({
  selector: 'gp-select-doc',
  standalone: true,
  imports: [FormsModule, SelectModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  cities: CityOption[] = [
    { name: 'Rome', code: 'RM' },
    { name: 'Madrid', code: 'MD' },
    { name: 'Lisbon', code: 'LS' }
  ];

  selectedCity: CityOption | null = null;
}
