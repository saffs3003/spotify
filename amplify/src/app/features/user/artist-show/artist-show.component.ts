import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ArtistShowBookComponent } from './artist-show-book/artist-show-book.component';
import { MatDialog } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
export interface ArtistEvent {
  showId: string;
  showTitle: string;
  showDate: string;
  showTime: string;
  showLocation: string;
}
@Component({
  selector: 'app-artist-show',
  standalone: false,
  templateUrl: './artist-show.component.html',
  styleUrl: './artist-show.component.scss',
})
export class ArtistShowComponent {
  @Input() Event: ArtistEvent[] = [];
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private token: TokenStorageService
  ) {}
  bookEvent(eventData: ArtistEvent) {
    const userId = this.token.getUserInfo().id;
    if (!userId) {
      return;
    }

    const bookingData = {
      userId: Number(userId),
      eventId: eventData.showId,
      showTitle: eventData.showTitle,
      showDate: eventData.showDate,
      showTime: eventData.showTime,
      showLocation: eventData.showLocation,
    };

    this.apiService.bookEvent(bookingData).subscribe({
      next: (res) => {
        this.dialog.open(ArtistShowBookComponent, {
          data: eventData,
        });
      },
      error: (err) => {
        alert('Failed to book event.');
      },
    });
  }
}
