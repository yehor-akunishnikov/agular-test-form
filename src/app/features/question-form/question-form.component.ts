import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Hobby } from './models/Hobby';
import { Versions } from './models/Versions';
import { EmailValidator } from './validators/EmailValidator';

import { hobbyValidatorWrapper } from './validators/HobbyValidator';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit{
  public questionForm: FormGroup = new FormGroup({});

  public hobbys: Hobby[] = [];
  public frameworks: string[] = [
    'react', 'angular', 'vue'
  ];
  private _versions: Versions = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  public selectable = true;
  public removable = true;
  public addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  public ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.questionForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      framework: new FormControl(null, [Validators.required]),
      frameworkVersion: new FormControl({value: null, disabled: true}, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email], [EmailValidator]),
      hobby: new FormControl(null, [hobbyValidatorWrapper(this.hobbys)]),
    });
  }

  public checkVersion() {
    const versionControl = this.questionForm.get('frameworkVersion');

    this.framework ? versionControl?.enable() : versionControl?.disable();
  }

  public get versions(): string[] {
    return this._versions[this.framework];
  }

  public get framework(): string {
    return this.questionForm.value.framework;
  }

  public addHobby(): void {
    const input = this.questionForm.get('hobby');
    let value: string | null = input?.value;

    if(value) {
      value = value.trim();

      let term = prompt(`И сколько месяцев вы уже занимаетесь ${value}?`);
      
      if(term && parseInt(term)) {
        term = parseInt(term) + '';

        this.hobbys.push({name: value, duration: term});
        input?.setValue(null);
      }
    }
  }

  public removeHobby(hobby: Hobby): void {
    const input = this.questionForm.get('hobby');
    const index = this.hobbys.indexOf(hobby);

    if (index >= 0) this.hobbys.splice(index, 1);
    input?.updateValueAndValidity();
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    console.log({
      ...this.questionForm.value,
      hobby: this.hobbys,
    });
  }
}


