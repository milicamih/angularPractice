import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Group } from '../models/group';
import { StudentsComponent } from '../../students/students.component';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  students: Student[];
  firstName: string;
  lastName: string;

  constructor(private lsService: LocalStorageService) { 
      this.students = [];
  }
  
  
  getStudent(): Student[] {
    if(localStorage.getItem("students") === null) {
      this.students = []; 
    } else {
      this.students = JSON.parse(localStorage.getItem("students"));
    }
   
    return this.students;
  }

  addStudent(student: Student) : void{
    this.students.push(student);
    let students;

    if(localStorage.getItem("students") === null) {
      students = [];
      students.push(student);
      localStorage.setItem("students", JSON.stringify(students));
    }else{
      JSON.parse(localStorage.getItem("students"));
      students.push(student);
      localStorage.setItem("students", JSON.stringify(students));
    }
 }

      
  removeStudent(student: Student) {
    for(let i=0; this.students.length; i++) {
      if(student == this.students[i]) {
        this.students.splice(i, 1);
        localStorage.setItem("students", JSON.stringify(this.students));
      }
    }
  }    

 




 
 
  // GROUPS ----------------------------------
  getGroups(): Group[] {
    return [];
  }

  createStudent(firstName: string, lastName: string) {

  }

  deleteGroup(id: number) {

  }

  addStudentToGroup(groupId: number, studenId: number) {
      
  }

 
  createGroup(name: string) {

  }

  deleteStudent(id: number) {

  }

  // COMMON -----------------------------------
  createId(table: string) {

  }
}
