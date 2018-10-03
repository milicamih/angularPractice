import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { GroupsComponent } from './groups/groups.component';
import { PageNotFoundComponent } from './not-found.component';

import { ModalModule } from "ngx-bootstrap";




 
const appRoutes: Routes = [
  { path: '',   redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'groups', component: GroupsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    GroupsComponent, 
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    FormsModule
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
