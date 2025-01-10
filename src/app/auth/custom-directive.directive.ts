import { Directive, effect, inject, input } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: 'p[appCustomDirective]',
  standalone: true
})
export class CustomDirective {

  userType = input.required<Permission>({ alias: 'appCustomDirective' });
  authService = inject(AuthService);

  constructor() {
    console.log('Custom Structural Directive "CustomDirective" is active');
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        console.log("Show Element");
      }
      else {
        console.log("Don't Show Element");
      }
    });
  }

}
