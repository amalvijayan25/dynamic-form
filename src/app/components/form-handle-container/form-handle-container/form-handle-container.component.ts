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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faCopy, faGripVertical, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

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
    MatTimepickerModule,
    FontAwesomeModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-handle-container.component.html',
  styleUrl: './form-handle-container.component.scss',
})
export class FormHandleContainerComponent {
  public readonly faEdit = faPen;
  public readonly faCopy = faCopy;
  public readonly faDelete = faTrash;
  public readonly faTick = faCheck;
  public readonly faGrip = faGripVertical;
  public disableEdit: boolean = true;
  public selectedFormGroup!: FormGroup;
  public fieldTypeEnum = FieldType;
  public showDeleteConfirmModel: boolean = false;
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

  public openDeleteConfirmModel() {
    this.showDeleteConfirmModel = true;
  }

  public closeDeleteConfirmModel() {
    this.showDeleteConfirmModel = false;
  }

  public deleteFormGroupHandler(formID: number) {
    let index = this.formDataService.dynamicFormsArray.controls.findIndex(
      (group) => group.value.formID === formID
    );
    if (index != -1) {
      this.formDataService.dynamicFormsArray.removeAt(index);
      this.formDataService.selectedFormIndex.set(-1);
      if (index > 0) {
        this.formDataService.selectedFormIndex.set(index - 1);
      } else {
        this.formDataService.selectedFormIndex.set(0);
      }
    }
  }
}
