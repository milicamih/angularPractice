import { Component, TemplateRef, OnInit} from '@angular/core';
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

  modalRef: BsModalRef;

  students: Student[];
  firstName: string;
  lastName: string;

  

  constructor(public lsService: LocalStorageService, private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {  //modal for adding students
    this.modalRef = this.modalService.show(template);
  }


  addStudent(newName: HTMLInputElement, newLastName: HTMLInputElement){
    this.lsService.addStudent({
      firstName: newName.value,
      lastName: newLastName.value
    }) ;


    }   
}


 



