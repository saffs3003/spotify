import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false,
})
export class ProfileComponent implements OnInit {
  public musicCards: any[] = [];
  public artistId!: string;
  public artistName: string = 'Artist';
  public upcomingEvents: any[] = [];
  public coverImage: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.artistId = params['artistId'];
      if (!this.artistId) {
        this.artistId = '1';
      }
      this.fetchSongs();
      this.fetchArtistInfo();
      this.fetchUpcommingEvents();
      interval(10000).subscribe(() => this.fetchSongs());
      interval(10000).subscribe(() => this.fetchUpcommingEvents());
    });
  }
  fetchArtistInfo() {
    this.apiService.getParticularArtist(Number(this.artistId)).subscribe({
      next: (res: any) => {
        const artist = res.artist[0];

        if (artist?.profile_image == 'defaultProfile') {
          this.coverImage = `url('../../../../assets/images/chrome.jpg')`;
        } else {
          this.coverImage = `url('http://localhost:3000/uploads/images/${artist.profile_image}')`;
        }
        this.artistName = artist?.name ?? 'Artist';
        console.log(this.coverImage);
      },
      error: (err) => {},
    });
  }

  fetchUpcommingEvents() {
    this.apiService.getParticularArtistEvent(Number(this.artistId)).subscribe({
      next: (res) => {
        if (res.events.length <= 0) {
          return;
        }
        this.upcomingEvents = res.events.map((event: any) => ({
          showId: event.id,
          showTitle: event.title,
          showDate: event.date,
          showTime: event.time,
          showLocation: event.location,
        }));
      },
      error: (err) => {},
    });
  }

  fetchSongs() {
    this.apiService.getArtistSong(Number(this.artistId)).subscribe({
      next: (res) => {
        this.musicCards = res.songs.filter((song) => song.isApproved == true);
      },
      error: (err) => {},
    });
  }
  public refreshSongs(): void {
    this.fetchSongs();
  }
}
