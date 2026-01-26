import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GpIconComponent } from '../../../../../../shared/components/icon/gp-icon.component';

type IconName =
  | 'add'
  | 'search'
  | 'filter'
  | 'delete'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-up'
  | 'chevron-down'
  | 'check'
  | 'close'
  | 'minus'
  | 'edit'
  | 'settings'
  | 'info'
  | 'warning'
  | 'home'
  | 'user'
  | 'calendar'
  | 'mail'
  | 'download'
  | 'upload'
  | 'notification'
  | 'help'
  | 'bell';

@Component({
  selector: 'gp-icon-doc',
  standalone: true,
  imports: [CommonModule, GpIconComponent],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  readonly iconNames: IconName[] = [
    'add',
    'search',
    'filter',
    'delete',
    'arrow-right',
    'arrow-left',
    'arrow-up',
    'arrow-down',
    'chevron-right',
    'chevron-left',
    'chevron-up',
    'chevron-down',
    'check',
    'close',
    'minus',
    'edit',
    'settings',
    'info',
    'warning',
    'home',
    'user',
    'calendar',
    'mail',
    'download',
    'upload',
    'notification',
    'help',
    'bell'
  ];

  async copySnippet(iconName: IconName): Promise<void> {
    const snippet = `<gp-icon name="${iconName}" ariaLabel="${this.humanLabel(iconName)}" />`;
    try {
      await navigator.clipboard.writeText(snippet);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = snippet;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }

  humanLabel(iconName: IconName): string {
    return iconName.replace('-', ' ');
  }
}
