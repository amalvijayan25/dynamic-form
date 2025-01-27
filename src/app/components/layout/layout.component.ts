import { Component } from '@angular/core';
import { FiledGroupContainerComponent } from '../filed-group-container/filed-group-container.component';
import { FormHandleContainerComponent } from '../form-handle-container/form-handle-container/form-handle-container.component';
import { ElementsListComponent } from '../elements-list/elements-list/elements-list.component';

@Component({
  selector: 'app-layout',
  imports: [FiledGroupContainerComponent, FormHandleContainerComponent, ElementsListComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
