import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild('songWrapper') songWrapper!: ElementRef;
  constructor(private apiService: ApiService) {}

  public Artists: any = [];
  public Songs: any[] = [];
  showAllSongs: boolean = false;
  showAllArtists: boolean = false;
  ngOnInit() {
    this.apiService.getApprovedSongs().subscribe((songs) => {
      this.Songs = songs;
    });

    this.apiService.getArtist().subscribe((artist) => {
      this.Artists = artist;
    });
  }
  toggleSongsView(): void {
    this.showAllSongs = !this.showAllSongs;
  }

  toggleArtistsView(): void {
    this.showAllArtists = !this.showAllArtists;
  }

  public updateSlider() {}
}
