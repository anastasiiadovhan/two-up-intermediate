import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get userId', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      return 'mock-userId';
    });

    service.setUserId('test-userId');
    expect(localStorage.setItem).toHaveBeenCalledWith('userId', 'test-userId');
    expect(service.getUserId()).toBe('mock-userId');
  });

  it('should signup', () => {
    const mockUser = {username: 'test', password: 'password'};

    service.signup(mockUser.username, mockUser.password).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/auth/signup');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should login', () => {
    const mockResponse = {token: 'mock-token', userId: 'mock-userId'};
    spyOn(localStorage, 'setItem');

    service.login('test', 'password').subscribe(res => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', res.token);
      expect(localStorage.setItem).toHaveBeenCalledWith('userId', res.userId);
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout', () => {
    spyOn(localStorage, 'removeItem');

    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userId');
  });

  it('should check user is logged in', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return 'mock-token';
    });

    expect(service.isLoggedIn()).toBeTrue();
  });
});
