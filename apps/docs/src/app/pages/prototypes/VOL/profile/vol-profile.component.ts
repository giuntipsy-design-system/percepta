// vol-profile.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Router } from '@angular/router';
import { GpButtonComponent } from '../../../../../../../shared/components/button/gp-button.component';
import { GpIconComponent } from '../../../../../../../shared/components/icon/gp-icon.component';
import { GpInputComponent } from '../../../../../../../shared/components/input/gp-input.component';
import {
  GpModalBodyDirective,
  GpModalComponent
} from '../../../../../../../shared/components/modal/gp-modal.component';

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
    GpInputComponent,
    GpModalComponent,
    GpModalBodyDirective
  ],
  templateUrl: './vol-profile.component.html',
  styleUrls: ['./vol-profile.component.scss']
})
export class VolProfileComponent {
  hasUnsavedChanges = false;
  isLeaveModalOpen = false;
  pendingRoute: string | null = null;

  constructor(private readonly router: Router) {}

  goToHome(): void {
    this.attemptLeave('/prototypes/vol/home');
  }

  userTypeOptions = [
    { label: 'Profissional', value: 'Profissional' },
    { label: 'Profissional Responsável', value: 'Profissional Responsável' }
  ];
  regionOptions = [{ label: '18ª Região - MT', value: '18ª Região - MT' }];

  userType = this.userTypeOptions[1].value;
  psychologist = true;
  region = this.regionOptions[0].value;
  endpointAuto = false;

  profile = {
    firstName: 'Sergio',
    email: 'sortegasa@gmail.com',
    login: 'sortegasa',
    phone: '',
    crp: '123456789',
    apiEndpoint: '',
    password: '',
    confirmPassword: ''
  };

  markDirty(): void {
    this.hasUnsavedChanges = true;
  }

  saveChanges(): void {
    this.hasUnsavedChanges = false;
    if (this.pendingRoute) {
      const route = this.pendingRoute;
      this.pendingRoute = null;
      this.router.navigateByUrl(route);
    }
    this.isLeaveModalOpen = false;
  }

  discardChanges(): void {
    this.hasUnsavedChanges = false;
    if (this.pendingRoute) {
      const route = this.pendingRoute;
      this.pendingRoute = null;
      this.router.navigateByUrl(route);
    }
    this.isLeaveModalOpen = false;
  }

  closeLeaveModal(): void {
    this.isLeaveModalOpen = false;
    this.pendingRoute = null;
  }

  attemptLeave(route: string): void {
    if (!this.hasUnsavedChanges) {
      this.router.navigateByUrl(route);
      return;
    }
    this.pendingRoute = route;
    this.isLeaveModalOpen = true;
  }
}
