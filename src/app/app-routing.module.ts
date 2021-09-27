import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    redirectTo: 'questions',
    pathMatch: 'full',
  },
  {
    path: 'questions',
    loadChildren: () => import('./features/question-form/question-form.module').then(m => m.QuestionFormModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
