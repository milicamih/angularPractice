import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { Group } from '../shared/models/group';
import { Student } from "../shared/models/Student";
import { GroupExtended } from '../shared/models/groupExtended';
import { ConfirmationModalComponent } from '../shared/modals/confirmation-modal/confirmation-modal.component';
import { AddGroupModalComponent } from '../shared/modals/add-group-modal/add-group-modal.component';
import { AddStudentToGroupModalComponent } from '../shared/modals/add-student-to-group-modal/add-student-to-group-modal.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @ViewChild(ConfirmationModalComponent) confirmModalForDeleting: ConfirmationModalComponent;
  @ViewChild(AddGroupModalComponent) addGroupModal: AddGroupModalComponent;
  @ViewChild(AddStudentToGroupModalComponent) addStudentToGroupModal: AddStudentToGroupModalComponent;


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
      this.groupsExtended = this.lsService.getGroupsExtended();
    });
  }

  onClickAddStudentToGroupGroup() {
    this.addStudentToGroupModal.show(() => {
      this.groupsExtended = this.lsService.getGroupsExtended();
    });
  }

  onClickRemoveGroup(groupExtended: GroupExtended) {
    this.confirmModalForDeleting.show(`Do you want to confirm to delete group ${groupExtended.name}?`, () => {
      if (groupExtended !== null) {
        this.lsService.deleteGroup(groupExtended.id);
        this.groupsExtended = this.lsService.getGroupsExtended();
      }
    });
  } 
 
  onClickRemoveStudentFromGroup(student: Student, groupExtended: GroupExtended) {
  this.confirmModalForDeleting.show(`Do you want to confirm to delete ${student.firstName} from ${groupExtended.name}?`, () => {
      if (student != null && groupExtended != null) {
         this.lsService.removeStudentFromGrooup(student, groupExtended);
        this.groupsExtended = this.lsService.getGroupsExtended();
      }
     });
   }

  changeWayOfSort(event) {
    this.groupsExtended.sort(this.lsService.sortArrayByProperty(event.currentTarget.value));
  }

}
