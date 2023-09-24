import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[app-dropdown]'
})

//This directive dropdown only close within the dropdown
// export class DropdownDirective{
//     @HostBinding('class.open') isOpen: boolean = false;

//     @HostListener('click') toggleOpen(){
//         this.isOpen = !this.isOpen;
//     }
// }

export class DropdownDirective{
    @HostBinding('class.open') isOpen: boolean = false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event){
        this.isOpen = this.el.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    constructor(private el: ElementRef){}
}