import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { song } from '../../../shared/horizontal-music-card/horizontal-music-card.component';

@Component({
  selector: 'app-playlist',
  standalone: false,
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  public songTitle: string = '';
  public artistName: string = '';
  public coverArt: string = '';
  public songId: string = '';

  ngOnInit(): void {
    this.getSongs();
  }
  public songs: any[] = [];
  getSongs() {
    this.apiService.getAllSongs().subscribe({
      next: (res) => {
        this.songs = res;
        // console.log(`all songs${this.songs[1].artistName}`);
      },
      error: () => {},
    });
  }
}
