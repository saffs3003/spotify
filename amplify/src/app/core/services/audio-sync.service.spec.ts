import { TestBed } from '@angular/core/testing';

import { AudioSyncService } from './audio-sync.service';

describe('AudioSyncService', () => {
  let service: AudioSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
