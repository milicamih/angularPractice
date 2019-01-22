import { Injectable } from '@angular/core';
import { Student } from "../models/Student";
import { Group } from '../models/group';
import { GroupExtended } from '../models/groupExtended';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private lsService: LocalStorageService) {
  }


  // STUDENTS -------------------------------
  getStudents(): Student[] {
    const students = localStorage.getItem('students');

    if (students === null) {
      return [];
    } else {
      return JSON.parse(students);
    }
  }

  addStudent(student: Student): Student {
    const students = this.getStudents();

    student.id = this.createIdSupper(students);

    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    return student;
  }

  setAllStudentsId() {
    const students = this.getStudents();

    for (let i = 0; i < students.length; i++) {
      if (students[i].id == undefined) {
        students[i].id = this.createId(students);
      }
    }
    localStorage.setItem('students', JSON.stringify(students));
    console.log(students);
  }

  removeStudent(id: number) {
    const students = this.getStudents();
    this.removeObjectFromArray(students, 'id', id);
    localStorage.setItem('students', JSON.stringify(students));
  }

  sortBy(value: string){
    const students = this.getStudents();
    students.sort(this.sortArrayByProperty(value));
    localStorage.setItem('groups', JSON.stringify(students));

    return students;
  }
  // GROUPS ----------------------------------
  getGroups(): Group[] {
    const groups = localStorage.getItem('groups');

    if (groups === null) {
      return [];
    } else {
      return JSON.parse(groups);
    }
  }

  addGroup(groupName: Group): Group {
    const groups = this.getGroups();

    groupName.id = this.createIdSupper(groups);

    groups.push(groupName);
    localStorage.setItem('groups', JSON.stringify(groups));

    return groupName;
  }

  setAllGroupsId() {
    const groups = this.getGroups();

    for (let i = 0; i < groups.length; i++) {
      if (groups[i].id == undefined) {
        groups[i].id = this.createId(groups);
      }
    }
    localStorage.setItem('groups', JSON.stringify(groups));
    console.log(groups);
  }

  deleteGroup(id: number) {
    const groups = this.getGroups();

    for (let i = 0; i < groups.length; i++) {
      if (id === groups[i].id) {
        groups.splice(i, 1);
        localStorage.setItem('groups', JSON.stringify(groups));
        break;
      }
    }
  }

  addStudentToGroup(selectedStudentId: number, selectedGroupId: number) {
    const groups = this.getGroups();
    const students = this.getStudents();
    const findGroup = <Group>this.findObjInArray(groups, 'id', selectedGroupId);
   

    if (!this.isNullOrUndefined(findGroup)) {
      if (this.isNullOrUndefined(findGroup.studentsIds)) {
        findGroup.studentsIds = [];
      }
      findGroup.studentsIds.push(selectedStudentId);
      localStorage.setItem('groups', JSON.stringify(groups));
    }
  }

  removeStudentFromGrooup(studentToRemove: Student, groupForRemovingStudent: GroupExtended) {
    const groups = this.getGroups();
    const students = this.getStudents();
    const findGroup = <Group>this.findObjInArray(groups, 'id', groupForRemovingStudent.id);
   // const findStudent = <Student>this.findObjInArray(students, 'id', studentToRemove.id);

    if (!this.isNullOrUndefined(findGroup)) {
      for (let i = 0; i < findGroup.studentsIds.length; i++) {
        if (studentToRemove.id === findGroup.studentsIds[i]) {
          findGroup.studentsIds.splice(i, 1);
          break;
        }
      }
      localStorage.setItem('groups', JSON.stringify(groups));
    }
  }
  // EXTENDED GROUPS -----------------------------------
  getGroupsExtended(): GroupExtended[] {
    const groupExtended: GroupExtended[] = [];
    const groups = this.getGroups();
    const students = this.getStudents();

    groups.forEach(item => {
      const extGroup = new GroupExtended;
      extGroup.id = item.id;
      extGroup.name = item.name;
      extGroup.students = [];

      if (item.studentsIds) {
        extGroup.students = item.studentsIds.map(item => {
          return this.findObjInArray(students, 'id', item);
        })
      }
      groupExtended.push(extGroup);
    });
    return groupExtended;
  }
  // COMMON -----------------------------------
  isNullOrUndefined(value) {
    return value === undefined || value === null;
  }

  removeObjectFromArray(objectsArray, property, value) {
    let searchIndex = -1;

    for (let i = 0; i < objectsArray.length; i++) {
      const objValue = objectsArray[i][property];

      if (objValue === value) {
        searchIndex = i;
        break;
      }
    }
    if (searchIndex > -1) { objectsArray.splice(searchIndex, 1); }
  }

  findObjInArray(arrayData, prop, value): any {
    for (let i = 0; i < arrayData.length; i++) {
      if (arrayData[i][prop] === value) {
        return arrayData[i];
      }
      //return null;
    }
  }

  createId(data: any[]) {
    let maxId = 0;
    data.forEach(element => {
      if (element.id > maxId) {
        maxId = element.id;
      }
    });
    return ++maxId;
  }

  createIdSupper(data: any[]) {
    data.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

    for (let i = 0; i < data.length; i++) {
      if (i + 1 < data[i].id) {
        return i + 1;
      }
    }
    return data.length + 1;
  }

  sortArrayByProperty(propertyName: string) {
    return (a, b) => {
      if (b[propertyName] > a[propertyName]) {
        return -1;
      } else if (b[propertyName] < a[propertyName]) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  changeWayOfSort(value: string) {
     const groups = this.getGroupsExtended();
     groups.sort(this.sortArrayByProperty(value));
     localStorage.setItem('groups', JSON.stringify(groups));

     return groups;
   }
}
