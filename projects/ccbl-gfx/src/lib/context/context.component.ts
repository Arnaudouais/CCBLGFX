import {Component, HostListener, Input} from '@angular/core';
import {HumanReadableStateContext} from 'ccbl-js/ProgramObjectInterface';

@Component({
  selector: 'lib-context',
  styleUrls: ['context.component.css'],
  templateUrl: 'context.component.html'
})
export class ContextComponent {
  selected = false;
  hidden = true;

  @Input() context: HumanReadableStateContext;
  @Input() truc: (ContextComponent) => void;
  @Input() varHover: (identifier: string) => void;

  @HostListener('click', ['$event']) onClick($event) {
    $event.stopPropagation();
    this.truc(this);
    this.selected = true;
  }

  unselect() {
    this.selected = false;
  }
}
