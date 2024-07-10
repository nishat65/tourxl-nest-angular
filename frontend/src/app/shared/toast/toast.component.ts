import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { matCloseRound } from '@ng-icons/material-icons/round';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  @Input({
    required: true,
  })
  message!: string;
  @Input({
    required: true,
  })
  closeable = true;
  @Output() close = new EventEmitter<boolean>();

  icon = matCloseRound;
}
