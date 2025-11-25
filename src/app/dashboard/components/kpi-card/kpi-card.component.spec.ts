import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCardComponent } from './kpi-card.component';

describe('KpiCardComponent', () => {
  let component: KpiCardComponent;
  let fixture: ComponentFixture<KpiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(KpiCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept title input', () => {
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.componentRef.setInput('value', '100');
    fixture.detectChanges();
    expect(component.title()).toBe('Test Title');
  });

  it('should accept value input', () => {
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.componentRef.setInput('value', '123');
    fixture.detectChanges();
    expect(component.value()).toBe('123');
  });

  it('should accept change input', () => {
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.componentRef.setInput('value', '100');
    fixture.componentRef.setInput('change', 10);
    fixture.detectChanges();
    expect(component.change()).toBe(10);
  });

  it('should have default change value of 0', () => {
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.componentRef.setInput('value', '100');
    fixture.detectChanges();
    expect(component.change()).toBe(0);
  });
});

