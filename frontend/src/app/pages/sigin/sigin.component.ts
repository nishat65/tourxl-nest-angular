import { Component, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Post } from '../../types';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [FormsModule, ToastComponent],
  templateUrl: './sigin.component.html',
})
export class SiginComponent {
  protected email: WritableSignal<string> = signal('');
  protected password: WritableSignal<string> = signal('');
  post$!: Observable<Post>;

  constructor(private readonly authService: AuthService) {}
  ngOnInit() {
    this.post$ = this.authService.getPosts();
    this.post$.subscribe((post) => console.log(post));
    console.log(this.post$);
  }

  closeToast(event: boolean) {
    console.log(event);
  }

  ngDoCheck() {}

  signIn() {
    console.log(this.email(), this.password(), 'submitted');
  }
}
