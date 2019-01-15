import { Component, ViewChild } from '@angular/core';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @ViewChild(ModalWrapperComponent) modalWrapper: ModalWrapperComponent;

  private calbackMethod = null;
  title = '';

  constructor() { }


  show(text: string, calBackMethod: Function) {
    this.title = text;
    this.calbackMethod = calBackMethod;
    this.modalWrapper.show();
  }

  clickOnConfirmationButton() {
    this.modalWrapper.hide();
    this.calbackMethod();
  }

  hide() {
    this.modalWrapper.hide();
  }

}
