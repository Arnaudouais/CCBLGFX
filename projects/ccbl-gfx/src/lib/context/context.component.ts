import {Component, HostListener, Input} from '@angular/core';
import {HumanReadableStateContext} from 'ccbl-js/ProgramObjectInterface';

@Component({
  selector: 'lib-context',
  styleUrls: ['context.component.css'],
  templateUrl: 'context.component.html'
})
export class ContextComponent {
  cssClass = [];

  @Input() context: HumanReadableStateContext;
  @Input() truc: (ContextComponent) => void;

  @HostListener('click', ['$event']) onClick($event) {
    $event.stopPropagation();
    this.truc(this);
    this.cssClass.push("selected");
  }

  unselect() {
    this.cssClass.splice(0, this.cssClass.length);
  }

}
