import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { Group } from '../shared/models/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];

  constructor(private lsService: LocalStorageService) {
  }

  ngOnInit() {
    this.groups = this.lsService.getGroups();
  }

}
