import { Component,TemplateRef, OnInit, ViewChild  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { Group } from '../shared/models/group';
import { Student } from '../shared/models/student';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @ViewChild('template4') removeDialog: TemplateRef<any>;
 // @ViewChild('template5') removeDialog1: TemplateRef<any>;

  modalRef: BsModalRef;
  groups: Group[] = [];
  students: Student[] = [];

  studentToAddToGroup: Student;
  groupToAddStudent: Group;
  groupToRemove: Group = null;
  

  constructor(private lsService: LocalStorageService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.groups = this.lsService.getGroups();
    
  }

  openModal(template: TemplateRef<any>) {  //modal for adding students
    this.students = this.lsService.getStudents();
    this.modalRef = this.modalService.show(template);
  }

  addGroup(newGroupName: HTMLInputElement) {
    let newGroup = this.lsService.addGroup({
      name: newGroupName.value
  
    });

    this.groups.push(newGroup);
    newGroupName.value = "";
  }

  deleteGroup(group: Group) {

    for(let i =1; i<this.groups.length; i++){
       if(group == this.groups[i]){
        this.groups.splice(i,1);
       }
    }
   return this.groups;
  }

  openAddingModal() {
    this.studentToAddToGroup = null;
    this.groupToAddStudent = null;
    this.openModal(this.removeDialog);
  }

  selectStudent(event) {
    this.studentToAddToGroup = event.currentTarget.value;
  }

  selectGroup(event) {
    this.groupToAddStudent = event.currentTarget.value;
  }
  
  addStudentToGroup(){     
    this.lsService.addStudentToGroup(this.studentToAddToGroup, this.groupToAddStudent); 
  }
  
  changeWayOfSort(event){
    this.groups.sort(this.lsService.sortArrayByProperty(event.currentTarget.value));
  }
 
}
