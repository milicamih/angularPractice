import { Component, TemplateRef, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { Student } from '../shared/models/student';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  modalRef: BsModalRef;

  constructor(public lsService: LocalStorageService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.students = this.lsService.getStudent();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addStudent(newName: HTMLInputElement, newLastname: HTMLInputElement){
    console.log("hi...", newName.value, newLastname.value);
    this.lsService.addStudent({
      
       firstName: newName.value,
       lastName: newLastname.value
    });
    console.log(this.lsService.getStudent());
    return false;
  }
  
}

 
 



