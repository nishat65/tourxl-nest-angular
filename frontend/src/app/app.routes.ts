import { Routes } from '@angular/router';
import { SiginComponent } from './pages/sigin/sigin.component';

export const routes: Routes = [
  { path: '', component: SiginComponent },
  {
    path: 'signin',
    redirectTo: '/',
  },
];
