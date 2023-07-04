import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['signup']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to login page after successful signup', () => {
    mockAuthService.signup.and.returnValue(of({}));
    component.username = 'testUser';
    component.password = 'testPassword';
    component.confirmPassword = 'testPassword';
    component.onSubmit({ invalid: false } as any);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set errorMessage after failed signup', () => {
    const errorResponse = { error: { message: 'Registration error' } };
    mockAuthService.signup.and.returnValue(throwError(errorResponse));
    component.username = 'testUser';
    component.password = 'testPassword';
    component.confirmPassword = 'testPassword';
    component.onSubmit({ invalid: false } as any);

    expect(component.errorMessage).toBe('Registration error');
  });
});
