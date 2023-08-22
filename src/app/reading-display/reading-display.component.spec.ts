import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingDisplayComponent } from './reading-display.component';

describe('ReadingDisplayComponent', () => {
  let component: ReadingDisplayComponent;
  let fixture: ComponentFixture<ReadingDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadingDisplayComponent]
    });
    fixture = TestBed.createComponent(ReadingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
