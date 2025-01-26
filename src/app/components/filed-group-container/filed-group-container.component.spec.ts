import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledGroupContainerComponent } from './filed-group-container.component';

describe('FiledGroupContainerComponent', () => {
  let component: FiledGroupContainerComponent;
  let fixture: ComponentFixture<FiledGroupContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiledGroupContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiledGroupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
