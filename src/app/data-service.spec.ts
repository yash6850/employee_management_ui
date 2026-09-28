import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { DataService } from './data-service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adds an explicitly supplied bearer token to the request', () => {
    service.get('/employees', undefined, 'Bearer request-token').subscribe();

    const request = httpMock.expectOne('http://localhost:8080/api/employees');
    expect(request.request.headers.get('Authorization')).toBe('Bearer request-token');
    request.flush([]);
  });
});
