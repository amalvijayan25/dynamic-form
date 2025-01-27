import { Component, computed, effect } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import {
  AbstractControl,
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
  public selectedForm!: AbstractControl;
  public disableEdit: boolean = true;
  constructor(private formDataService: FormDataService) {
    effect(() => {
      this.selectedForm =
        formDataService.dynamicFormsArray.controls[
          formDataService.selectedFormIndex()
        ];
    });
  }

  get selectedFormGroup() {
    return this.selectedForm as FormGroup;
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
