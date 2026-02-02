import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { GpButtonComponent } from '../../../../../../shared/components/button/gp-button.component';
import { GpInputComponent } from '../../../../../../shared/components/input/gp-input.component';

@Component({
  selector: 'gp-pattern-form-layout-validation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GpButtonComponent,
    GpInputComponent,
    SelectModule,
    TextareaModule,
    RadioButtonModule,
    CheckboxModule,
    ToggleSwitchModule
  ],
  templateUrl: './form-layout-validation.component.html',
  styleUrl: './form-layout-validation.component.scss'
})
export class FormLayoutValidationComponent {
  readonly roleOptions = [
    { label: 'Research analyst', value: 'analyst' },
    { label: 'Clinical reviewer', value: 'reviewer' },
    { label: 'Operations lead', value: 'operations' }
  ];

  selectedRole = 'reviewer';

  readonly preferenceOptions = [
    { label: 'Email updates', value: 'email' },
    { label: 'In-app reminders', value: 'reminders' }
  ];

  preferenceValues: string[] = ['email'];

  contactMethod = 'email';

  notesValue = '';

  validationNotes = 'Missing required details.';
}
