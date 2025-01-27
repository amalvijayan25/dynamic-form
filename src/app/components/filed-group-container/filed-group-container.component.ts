import { Component } from '@angular/core';
import { FormDataService } from '../../services/form-data.service';
import { FormArray, FormsModule } from '@angular/forms';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-filed-group-container',
  imports: [FormsModule,CdkDropList, CdkDrag],
  templateUrl: './filed-group-container.component.html',
  styleUrl: './filed-group-container.component.scss',
})
export class FiledGroupContainerComponent {
  public formGroups!: FormArray;
  public newFormName!: string;
  public showNameModel: boolean = false;
  public get formGroupsControl() {
    return this.formGroups.controls;
  }
  constructor(private formDataService: FormDataService) {
    this.formGroups = formDataService.dynamicFormsArray;
  }

  public addFormGroup() {
    if (this.newFormName != '') {
      this.formDataService.addNewFormGroup(this.newFormName);
    }    
    this.closeNameModel();
  }

  public openNameModel() {
    this.showNameModel = true;
  }

  public closeNameModel() {
    this.newFormName = '';
    this.showNameModel = false;
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.formGroupsControl, event.previousIndex, event.currentIndex);
  }
}
