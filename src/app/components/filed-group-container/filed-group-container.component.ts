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

@Component({
  selector: 'app-filed-group-container',
  imports: [FormsModule, CdkDropList, CdkDrag],
  templateUrl: './filed-group-container.component.html',
  styleUrl: './filed-group-container.component.scss',
})
export class FiledGroupContainerComponent {
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
      const largestId = this.formDataService.dynamicFormsArray
        .getRawValue()
        .reduce((max, form) => (form.formID > max ? form.formID : max), 0);

      let newForm = new FormDataModel();
      newForm.formID = largestId + 1;
      newForm.formName = this.newFormName;
      this.formDataService.addNewFormGroup(newForm);
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
