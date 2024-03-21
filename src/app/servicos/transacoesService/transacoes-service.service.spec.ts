import { TestBed } from '@angular/core/testing';

import { TransacoesServiceService } from './transacoes-service.service';

describe('TransacoesServiceService', () => {
  let service: TransacoesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransacoesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
