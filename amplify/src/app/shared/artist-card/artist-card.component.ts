import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-card',
  standalone: false,
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.scss',
})
export class ArtistCardComponent implements OnInit {
  @Input() artistImg: string = '';
  @Input() artistName: string = '';
  @Input() artistId: string = '';

  constructor(private router: Router) {}
  ngOnInit() {
    if (!this.artistImg) {
      this.artistImg = '../../../assets/images/defaultPfp.jpg';
    }
  }
  navigateToProfile() {
    if (this.artistId) {
      this.router.navigate(['/user/profile'], {
        queryParams: { artistId: this.artistId },
      });
    }
  }
}
