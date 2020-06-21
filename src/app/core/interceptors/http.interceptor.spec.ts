import { TestBed } from '@angular/core/testing';

import { HttpIntercept } from './http-intercept.interceptor

describe('HttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpIntercept
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpIntercept = TestBed.inject(HttpIntercept);
    expect(interceptor).toBeTruthy();
  });
});
