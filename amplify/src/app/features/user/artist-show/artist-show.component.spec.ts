import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistShowComponent } from './artist-show.component';

describe('ArtistShowComponent', () => {
  let component: ArtistShowComponent;
  let fixture: ComponentFixture<ArtistShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
