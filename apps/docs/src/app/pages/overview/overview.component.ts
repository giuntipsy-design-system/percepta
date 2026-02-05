import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface DocSection {
  title: string;
  description: string;
  items: string[];
}

@Component({
  selector: 'gp-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  foundations: DocSection = {
    title: 'Token-based foundations',
    description: 'The visual foundation is defined through compiled, versioned tokens.',
    items: ['Base and semantic color', 'Typography and hierarchy', 'States and contrast']
  };

  components: DocSection = {
    title: 'Real components (PrimeNG)',
    description: 'Living catalog of Angular components aligned with the platform.',
    items: ['Button', 'Input Text', 'Select']
  };

  patterns: DocSection = {
    title: 'Interface patterns',
    description: 'Composition rules for frequent flows.',
    items: ['Forms', 'Modals', 'Feedback']
  };
}
