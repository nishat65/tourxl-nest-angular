import { Component, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AuthLogin, Post } from '../../types';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sigin.component.html',
})
export class SiginComponent {
  protected email: WritableSignal<string> = signal('');
  protected password: WritableSignal<string> = signal('');
  protected loading: WritableSignal<boolean> = signal(false);

  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService
  ) {}

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastService.show({
      title: message,
      type: type,
      showCloseButton: true,
      duration: 1000,
    });
  }

  signIn() {
    this.authService
      .signCustomerIn({ email: this.email(), password: this.password() })
      .subscribe((state) => {
        this.loading.set(state.loading);
        if (state.data) this.showToastMessage(state.data.message, 'success');
        else if (state.error)
          this.showToastMessage(state.data.message, 'error');
      });
  }
}
