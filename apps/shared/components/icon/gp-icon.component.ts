import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

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
  | 'bell'
  | 'github'
  | 'open-new-window';
type IconSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'gp-icon',
  standalone: true,
  templateUrl: './gp-icon.component.html',
  styleUrl: './gp-icon.component.scss'
})
export class GpIconComponent implements OnChanges {
  @Input() name!: IconName;
  @Input() size: IconSize = 'md';
  @Input() ariaLabel = '';
  @Input() decorative = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] && !this.name) {
      console.warn('[gp-icon] name is required.');
    }
    if (!this.decorative && !this.ariaLabel) {
      console.warn('[gp-icon] ariaLabel is required when decorative is false.');
    }
  }

  get iconClass(): string {
    const iconMap: Record<IconName, string> = {
      add: 'iconoir-plus',
      search: 'iconoir-search',
      filter: 'iconoir-filter',
      delete: 'iconoir-trash',
      'arrow-right': 'iconoir-arrow-right',
      'arrow-left': 'iconoir-arrow-left',
      'arrow-up': 'iconoir-arrow-up',
      'arrow-down': 'iconoir-arrow-down',
      'chevron-right': 'iconoir-nav-arrow-right',
      'chevron-left': 'iconoir-nav-arrow-left',
      'chevron-up': 'iconoir-nav-arrow-up',
      'chevron-down': 'iconoir-nav-arrow-down',
      check: 'iconoir-check',
      close: 'iconoir-xmark',
      minus: 'iconoir-minus',
      edit: 'iconoir-edit',
      settings: 'iconoir-settings',
      info: 'iconoir-info-circle',
      warning: 'iconoir-warning-triangle',
      home: 'iconoir-home',
      user: 'iconoir-user',
      calendar: 'iconoir-calendar',
      mail: 'iconoir-mail',
      download: 'iconoir-download',
      upload: 'iconoir-upload',
      notification: 'iconoir-bell-notification',
      help: 'iconoir-help-circle',
      bell: 'iconoir-bell',
      github: 'iconoir-github',
      'open-new-window': 'iconoir-open-new-window'
    };
    const iconName = this.name ? iconMap[this.name] : '';
    return ['gp-icon', `gp-icon--${this.size}`, iconName].filter(Boolean).join(' ');
  }
}
