import { Component, ViewChild } from '@angular/core';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { Group } from '../../models/group';
import { Student } from "../../models/Student";
import { GroupExtended } from '../../models/groupExtended';
import { LocalStorageService } from '../../services/localstorage.service';


@Component({
  selector: 'app-add-student-to-group-modal',
  templateUrl: './add-student-to-group-modal.component.html',
  styleUrls: ['./add-student-to-group-modal.component.scss']
})
export class AddStudentToGroupModalComponent {
  @ViewChild(ModalWrapperComponent) modalWrapper: ModalWrapperComponent;

  selectedStudentId: string;
  selectedGroupId: string;
  private calbackMethod = null;

  groups: Group[] = [];
  students: Student[] = [];
  groupsExtended: GroupExtended[] = [];

  constructor(public lsService: LocalStorageService) {
  }

  ngOnInit() {
    this.groups = this.lsService.getGroups();
    this.students = this.lsService.getStudents();
  }

  selectStudent(event) {
    this.selectedStudentId = event.currentTarget.value;
  }

  selectGroup(event) {
    this.selectedGroupId = event.currentTarget.value;
  }

  show(calbackMethod: Function) {
    this.calbackMethod = calbackMethod;
    this.modalWrapper.show();
  }

  clickOnConfirmationButton() {
    if (this.selectedStudentId !== null && this.selectedGroupId !== null) {
      this.lsService.addStudentToGroup(Number(this.selectedStudentId), Number(this.selectedGroupId));
    }
    this.modalWrapper.hide();
    this.calbackMethod();
  }

  hide() {
    this.modalWrapper.hide();
  }

}
