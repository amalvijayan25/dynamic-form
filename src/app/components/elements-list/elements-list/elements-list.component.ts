import { Component } from '@angular/core';

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
          controlName: 'Single Line text',
          description: 'Single text area',
          icon: '',
        },
        {
          controlName: 'Multi Line text',
          description: 'Multi text area',
          icon: '',
        },
        {
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
          controlName: 'Date',
          description: 'Select date from date picker',
          icon: '',
        },
        {
          controlName: 'Time',
          description: 'Select time from time picker',
          icon: '',
        },
        {
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
          controlName: 'Single Selection',
          description: 'Select single option',
          icon: '',
        },{
          controlName: 'Multi Selection',
          description: 'Select multiple options',
          icon: '',
        },{
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
          controlName: 'Upload',
          description: 'Upload documents/media files',
          icon: '',
        },
      ],
    },
  ];
}
