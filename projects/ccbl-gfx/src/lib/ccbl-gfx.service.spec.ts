import { TestBed, inject } from '@angular/core/testing';

import { CcblGfxService } from './ccbl-gfx.service';

describe('CcblGfxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CcblGfxService]
    });
  });

  it('should be created', inject([CcblGfxService], (service: CcblGfxService) => {
    expect(service).toBeTruthy();
  }));
});
