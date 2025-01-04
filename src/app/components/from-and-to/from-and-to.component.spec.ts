import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromAndToComponent } from './from-and-to.component';

describe('FromAndToComponent', () => {
  let component: FromAndToComponent;
  let fixture: ComponentFixture<FromAndToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FromAndToComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromAndToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
