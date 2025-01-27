import { Component, computed, effect } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-handle-container',
  imports: [],
  templateUrl: './form-handle-container.component.html',
  styleUrl: './form-handle-container.component.scss',
})
export class FormHandleContainerComponent {
  public selectedForm!: AbstractControl;
  constructor(private formDataService: FormDataService) {
    effect(() => {
      this.selectedForm =
        formDataService.dynamicFormsArray.controls[
          formDataService.selectedFormIndex()
        ];
    });
  }
}
