// vol-profile.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { GpButtonComponent } from '../../../../../../../shared/components/button/gp-button.component';
import { GpIconComponent } from '../../../../../../../shared/components/icon/gp-icon.component';
import { GpInputComponent } from '../../../../../../../shared/components/input/gp-input.component';

@Component({
  selector: 'percepta-vol-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    ToggleSwitchModule,
    RadioButtonModule,
    CheckboxModule,
    GpButtonComponent,
    GpIconComponent,
    GpInputComponent
  ],
  templateUrl: './vol-profile.component.html',
  styleUrls: ['./vol-profile.component.scss']
})
export class VolProfileComponent {
  userTypeOptions = [
    { label: 'Profissional', value: 'Profissional' },
    { label: 'Profissional Responsável', value: 'Profissional Responsável' }
  ];
  regionOptions = [{ label: '18ª Região - MT', value: '18ª Região - MT' }];

  userType = this.userTypeOptions[1].value;
  psychologist = true;
  region = this.regionOptions[0].value;
  endpointAuto = false;
}
