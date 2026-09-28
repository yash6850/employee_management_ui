import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

import { authInterceptor } from './auth-interceptor';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('adds the bearer token to outgoing requests', () => {
    localStorage.setItem('token', 'test-token');
    const request = new HttpRequest('GET', '/employees');
    const next: HttpHandlerFn = (req: HttpRequest<unknown>) => {
      expect(req.headers.get('Authorization')).toBe('Bearer test-token');
      return of({} as HttpEvent<unknown>);
    };

    interceptor(request, next).subscribe();
    localStorage.removeItem('token');
  });
});
