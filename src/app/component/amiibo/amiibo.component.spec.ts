import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmiiboComponent } from './amiibo.component';

describe('AmiiboComponent', () => {
  let component: AmiiboComponent;
  let fixture: ComponentFixture<AmiiboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmiiboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmiiboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
