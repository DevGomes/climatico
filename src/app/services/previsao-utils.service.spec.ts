import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { PrevisaoUtilsService } from './previsao-utils.service';

describe('PrevisaoUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [PrevisaoUtilsService]
    });
  });

  it('should be created', inject([PrevisaoUtilsService], (service: PrevisaoUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
