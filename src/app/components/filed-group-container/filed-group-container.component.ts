import { Component } from '@angular/core';
import { FormDataService } from '../../services/form-data.service';
import { FormArray, FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { FormDataModel } from '../../models/from.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faGripVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filed-group-container',
  imports: [FormsModule, CdkDropList, CdkDrag, FontAwesomeModule],
  templateUrl: './filed-group-container.component.html',
  styleUrl: './filed-group-container.component.scss',
})
export class FiledGroupContainerComponent {
  public readonly faAdd = faCirclePlus;
  public readonly faGrip = faGripVertical;
  public formGroups!: FormArray;
  public newFormName!: string;
  public showNameModel: boolean = false;
  public get formGroupsControl() {
    return (this.formGroups as FormArray).controls;
  }
  constructor(private formDataService: FormDataService) {
    this.formGroups = formDataService.dynamicFormsArray;
  }

  public addFormGroup() {
    if (this.newFormName != '') {
     let newForm = new FormDataModel();
      newForm.formName = this.newFormName;
      this.formDataService.addNewFormGroup(newForm, true);
    }
    this.closeNameModel();
  }
  public selectFromGroupHandler(formGroupIndex: number) {
    this.formDataService.selectedFormIndex.set(formGroupIndex);
  }
  public openNameModel() {
    this.showNameModel = true;
  }

  public closeNameModel() {
    this.newFormName = '';
    this.showNameModel = false;
  }

  public drop(event: CdkDragDrop<string[]>) {
    const selectedFormID = this.formDataService.dynamicFormsArray
      .getRawValue()
      .at(this.formDataService.selectedFormIndex()).formID;

    moveItemInArray(
      this.formGroupsControl,
      event.previousIndex,
      event.currentIndex
    );

    const newSelectedIndex = this.formDataService.dynamicFormsArray
      .getRawValue()
      .findIndex((form: FormDataModel) => form.formID === selectedFormID);

    this.formDataService.selectedFormIndex.set(newSelectedIndex);
    this.formDataService.dynamicFormsArray.updateValueAndValidity();
  }
}
