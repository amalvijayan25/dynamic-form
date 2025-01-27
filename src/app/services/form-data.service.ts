import { Injectable, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  public dynamicFormsArray! : FormArray;
  public selectedFormIndex = signal<number>(-1);

  constructor(private formBuilder: FormBuilder) {
    this.dynamicFormsArray = formBuilder.array([]);
  }

  public addNewFormGroup(formName: string) {
    let formGroup = this.formBuilder.group({
      formName: new FormControl({value:formName,disabled:true}),
      description: new FormControl({value:'', disabled:true})
    });
    this.dynamicFormsArray.push(formGroup);   
    this.selectedFormIndex.set(this.dynamicFormsArray.length -1) 
  }
}
