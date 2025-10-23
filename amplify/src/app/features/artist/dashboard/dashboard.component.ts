import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AddSongComponent } from '../add-song/add-song.component';
import { AddEventComponent } from '../add-event/add-event.component';
import { ApiService } from '../../../core/services/api.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public HorizontalMusicCards: any[] = [];

  public artistId!: string;
  public artistName: string = 'Artist';
  public upcomingEvents: any[] = [];
  public coverImage: string = '';
  constructor(private apiService: ApiService, private token: TokenStorageService) {}
  public ArtistInfo = [
    {
      imgUrl: '../../../../assets/images/billie-eilish-tout.jpg',
      name: 'Billie Eillish',
      noOfSongs: '20',
    },
  ];

  public imageUrl = '../../../../assets/images/billie-eilish-tout.jpg';

  readonly dialog = inject(MatDialog);
  ngOnInit() {
    this.artistId = this.token.getUserInfo().id;
    this.getParticularArtistSongs(this.artistId);
    this.getArtistInfo(this.artistId);
    this.getArtistEvent(this.artistId);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddSongComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }
  openEventDialog() {
    const dialogRef = this.dialog.open(AddEventComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  showEventForm = false;
  showSongForm = false;

  openEventForm() {
    this.showEventForm = true;
  }

  closeEventForm() {
    this.showEventForm = false;
    this.getArtistEvent(this.artistId);
  }

  openSongForm() {
    this.showSongForm = true;
  }

  closeSongForm() {
    this.showSongForm = false;
    this.getParticularArtistSongs(this.artistId);
  }
  public getParticularArtistSongs(artistId: string) {
    this.apiService.getAllSongs().subscribe({
      next: (songs) => {
        this.HorizontalMusicCards = songs.filter((song: any) => song.artistId === artistId);
      },
      error: (err) => {},
    });
  }
  public getArtistInfo(artistId: string) {
    this.apiService.getParticularArtist(Number(this.artistId)).subscribe({
      next: (res: any) => {
        const artist = res.artist[0];

        if (artist?.profile_image == 'defaultProfile') {
          this.coverImage = `url('../../../../assets/images/chrome.jpg')`;
        } else {
          this.coverImage = `url('http://localhost:3000/uploads/images/${artist.profile_image}')`;
        }
        this.artistName = artist?.name ?? 'Artist';
      },
      error: (err) => {},
    });
  }

  public getArtistEvent(artistId: string) {
    this.apiService.getParticularArtistEvent(Number(artistId)).subscribe({
      next: (events) => {
        this.upcomingEvents = events.events.map((event: any) => ({
          showTitle: event.title,
          showDate: event.date,
          showTime: event.time,
          showLocation: event.location,
        }));
      },
      error: (err) => {},
    });
  }
}
