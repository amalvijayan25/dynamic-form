import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  public dynamicFormsArray!: FormArray;

  constructor(private formBuilder: FormBuilder) {
    this.dynamicFormsArray = formBuilder.array([]);
  }

  public addNewFormGroup(formName: string) {
    let formGroup = this.formBuilder.group({
      formName: formName,
    });
    this.dynamicFormsArray.push(formGroup);

    console.log(this.dynamicFormsArray);
    
  }
}
