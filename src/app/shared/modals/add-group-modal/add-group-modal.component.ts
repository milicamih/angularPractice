import { Component, ViewChild } from '@angular/core';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { Group } from '../../models/group';
import { LocalStorageService } from '../../services/localstorage.service';


@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.scss']
})
export class AddGroupModalComponent {
  @ViewChild(ModalWrapperComponent) modalWrapper: ModalWrapperComponent;

  model = new Group();
  private calbackMethod = null;

  constructor(public lsService: LocalStorageService) {
  }


  show(calBackMethod: Function) {
    this.calbackMethod = calBackMethod;
    this.model = new Group();
    this.modalWrapper.show();
  }

  clickOnConfirmationButton() {
    const newGroup = this.lsService.addGroup(this.model);
    this.modalWrapper.hide();
    this.calbackMethod(newGroup);
 }


  hide() {
    this.modalWrapper.hide();
  }

}
