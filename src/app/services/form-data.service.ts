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
          fieldID: field.fieldID,
          fieldType: field.fieldType,
          fieldValue: [{ value: field.fieldValue, disabled: true }],
          fieldDescription: [{ value: field.fieldDescription, disabled: true }],
          fieldLabel: [{ value: field.fieldLabel, disabled: true }],
        });

        (fieldArrayControl as FormArray).push(newFieldGroup);
      });
    }
    return fieldArrayControl;
  }

  public addNewFormGroup(
    formGroupDetails: FormDataModel,
    isNewForm: boolean = false
  ) {
    let formID = isNewForm
      ? this.getNewGroupID(this.dynamicFormsArray)
      : formGroupDetails.formID;

    let formGroup = this.formBuilder.group({
      formID: formID,
      formName: [{ value: formGroupDetails.formName, disabled: true }],
      description: [
        { value: formGroupDetails.description || '', disabled: true },
      ],
      fieldArray: this.fieldControlBuild(formGroupDetails.fieldArray),
    });
    this.dynamicFormsArray.push(formGroup);
    if (isNewForm) {
      this.selectedFormIndex.set(this.dynamicFormsArray.length - 1);
    } else {
      this.selectedFormIndex.set(0);
    }
  }

  public addFormControl(controlDetail: any) {
    let selectedFormFieldArray = this.selectedFormGroup().get(
      'fieldArray'
    ) as FormArray;

    let newControl = this.formBuilder.group({
      fieldID: this.getNewFieldID(selectedFormFieldArray),
      fieldType: controlDetail,
      fieldValue: [{ value: '', disabled: true }],
      fieldDescription: [{ value: '', disabled: true }],
      fieldLabel: [{ value: '', disabled: true }],
    });

    (
      this.dynamicFormsArray.controls[this.selectedFormIndex()].get(
        'fieldArray'
      ) as FormArray
    ).push(newControl);
  }

  private getNewFieldID(formArray: FormArray) {
    return (
      formArray
        .getRawValue()
        .reduce(
          (max, field) => (field.fieldID > max ? field.fieldID : max),
          0
        ) + 1
    );
  }

  private getNewGroupID(formArray: FormArray) {
    return (
      formArray
        .getRawValue()
        .reduce((max, form) => (form.formID > max ? form.formID : max), 0) + 1
    );
  }
}
