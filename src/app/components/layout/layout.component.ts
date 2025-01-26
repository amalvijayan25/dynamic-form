import { Component } from '@angular/core';
import { FiledGroupContainerComponent } from '../filed-group-container/filed-group-container.component';

@Component({
  selector: 'app-layout',
  imports: [FiledGroupContainerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
