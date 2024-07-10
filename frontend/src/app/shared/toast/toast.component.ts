import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { matCloseRound } from '@ng-icons/material-icons/round';
import { Toast } from '../../types';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './toast.component.html',
  animations: [
    trigger('slide', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(200%)',
        })
      ),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ToastComponent {
  icon = matCloseRound;
  toasts: (Toast & { animationState: 'in' | 'out' })[] = [];
  private subscription!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.subscription = this.toastService.getToasts().subscribe((toasts) => {
      this.toasts = toasts.map((toast) => ({ ...toast, animationState: 'in' }));
      this.setupAutoClose();
    });
  }

  ngDoCheck() {
    console.log(this.toasts);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getBackgroundColor(type: Toast['type']) {
    switch (type) {
      case 'success':
        return 'bg-green-400';
      case 'error':
        return 'bg-red-400';
      case 'warning':
        return 'bg-yellow-400';
      case 'info':
        return 'bg-blue-400';
    }
    return 'bg-green-400';
  }

  onClose(id: number) {
    const toast = this.toasts.find((t) => t.id === id);
    if (toast) {
      toast.animationState = 'out';
      setTimeout(() => {
        this.toastService.close(id);
      }, 300);
    }
  }

  private setupAutoClose() {
    this.toasts.forEach((toast) => {
      if (toast.duration && toast.duration > 0) {
        setTimeout(() => {
          this.onClose(toast.id);
        }, toast.duration);
      }
    });
  }
}
