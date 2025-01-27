import { Component } from '@angular/core';
import { FieldType } from '../../../utilities/enums';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'app-elements-list',
  imports: [],
  templateUrl: './elements-list.component.html',
  styleUrl: './elements-list.component.scss',
})
export class ElementsListComponent {
  public elementsList = [
    {
      categoryName: 'Text',
      controlList: [
        {
          fieldType: FieldType.SingleText,
          controlName: 'Single Line text',
          description: 'Single text area',
          icon: '',
        },
        {
          fieldType: FieldType.MultiLine,
          controlName: 'Multi Line text',
          description: 'Multi text area',
          icon: '',
        },
        {
          fieldType: FieldType.Integer,
          controlName: 'Integer',
          description: 'Integer type area',
          icon: '',
        },
      ],
    },
    {
      categoryName: 'Date',
      controlList: [
        {
          fieldType: FieldType.DatePicker,
          controlName: 'Date',
          description: 'Select date from date picker',
          icon: '',
        },
        {
          fieldType: FieldType.TimePicker,
          controlName: 'Time',
          description: 'Select time from time picker',
          icon: '',
        },
        {
          fieldType: FieldType.DateAndTimePicker,
          controlName: 'Date & Time',
          description: 'Select Date & time from picker',
          icon: '',
        },
      ],
    },
    {
      categoryName: 'Multi',
      controlList: [
        {
          fieldType: FieldType.SingleSelect,
          controlName: 'Single Selection',
          description: 'Select single option',
          icon: '',
        },
        {
          fieldType: FieldType.MultiSelect,
          controlName: 'Multi Selection',
          description: 'Select multiple options',
          icon: '',
        },
        {
          fieldType: FieldType.Dropdown,
          controlName: 'Dropdown',
          description: 'Select option from dropdown',
          icon: '',
        },
      ],
    },
    {
      categoryName: 'Media',
      controlList: [
        {
          fieldType: FieldType.FileUpload,
          controlName: 'Upload',
          description: 'Upload documents/media files',
          icon: '',
        },
      ],
    },
  ];

  constructor(private formDataService: FormDataService){

  }

  public fieldSelectionHandler(selectedControl:any) {
    this.formDataService.addFormControl(selectedControl.fieldType);    
  }
}
