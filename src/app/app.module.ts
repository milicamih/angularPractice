import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// THIRD PARTY -----------------------------------
import { ModalModule } from 'ngx-bootstrap';
// COMPONETS -------------------------------------
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { GroupsComponent } from './groups/groups.component';
import { PageNotFoundComponent } from './not-found.component';

// MODALS ---------------------------------------
import { ModalWrapperComponent } from './shared/modals/modal-wrapper/modal-wrapper.component';
import { ConfirmationModalComponent } from './shared/modals/confirmation-modal/confirmation-modal.component';
import { AddStudentModalComponent } from './shared/modals/add-student-modal/add-student-modal.component';
import { AddGroupModalComponent } from './shared/modals/add-group-modal/add-group-modal.component';
import { AddStudentToGroupModalComponent } from './shared/modals/add-student-to-group-modal/add-student-to-group-modal.component';
import { ConfirmationModalRemoveStudentFromGroupComponent } from './shared/modals/confirmation-modal-remove-student-from-group/confirmation-modal-remove-student-from-group.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
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
    // MODALS
    ModalWrapperComponent,
    ConfirmationModalComponent,
    AddStudentModalComponent,
    AddGroupModalComponent,
    AddStudentToGroupModalComponent,
    ConfirmationModalRemoveStudentFromGroupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
