import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { GpIconComponent } from '../icon/gp-icon.component';
import { GpButtonComponent } from '../button/gp-button.component';

type ModalType = 'informational' | 'confirmation' | 'destructive';
type ModalTone = 'default' | 'danger';
type ModalWidth = 'sm' | 'md' | 'lg' | 'xl';

let modalIdCounter = 0;

@Directive({
  selector: 'ng-template[gpModalBody]',
  standalone: true
})
export class GpModalBodyDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: 'ng-template[gpModalFooter]',
  standalone: true
})
export class GpModalFooterDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Component({
  selector: 'gp-modal',
  standalone: true,
  imports: [CommonModule, GpButtonComponent, GpIconComponent],
  templateUrl: './gp-modal.component.html',
  styleUrl: './gp-modal.component.scss'
})
export class GpModalComponent implements OnChanges, AfterViewInit, AfterContentInit {
  @HostBinding('attr.title') hostTitle: string | null = null;

  @Input() open = false;
  @Input() type: ModalType = 'informational';
  @Input() title = '';
  @Input() description?: string;
  @Input() primaryLabel = '';
  @Input() secondaryLabel?: string;
  @Input() tone?: ModalTone;
  @Input() dismissible?: boolean;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() width: ModalWidth = 'md';

  @Output() primary = new EventEmitter<void>();
  @Output() secondary = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @ContentChild(GpModalBodyDirective) bodyTemplate?: GpModalBodyDirective;
  @ContentChild(GpModalFooterDirective) footerTemplate?: GpModalFooterDirective;

  @ViewChild('modalRoot') modalRoot?: ElementRef<HTMLElement>;
  @ViewChild('primaryButton') primaryButton?: ElementRef<HTMLElement>;

  readonly titleId = `gp-modal-title-${modalIdCounter++}`;
  readonly descriptionId = `gp-modal-description-${modalIdCounter++}`;

  private previouslyFocusedElement: HTMLElement | null = null;
  private closeRequested = false;
  private wasOpen = false;
  private closeTimeoutId?: number;

  isRendered = false;

  get effectiveTone(): ModalTone {
    if (this.type === 'destructive') {
      return 'danger';
    }
    return this.tone ?? 'default';
  }

  get isBackdropDismissible(): boolean {
    if (this.type === 'destructive') {
      return false;
    }
    if (this.type === 'informational') {
      return true;
    }
    return this.dismissible ?? true;
  }

  get isEscDismissible(): boolean {
    return this.type !== 'destructive';
  }

  get showSecondaryAction(): boolean {
    if (this.type === 'informational') {
      return false;
    }
    return Boolean(this.secondaryLabel);
  }

  get primaryVariant(): 'primary' | 'danger' {
    return this.type === 'destructive' ? 'danger' : 'primary';
  }

  get secondaryVariant(): 'text' {
    return 'text';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      if (this.open) {
        this.closeRequested = false;
        this.isRendered = true;
        if (this.closeTimeoutId) {
          window.clearTimeout(this.closeTimeoutId);
          this.closeTimeoutId = undefined;
        }
        this.previouslyFocusedElement = document.activeElement as HTMLElement | null;
        this.deferFocus();
      } else if (this.wasOpen) {
        if (!this.closeRequested) {
          this.closed.emit();
        }
        this.restoreFocus();
        this.closeTimeoutId = window.setTimeout(() => {
          this.isRendered = false;
          this.closeTimeoutId = undefined;
        }, 180);
      }
      this.wasOpen = this.open;
    }

    if (!this.title) {
      console.warn('[gp-modal] "title" is required.');
    }
    if (!this.primaryLabel) {
      console.warn('[gp-modal] "primaryLabel" is required.');
    }
    if (this.type === 'destructive' && this.tone && this.tone !== 'danger') {
      console.warn('[gp-modal] Destructive modals always use tone="danger".');
    }
    if (this.type === 'informational' && this.dismissible === false) {
      console.warn('[gp-modal] Informational modals are always dismissible.');
    }
    if (this.type === 'destructive' && this.dismissible === true) {
      console.warn('[gp-modal] Destructive modals are not dismissible.');
    }
    if (this.type === 'informational' && this.secondaryLabel) {
      console.warn('[gp-modal] Informational modals should not render a secondary action.');
    }
  }

  ngAfterContentInit(): void {
    if (!this.bodyTemplate) {
      console.warn('[gp-modal] gpModalBody slot is required.');
    }
  }

  ngAfterViewInit(): void {
    if (this.open) {
      this.deferFocus();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleEscape(event: Event): void {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }
    if (!this.open || !this.isEscDismissible || event.key !== 'Escape') {
      return;
    }
    event.preventDefault();
    this.requestClose();
  }

  onBackdropClick(event: MouseEvent): void {
    if (!this.open || !this.isBackdropDismissible) {
      return;
    }
    if (event.target === event.currentTarget) {
      this.requestClose();
    }
  }

  onPrimaryClick(): void {
    if (this.disabled || this.loading) {
      return;
    }
    this.primary.emit();
  }

  onSecondaryClick(): void {
    if (this.disabled) {
      return;
    }
    this.secondary.emit();
  }

  requestClose(): void {
    if (this.closeRequested) {
      return;
    }
    this.closeRequested = true;
    this.closed.emit();
  }

  private deferFocus(): void {
    setTimeout(() => this.applyInitialFocus(), 0);
  }

  private applyInitialFocus(): void {
    if (!this.open) {
      return;
    }
    if (this.type === 'confirmation' || this.type === 'destructive') {
      this.focusPrimaryButton();
      return;
    }
    const firstFocusable = this.getFirstFocusableElement();
    if (firstFocusable) {
      firstFocusable.focus();
      return;
    }
    this.focusPrimaryButton();
  }

  private getFirstFocusableElement(): HTMLElement | null {
    const root = this.modalRoot?.nativeElement;
    if (!root) {
      return null;
    }
    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    const elements = Array.from(root.querySelectorAll<HTMLElement>(focusableSelectors.join(',')));
    return elements.find(element => !element.hasAttribute('disabled')) ?? null;
  }

  private focusPrimaryButton(): void {
    const host = this.primaryButton?.nativeElement;
    if (!host) {
      return;
    }
    const button = host.querySelector<HTMLElement>('button');
    (button ?? host).focus();
  }

  private restoreFocus(): void {
    if (!this.previouslyFocusedElement) {
      return;
    }
    const element = this.previouslyFocusedElement;
    this.previouslyFocusedElement = null;
    element.focus();
  }
}
