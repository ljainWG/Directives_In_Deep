import { Directive, ElementRef, inject, input } from "@angular/core"

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        // '(click)': 'confirmIfUserWantToLeavePage_1($event)'
        '(click)': 'confirmIfUserWantToLeavePage_2($event)'
    }
})

export class SafeLinkDirective {

    queryParam = input("hello", { alias: 'appSafeLink' });
    constructor() {
        console.log('SafeLinkDirective is active');
    }

    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    confirmIfUserWantToLeavePage_1($event: MouseEvent) {
        const doesUserWantToLeavePage = window.confirm("Do you really want to leave page ?");
        if (doesUserWantToLeavePage) {
            const externalLink = (event?.target as HTMLAnchorElement).href;
            (event?.target as HTMLAnchorElement).href = externalLink + "?from=myapp&" + this.queryParam();
            return;
        }
        event?.preventDefault();
    }

    // this is added after creating hostElementRef varianle and using dependency injection
    confirmIfUserWantToLeavePage_2($event: MouseEvent) {
        const doesUserWantToLeavePage = window.confirm("Do you really want to leave page ?");
        if (doesUserWantToLeavePage) {
            const externalLink = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = externalLink + "?from=myapp&" + this.queryParam();
            return;
        }
        event?.preventDefault();
    }

}