import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuestionFormComponent } from './question-form.component';
import { QuestionFormRoutingModule } from './question-form-routing.module';

import { SharedModule } from '../../shared/shared/shared.module';

@NgModule({
  declarations: [
    QuestionFormComponent,
  ],
  imports: [
    CommonModule,
    QuestionFormRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class QuestionFormModule { }
