import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { Group } from '../shared/models/group';
import { Student } from "../shared/models/Student";
import { GroupExtended } from '../shared/models/groupExtended';
import { ConfirmationModalComponent } from '../shared/modals/confirmation-modal/confirmation-modal.component';
import { AddGroupModalComponent } from '../shared/modals/add-group-modal/add-group-modal.component';
import { AddStudentToGroupModalComponent } from '../shared/modals/add-student-to-group-modal/add-student-to-group-modal.component';
import { ConfirmationModalRemoveStudentFromGroupComponent } from '../shared/modals/confirmation-modal-remove-student-from-group/confirmation-modal-remove-student-from-group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @ViewChild(ConfirmationModalComponent) confirmModalForDeletingGroup: ConfirmationModalComponent;
  @ViewChild(AddGroupModalComponent) addGroupModal: AddGroupModalComponent;
  @ViewChild(AddStudentToGroupModalComponent) addStudentToGroupModal: AddStudentToGroupModalComponent;
  @ViewChild(ConfirmationModalRemoveStudentFromGroupComponent) removeStudentFromGroupModal: ConfirmationModalRemoveStudentFromGroupComponent;


  groups: Group[] = [];
  students: Student[] = [];
  groupsExtended: GroupExtended[] = [];

  constructor(private lsService: LocalStorageService) {
  }

  ngOnInit() {
    this.groups = this.lsService.getGroups();
    this.groupsExtended = this.lsService.getGroupsExtended();
  }

  onClickAddNewGroup() {
    this.addGroupModal.show((newGroup: Group) => {
      this.groups.push(newGroup);
    });
  }

  onClickAddStudentToGroupGroup() {
    this.addStudentToGroupModal.show(() => {
      this.groupsExtended = this.lsService.getGroupsExtended();
    });
  }

  onClickRemoveGroup(group: Group) {
    this.confirmModalForDeletingGroup.show(`Do you want to confirm to delete group ?`, () => {
      if (group !== null) {
        this.lsService.deleteGroup(group);
        this.lsService.removeObjectFromArray(this.groups, 'id', group);
      }
    });
  }
 
  onClickRemoveStudentFromGroup(student: Student, group: GroupExtended) {
    this. removeStudentFromGroupModal.show(`Do you want to confirm to delete from ?`, () => {
      if (student != null && group != null) {
        this.lsService.removeStudentFromGrooup(student, group);
        this.lsService.removeObjectFromArray(group.students, 'id', student.id);
      }
    });
  }s


  changeWayOfSort(event) {
    this.groups.sort(this.lsService.sortArrayByProperty(event.currentTarget.value));
  }


}
