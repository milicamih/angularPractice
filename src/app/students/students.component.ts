import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { Student } from '../shared/models/student';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  @ViewChild('template1') removeDialog: TemplateRef<any>;
 

  modalRef: BsModalRef;
  students: Student[] = [];

  studentToRemove: Student = null;


  constructor(public lsService: LocalStorageService, private modalService: BsModalService) {
  }


  ngOnInit() {
    this.students = this.lsService.getStudents();
  }

  openModal(template: TemplateRef<any>) {  //modal for adding students
    this.modalRef = this.modalService.show(template);
  }

  addStudent(newName: HTMLInputElement, newLastName: HTMLInputElement) {
    let newStudent = this.lsService.addStudent({
      firstName: newName.value,
      lastName: newLastName.value
    });

    this.students.push(newStudent);
    newName.value = "";
    newLastName.value = "";
  }

  openRemoveModal(student: Student) {
    this.studentToRemove = student;
    this.openModal(this.removeDialog);
  }

  removeStudentConfirm() {
    if (this.studentToRemove !== null) {
      this.lsService.removeStudent(this.studentToRemove);
      this.lsService.removeObjectFromArray(this.students, 'id', this.studentToRemove.id);
      this.studentToRemove = null;
    }     
  }

  sortBy(property: string) {
    this.students.sort(this.lsService.sortArrayByProperty(property));
  }

 setAllStudentsID() {
   this.lsService.setAllStudentsId();
 }

}








