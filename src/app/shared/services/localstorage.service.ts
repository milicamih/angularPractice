import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Group } from '../models/group';
import { StudentsComponent } from '../../students/students.component';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private lsService: LocalStorageService) {
  }

  //STUDENTS -------------------------------

  getStudents(): Student[] {
    let students = localStorage.getItem("students");

    if (students === null) {
      return [];
    } else {
      return JSON.parse(students);
    }
  }

  addStudent(mm: Student): Student {
    let students = this.getStudents();

    mm.id = this.createIdSupper(students);

    students.push(mm);
    localStorage.setItem("students", JSON.stringify(students));

    return mm;
  }

  setAllStudentsId() {
    let students = this.getStudents();

    for (let i = 0; i < students.length; i++) {
      if (students[i].id == undefined) {
        students[i].id = this.createId(students);
      }
    }
    localStorage.setItem("students", JSON.stringify(students));
    console.log(students);
  }

  removeStudent(studentToRemove: Student) {
    let students = this.getStudents();
    this.removeObjectFromArray(students, 'id', studentToRemove.id);
    localStorage.setItem("students", JSON.stringify(students));
  }

  // GROUPS ----------------------------------
  getGroups(): Group[] {
    let groups = localStorage.getItem("groups");

    if (groups === null) {
      return [];
    } else {
      return JSON.parse(groups);
    }
  }

  addGroup(groupName: Group): Group {
    let groups = this.getGroups();
    

    groupName.id = this.createIdSupper(groups);

    groups.push(groupName);
    localStorage.setItem("groups", JSON.stringify(groups));

    return groupName;
  }

  setAllGroupsId() {
    let groups = this.getGroups();

    for (let i = 0; i < groups.length; i++) {
      if (groups[i].id == undefined) {
        groups[i].id = this.createId(groups);


      }
    }

    localStorage.setItem("groups", JSON.stringify(groups));
    console.log(groups);
  }


  deleteGroup(id: Group): Group[] {
    let groups = this.getGroups();

    for (let i = 1; i < groups.length; i++) {
      if (id = groups[i]) {
        groups.splice(i, 1);
        localStorage.setItem("groups", JSON.stringify(groups));
        break;
      }
    }
    return groups;
  }

  addStudentToGroup(studentToAddToGroup: Student, groupToAddStudent: Group) {
    let groups = this.getGroups();
    let students = this.getStudents();
    let findGroup = this.findObjInArray(groups, "id", groupToAddStudent);
    let findStudent = this.findObjInArray(students, "id", studentToAddToGroup);

    if (!this.isNullOrUndefined(findGroup)) {
      if(this.isNullOrUndefined(findGroup.studentsIds)) {
        findGroup.studentsIds = [];
      }
     for(let i = 0; i < findGroup.studentsIds.length; i++){
       if(findGroup.studentsIds[i].id== studentToAddToGroup){
         return studentToAddToGroup;
        }
      } 
      findGroup.studentsIds.push(findStudent);

      localStorage.setItem("groups", JSON.stringify(groups));
    }
  }

 
  // COMMON -----------------------------------
  isNullOrUndefined(value) {
    return value === undefined || value === null;
  }

  removeObjectFromArray(objectsArray, property, value) {
    var searchIndex = -1;

    for (let i = 0; i < objectsArray.length; i++) {
      var objValue = objectsArray[i][property];

      if (objValue === value) {
        searchIndex = i;
        break;
      }
    }

    if (searchIndex > -1) { objectsArray.splice(searchIndex, 1); }
  }

  findObjInArray(arrayData, prop, value) {
    for (let i = 0; i < arrayData.length; i++) {
      if (arrayData[i][prop] == value) {
        return arrayData[i];
      }
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
    }
  }


  changeWayOfSort(value:string) {
    let groups = this.getGroups();
    groups.sort(this.sortArrayByProperty(value));
    localStorage.setItem("groups", JSON.stringify(groups));

    return groups;
  }

 

}
