import { Component, Input } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';

export interface song {
  id: number;
  songTitle: string;
  artist: string;
}
@Component({
  selector: 'app-horizontal-music-card',
  standalone: false,
  templateUrl: './horizontal-music-card.component.html',
  styleUrl: './horizontal-music-card.component.scss',
})
export class HorizontalMusicCardComponent {
  @Input() songTitle: string = '';
  @Input() artistName: string = '';
  @Input() coverArt: string = '';
  @Input() songId: string = '';

  public isFavorite: boolean = false;
  constructor(private apiService: ApiService, private router: Router) {}
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
