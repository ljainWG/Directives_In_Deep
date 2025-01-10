import { Directive, input } from "@angular/core"

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'confirmIfUserWantToLeavePage($event)'
    }
})

export class SafeLinkDirective {

    queryParam = input("hello", { alias: 'appSafeLink' });
    constructor() {
        console.log('SafeLinkDirective is active');
    }
    confirmIfUserWantToLeavePage($event: MouseEvent) {
        const doesUserWantToLeavePage = window.confirm("Do you really want to leave page ?");
        if (doesUserWantToLeavePage) {
            const externalLink = (event!.target as HTMLAnchorElement).href;
            (event!.target as HTMLAnchorElement).href = externalLink + "?from=myapp&" + this.queryParam();
            return;
        }
        event?.preventDefault();
    }
}