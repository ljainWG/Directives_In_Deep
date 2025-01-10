import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: 'p[appCustomDirective]',
  standalone: true
})
export class CustomDirective {

  userType = input.required<Permission>({ alias: 'appCustomDirective' });
  authService = inject(AuthService);

  private templateRef = inject(TemplateRef);
  // reference to the template to which directive is attached/added which is ng-template 
  // from this we can control every thing present in this ng-template

  private viewContainerRef = inject(ViewContainerRef);
  // it holds the reference of the place in DOM where this above template is being used


  constructor() {
    console.log('Custom Structural Directive "CustomDirective" is active');
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        console.log("Show Element");
        this.viewContainerRef.createEmbeddedView(this.templateRef); // render new content to a certain place in DOM
        // this ng-template will be there in template but will not be rendered intially and will get rendere only after once you make the call create embedded view 

      }
      else {
        console.log("Don't Show Element");
        this.viewContainerRef.clear();  // clear the rendered content by calling view container
      }
    });
  }

}
