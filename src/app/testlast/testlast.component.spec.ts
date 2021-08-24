import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlastComponent } from './testlast.component';

describe('TestlastComponent', () => {
  let component: TestlastComponent;
  let fixture: ComponentFixture<TestlastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestlastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestlastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
