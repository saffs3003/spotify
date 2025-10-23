import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-song-card',
  standalone: false,
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
})
export class SongCardComponent {
  @Input() songTitle: string = '';
  @Input() songImg: string = '';
  @Input() songArtist: string = '';
  @Input() songId: string = '';

  constructor(private router: Router) {}

  navigateToMusicPlayer() {
    if (this.songId) {
      this.router.navigate(['user/songs'], {
        queryParams: {
          songId: this.songId,
        },
      });
    }
  }
}
