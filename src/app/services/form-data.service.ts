import { computed, Injectable, signal } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { FieldDataModel, FormDataModel } from '../models/from.model';

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
    let formDataObject = this.getStoredFormList();
    if (formDataObject != '') {
      formDataObject.forEach((formData: FormDataModel) => [
        this.addNewFormGroup(formData),
      ]);
    }
    this.dynamicFormsArray.valueChanges.subscribe({
      next: (updatedForm) => {
        this.storeFormList();
      },
    });
  }

  private getStoredFormList() {
    return localStorage.getItem('DynamicForm')
      ? JSON.parse(localStorage.getItem('DynamicForm') || '')
      : '';
  }

  private storeFormList() {
    localStorage.setItem(
      'DynamicForm',
      JSON.stringify(this.dynamicFormsArray.getRawValue())
    );
  }

  private fieldControlBuild(fieldArray: FieldDataModel[]) {
    let fieldArrayControl = this.formBuilder.array([]);
    if (fieldArray?.length) {
      fieldArray.forEach((field) => {
        let newFieldGroup = this.formBuilder.group({
          fieldType: field.fieldType,
          fieldValue: field.fieldValue,
          fieldDescription: field.fieldDescription,
          fieldLabel: field.fieldLabel,
        });

        (fieldArrayControl as FormArray).push(newFieldGroup);
      });
    }
    return fieldArrayControl;
  }

  public addNewFormGroup(formGroupDetails: FormDataModel) {
    let formGroup = this.formBuilder.group({
      formID: formGroupDetails.formID,
      formName: [{ value: formGroupDetails.formName, disabled: true }],
      description: [
        { value: formGroupDetails.description || '', disabled: true },
      ],
      fieldArray: this.fieldControlBuild(formGroupDetails.fieldArray),
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
