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
import {
  faCheck,
  faCopy,
  faGripVertical,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { MatSelectModule } from '@angular/material/select';

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
    FontAwesomeModule,
    MatSelectModule,
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
  public showFieldDeleteConfirmModel: boolean = false;
  public selectedFieldID!: number;
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
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
  public isFieldEditEnabled(index: number) {
    return this.fieldArrayControls.at(index)?.get('fieldLabel')?.enabled;
  }
  public toggleFieldEditMode(index: number) {
    if (this.isFieldEditEnabled(index)) {
      this.fieldArrayControls.at(index)?.get('fieldLabel')?.disable();
      this.fieldArrayControls.at(index)?.get('fieldDescription')?.disable();
      this.fieldArrayControls.at(index)?.get('fieldValue')?.disable();
    } else {
      this.fieldArrayControls.at(index)?.get('fieldLabel')?.enable();
      this.fieldArrayControls.at(index)?.get('fieldDescription')?.enable();
      this.fieldArrayControls.at(index)?.get('fieldValue')?.enable();
    }
  }
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.fieldArrayControls,
      event.previousIndex,
      event.currentIndex
    );

    this.formDataService.dynamicFormsArray.updateValueAndValidity();
  }

  public openGroupDeleteConfirmModel() {
    this.showDeleteConfirmModel = true;
  }

  public closeGroupDeleteConfirmModel() {
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

  public openFieldDeleteModel(index: number) {
    this.selectedFieldID = this.fieldArrayControls
      .at(index)
      ?.get('fieldID')?.value;
    this.showFieldDeleteConfirmModel = true;
  }

  public deleteFieldHandler() {
    let index = this.fieldArrayControls.findIndex(
      (field) => field.value.fieldID === this.selectedFieldID
    );
    if (index != -1) {
      (this.selectedFormGroup.get('fieldArray') as FormArray).removeAt(index);
    }
    this.closeFieldDeleteConfirmModel();
  }
  public closeFieldDeleteConfirmModel() {
    this.showFieldDeleteConfirmModel = false;
    this.selectedFieldID = -1;
  }
}
