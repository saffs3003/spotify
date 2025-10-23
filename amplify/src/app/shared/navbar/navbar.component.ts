import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Song } from '../music-player/music-player.component';

export interface SearchResult {
  title: string;
  artistName: string;
  coverArt: string;
}
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private searchInput$ = new Subject<string>();

  allSongs: SearchResult[] = [];
  filteredSongs: SearchResult[] = [];

  hideTimeout: any;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.apiService.getAllSongs().subscribe((songs) => {
      this.allSongs = songs;
    });

    this.searchInput$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((query) => {
      this.filteredSongs = this.allSongs.filter((song) =>
        song.title.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';
    this.searchInput$.next(value);
  }
  onSearchFocus() {
    clearTimeout(this.hideTimeout);
  }

  onSearchBlur() {
    this.hideTimeout = setTimeout(() => {
      this.filteredSongs = [];
    }, 200);
  }

  logOut() {
    this.authService.logOut();
  }
}
