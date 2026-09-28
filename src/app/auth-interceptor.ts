import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('=========== INTERCEPTOR ===========');
  console.log('URL:', req.url);
  if(req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    console.log('Skipping interceptor for login/register request');
    return next(req);
  }
  const token = (localStorage.getItem('authToken') ?? localStorage.getItem('token'))?.replace(/^Bearer\s+/i, '');
  console.log('TOKEN FROM LOCAL STORAGE:', token);
  if (token && !req.headers.has('Authorization')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Authorization Header:', authReq.headers.get('Authorization'));
    return next(authReq);
  }
  console.log('NO TOKEN FOUND');
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Handle unauthorized error (e.g., redirect to login page)
        console.error('Unauthorized access - token expired or invalid - redirecting to login.');
      }
      if (error.status === 403) {
        // Handle forbidden error (e.g., show an error message)
        console.error('Forbidden access - you do not have permission to access this resource.');
      }
      if (error.status === 500) {
        // Handle internal server error (e.g., show an error message)
        console.error('Internal server error - please try again later.');
      }
      return throwError(() => error);
    })
  );
};
