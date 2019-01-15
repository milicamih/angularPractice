import { Component, ViewChild } from '@angular/core';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { Student } from "../../models/Student";
import { LocalStorageService } from '../../services/localstorage.service';


@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss']
})
export class AddStudentModalComponent {
  @ViewChild(ModalWrapperComponent) modalWrapper: ModalWrapperComponent;

  model = new Student();
  private calbackMethod = null;

  constructor(public lsService: LocalStorageService) {
  }


  show(calBackMethod: Function) {
    this.calbackMethod = calBackMethod;
    this.model = new Student();
    this.modalWrapper.show();
  }

  clickOnConfirmationButton() {
    const newStudent = this.lsService.addStudent(this.model);
    this.modalWrapper.hide();
    this.calbackMethod(newStudent);
  }


  hide() {
    this.modalWrapper.hide();
  }

}
