import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  private lastId = 0;
  constructor() {}

  getToasts(): Observable<Toast[]> {
    return this.toasts.asObservable();
  }

  show(toast: Omit<Toast, 'id'>): number {
    const id = ++this.lastId;
    const toasts = [...this.toasts.value, { ...toast, id }];
    this.toasts.next(toasts);
    return id;
  }

  close(id: number): void {
    const toasts = this.toasts.value.filter((t) => t.id !== id);
    this.toasts.next(toasts);
  }

  closeAll(): void {
    this.toasts.next([]);
  }
}
