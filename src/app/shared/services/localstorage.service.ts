import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  students: Student[];

  constructor(private lsService: LocalStorageService) { 
      this.students = [
        { firstName: "Milica", lastName: "Mihajlovic" },
        {firstName: "Milica", lastName: "Opancucc" },
      ];
  }

 
  getStudent(): Student[] {
    if(localStorage.getItem('students') === null) {
      this.students = [];
    } else {
      this.students = JSON.parse(localStorage.getItem("students")); 
    }
    return this.students;
  }

  addStudent(student: Student) : void{
    this.students.unshift(student);
    let students;

    if(localStorage.getItem('students') === null) {
      students = [];
      students.unshift(student);
      localStorage.setItem('students', JSON.stringify(students));
    }else {
      students = JSON.parse(localStorage.getItem('students'));
      students.unshift(student);
      localStorage.setItem('students', JSON.stringify(students));
    }
  } 

  removeStudent (student: Student) {
      for(let i=0; this.students.length; i++){
        if (student == this.students[i]){
          this.students.splice(i, 1);
          localStorage.setItem('students', JSON.stringify(this.students));
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

  // STUDENTS --------------------------------
  //getStudents(): Student[] {
  //return [];
  //}

  createGroup(name: string) {

  }

  deleteStudent(id: number) {

  }

  // COMMON -----------------------------------
  createId(table: string) {

  }
}
