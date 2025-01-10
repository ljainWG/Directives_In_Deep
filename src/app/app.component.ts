import { Component, computed, inject } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { LearningResourcesComponent } from './learning-resources/learning-resources.component';
import { AuthService } from './auth/auth.service';
import { CustomDirective } from './auth/custom-directive.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AuthComponent, LearningResourcesComponent, CustomDirective],
})
export class AppComponent {
  private authService = inject(AuthService);
  isAdmin = computed(() => this.authService.activePermission() === 'admin');
  isUser = computed(() => this.authService.activePermission() === 'user');
  isGuest = computed(() => this.authService.activePermission() === 'guest');
}
