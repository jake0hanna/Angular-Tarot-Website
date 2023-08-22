import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndMenuComponent } from './end-menu.component';

describe('EndMenuComponent', () => {
  let component: EndMenuComponent;
  let fixture: ComponentFixture<EndMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndMenuComponent]
    });
    fixture = TestBed.createComponent(EndMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
