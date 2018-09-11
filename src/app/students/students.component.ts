import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { Student } from '../shared/models/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];

  constructor(private lsService: LocalStorageService) {
  }

  ngOnInit() {
    this.students = this.lsService.getStudents();
  }

}
