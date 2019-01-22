import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { Student } from "../shared/models/Student";
import { ConfirmationModalComponent } from '../shared/modals/confirmation-modal/confirmation-modal.component';
import { AddStudentModalComponent } from '../shared/modals/add-student-modal/add-student-modal.component';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  @ViewChild(ConfirmationModalComponent) confirmModal: ConfirmationModalComponent;
  @ViewChild(AddStudentModalComponent) addStudentModal: AddStudentModalComponent;

  students: Student[] = [];

  constructor(public lsService: LocalStorageService) {
  }

  ngOnInit() {
    this.students = this.lsService.getStudents();
  }

  onClickAddStudent() {
    this.addStudentModal.show((newStudent: Student) => {
      this.students.push(newStudent);
    });
  }

  onClickRemoveStudent(student: Student) {
    this.confirmModal.show(`Do you want to confirm to delete student ${student.firstName} ${student.lastName}?`, () => {
      if (student !== null) {
        this.lsService.removeStudent(student.id);
        this.lsService.removeObjectFromArray(this.students, 'id', student.id);
      }
    });
  }

  sortBy(event) {
    this.students.sort(this.lsService.sortArrayByProperty(event.currentTarget.value));
  }
}








