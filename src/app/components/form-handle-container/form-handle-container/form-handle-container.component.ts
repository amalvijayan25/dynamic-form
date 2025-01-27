import { Component, computed, effect } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-form-handle-container',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-handle-container.component.html',
  styleUrl: './form-handle-container.component.scss',
})
export class FormHandleContainerComponent {
  public disableEdit: boolean = true;
  public selectedFormGroup!: FormGroup;
  constructor(private formDataService: FormDataService) {
    effect(()=>{
      this.selectedFormGroup = this.formDataService.selectedFormGroup();
    })
  }

  public get fieldArrayControls () {
    return (this.selectedFormGroup.get('fieldArray') as FormArray).controls;
  }
  public toggleEditMode() {
    if (this.selectedFormGroup.get('formName')?.enabled) {
      this.selectedFormGroup.get('formName')?.disable();
      this.selectedFormGroup.get('description')?.disable();
    } else {
      this.selectedFormGroup.get('formName')?.enable();
      this.selectedFormGroup.get('description')?.enable();
    }
  }
}
