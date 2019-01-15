import { Component } from '@angular/core';

@Component({
    selector: 'app-modal-wrapper',
    templateUrl: './modal-wrapper.component.html',
    styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent {

    visible = false;
    visibleAnimate = false;

    constructor() { }

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('center-dialog-content')) {
           this.hide();
        }
    }

}
