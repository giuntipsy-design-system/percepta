import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'gp-textarea-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, TextareaModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  currentSection = 'overview';

  previewEmpty = '';
  previewFilled = 'Candidate summary: strong problem-solving and a calm response under pressure.';
  previewError = 'Needs follow-up on missing details.';

  stateDefault = '';
  stateFilled = 'This response includes key observations from the interview.';
  stateError = 'Incomplete response.';
  stateDisabled = 'This field is currently locked.';

  scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    this.currentSection = id;
    const target = document.getElementById(id);
    const container = document.querySelector<HTMLElement>('.app-content');
    const tabs = document.querySelector<HTMLElement>('.section-tabs');
    if (!target || !container) {
      return;
    }
    if (id === 'overview') {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const tabsHeight = tabs?.offsetHeight ?? 0;
    const extraGap = 24;
    const offset =
      targetRect.top - containerRect.top + container.scrollTop - tabsHeight - extraGap;
    container.scrollTo({ top: offset, behavior: 'smooth' });
  }
}
