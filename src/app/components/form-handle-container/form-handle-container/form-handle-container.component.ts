import { Component, computed, effect } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { TextFieldModule } from '@angular/cdk/text-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatTimepickerModule} from '@angular/material/timepicker';

import { FieldType } from '../../../utilities/enums';

@Component({
  selector: 'app-form-handle-container',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    TextFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTimepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-handle-container.component.html',
  styleUrl: './form-handle-container.component.scss',
})
export class FormHandleContainerComponent {
  public disableEdit: boolean = true;
  public selectedFormGroup!: FormGroup;
  public fieldTypeEnum = FieldType;
  constructor(private formDataService: FormDataService) {
    effect(() => {
      this.selectedFormGroup = this.formDataService.selectedFormGroup();
    });
  }

  public get fieldArrayControls() {
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

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.fieldArrayControls,
      event.previousIndex,
      event.currentIndex
    );
  }
}
