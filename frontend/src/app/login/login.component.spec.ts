import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login', 'setUserId']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call login if username or password is empty', () => {
    component.username = '';
    component.password = 'password';
    component.onSubmit();
    expect(mockAuthService.login.calls.count()).toBe(0);

    component.username = 'username';
    component.password = '';
    component.onSubmit();
    expect(mockAuthService.login.calls.count()).toBe(0);
  });

  it('should call AuthService.login and navigate to home on successful login', () => {
    component.username = 'username';
    component.password = 'password';

    const response = { userId: '1' };
    mockAuthService.login.and.returnValue(of(response));

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith('username', 'password');
    expect(mockAuthService.setUserId).toHaveBeenCalledWith('1');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle login error', () => {
    component.username = 'username';
    component.password = 'password';

    const errorResponse = { error: { message: 'Login failed' }};
    mockAuthService.login.and.returnValue(throwError(errorResponse));

    component.onSubmit();

    expect(component.errorMessage).toEqual('Login failed');
  });
});
