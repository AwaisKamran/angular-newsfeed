import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostApprovePageComponent } from './admin-post-approve-page.component';

describe('AdminPostApprovePageComponent', () => {
  let component: AdminPostApprovePageComponent;
  let fixture: ComponentFixture<AdminPostApprovePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostApprovePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostApprovePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
