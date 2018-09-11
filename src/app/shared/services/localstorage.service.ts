import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

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
  getStudents(): Student[] {
    return [];
  }

  createGroup(name: string) {

  }

  deleteStudent(id: number) {

  }

  // COMMON -----------------------------------
  createId(table: string) {

  }
}
