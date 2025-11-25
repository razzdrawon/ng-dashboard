import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default message', () => {
    expect(component.message()).toBe('Loading...');
  });

  it('should display custom message', () => {
    fixture.componentRef.setInput('message', 'Custom loading message');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Custom loading message');
  });

  it('should have default size', () => {
    expect(component.size()).toBe('medium');
  });

  it('should return correct diameter for small size', () => {
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();
    expect(component.getDiameter()).toBe(40);
  });

  it('should return correct diameter for medium size', () => {
    fixture.componentRef.setInput('size', 'medium');
    fixture.detectChanges();
    expect(component.getDiameter()).toBe(60);
  });

  it('should return correct diameter for large size', () => {
    fixture.componentRef.setInput('size', 'large');
    fixture.detectChanges();
    expect(component.getDiameter()).toBe(80);
  });
});

