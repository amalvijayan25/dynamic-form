import { Component } from '@angular/core';
import { FieldType } from '../../../utilities/enums';
import { FormDataService } from '../../../services/form-data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAlignLeft, faCalendar, faCalendarDays, faCalendarTimes, faCircleCheck, faCircleDot, faClock, faFont, faHashtag, faList, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-elements-list',
  imports: [FontAwesomeModule],
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
          icon: faFont,
        },
        {
          fieldType: FieldType.MultiLine,
          controlName: 'Multi Line text',
          description: 'Multi text area',
          icon: faAlignLeft,
        },
        {
          fieldType: FieldType.Integer,
          controlName: 'Integer',
          description: 'Integer type area',
          icon: faHashtag,
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
          icon: faCalendar,
        },
        {
          fieldType: FieldType.TimePicker,
          controlName: 'Time',
          description: 'Select time from time picker',
          icon: faClock,
        },
        {
          fieldType: FieldType.DateAndTimePicker,
          controlName: 'Date & Time',
          description: 'Select Date & time from picker',
          icon: faCalendarDays,
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
          icon: faCircleDot,
        },
        {
          fieldType: FieldType.MultiSelect,
          controlName: 'Multi Selection',
          description: 'Select multiple options',
          icon: faCircleCheck,
        },
        {
          fieldType: FieldType.Dropdown,
          controlName: 'Dropdown',
          description: 'Select option from dropdown',
          icon: faList,
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
          icon: faUpload,
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
