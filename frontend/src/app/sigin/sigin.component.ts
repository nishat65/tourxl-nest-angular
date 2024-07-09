import {
  Component,
  WritableSignal,
  computed,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sigin.component.html',
  styleUrl: './sigin.component.css',
})
export class SiginComponent {
  protected email: WritableSignal<string> = signal('');
  protected password: WritableSignal<string> = signal('');

  ngDoCheck() {}
}
