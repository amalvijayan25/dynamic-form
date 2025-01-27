import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHandleContainerComponent } from './form-handle-container.component';

describe('FormHandleContainerComponent', () => {
  let component: FormHandleContainerComponent;
  let fixture: ComponentFixture<FormHandleContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHandleContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormHandleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
