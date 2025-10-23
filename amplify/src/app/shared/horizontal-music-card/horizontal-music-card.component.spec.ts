import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalMusicCardComponent } from './horizontal-music-card.component';

describe('HorizontalMusicCardComponent', () => {
  let component: HorizontalMusicCardComponent;
  let fixture: ComponentFixture<HorizontalMusicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorizontalMusicCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalMusicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
