import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent],
  template: `
    <div class="min-h-screen bg-background">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
}
