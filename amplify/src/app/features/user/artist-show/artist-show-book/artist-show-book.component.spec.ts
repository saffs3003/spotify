import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistShowBookComponent } from './artist-show-book.component';

describe('ArtistShowBookComponent', () => {
  let component: ArtistShowBookComponent;
  let fixture: ComponentFixture<ArtistShowBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistShowBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistShowBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
