import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-all-info',
  standalone: false,
  templateUrl: './all-info.component.html',
  styleUrl: './all-info.component.scss',
})
export class AllInfoComponent implements OnInit {
  public musicCards: any[] = [];
  public Events: any[] = [];
  public artistId: string = '';
  public filteredMusicCards: any[] = [];
  public approvalStatusFilter: 'all' | 'approved' | 'pending' = 'all';

  constructor(private apiService: ApiService, private token: TokenStorageService) {}
  ngOnInit() {
    this.artistId = this.token.getUserInfo().id;
    this.getAllUploadedSongs();
    this.getAllUploadedEvents();
  }
  public getAllUploadedSongs() {
    this.apiService.getAllSongs().subscribe({
      next: (songs) => {
        this.musicCards = songs.filter((song) => song.artistId === this.artistId);
        console.log(`Songs by artist are these:`, this.musicCards);
      },
      error: (err) => {
        console.error('Error fetching songs:', err);
      },
    });
  }
  public getAllUploadedEvents() {
    this.apiService.getAllEvents().subscribe({
      next: (events: any) => {
        this.Events = events.filter((event: any) => event.artistId === this.artistId);
        console.log(`Events by artist are these:`, this.musicCards);
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching songs:', err);
      },
    });
  }

  public applyFilters() {
    if (this.approvalStatusFilter === 'approved') {
      console.log('approved');
      this.filteredMusicCards = this.musicCards.filter((song) => song.isApproved === 1);
    } else if (this.approvalStatusFilter === 'pending') {
      console.log('pending');
      this.filteredMusicCards = this.musicCards.filter((song) => song.isApproved === 0);
      console.log(this.filteredMusicCards);
    } else {
      this.filteredMusicCards = [...this.musicCards];
    }
  }
}
