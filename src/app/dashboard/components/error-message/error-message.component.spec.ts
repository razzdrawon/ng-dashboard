import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message', () => {
    fixture.componentRef.setInput('message', 'Test error message');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test error message');
  });

  it('should show retry button by default', () => {
    fixture.componentRef.setInput('message', 'Test error');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const retryButton = compiled.querySelector('button');
    expect(retryButton).toBeTruthy();
  });

  it('should hide retry button when showRetry is false', () => {
    fixture.componentRef.setInput('message', 'Test error');
    fixture.componentRef.setInput('showRetry', false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const retryButton = compiled.querySelector('button');
    expect(retryButton).toBeFalsy();
  });

  it('should emit retry event when retry button is clicked', () => {
    fixture.componentRef.setInput('message', 'Test error');
    fixture.detectChanges();
    
    const emitSpy = vi.spyOn(component.retry, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const retryButton = compiled.querySelector('button') as HTMLButtonElement;
    retryButton.click();
    
    expect(emitSpy).toHaveBeenCalled();
  });
});

