import { computed, Injectable, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  public dynamicFormsArray!: FormArray;
  public selectedFormIndex = signal<number>(-1);
  public selectedFormGroup = computed(() => {
    return this.dynamicFormsArray.controls[
      this.selectedFormIndex()
    ] as FormGroup;
  });

  constructor(private formBuilder: FormBuilder) {
    this.dynamicFormsArray = formBuilder.array([]);
  }

  public addNewFormGroup(formName: string) {
    let formGroup = this.formBuilder.group({
      formName: [{ value: formName, disabled: true }],
      description: [{ value: '', disabled: true }],
      fieldArray: this.formBuilder.array([]),
    });
    this.dynamicFormsArray.push(formGroup);
    this.selectedFormIndex.set(this.dynamicFormsArray.length - 1);
  }

  public addFormControl(controlDetail: any) {
    let newControl = this.formBuilder.group({
      fieldType: controlDetail,
      fieldValue: null,
      fieldLabel: null,
    });

    (this.selectedFormGroup().get('fieldArray') as FormArray).push(newControl);
  }
}
