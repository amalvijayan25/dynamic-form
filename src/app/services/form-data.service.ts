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
    if (localStorage.getItem('DynamicForm')) {
      let form = JSON.parse(localStorage.getItem('DynamicForm') as string);
      console.log(form);
      
    }
    this.dynamicFormsArray.valueChanges.subscribe({
      next: (updatedForm) => {
        localStorage.setItem('DynamicForm', JSON.stringify(this.dynamicFormsArray.getRawValue()));
        console.log(updatedForm);
      },
    });
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
      fieldValue: [''],
      fieldDescription: [''],
      fieldLabel: [''],
    });

    (
      this.dynamicFormsArray.controls[this.selectedFormIndex()].get(
        'fieldArray'
      ) as FormArray
    ).push(newControl);
  }
}
