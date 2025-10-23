// music-player.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioSyncService } from '../../core/services/audio-sync.service';
import { ApiService } from '../../core/services/api.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

export interface Song {
  title: string;
  artist: string;
  audioUrl: string;
  imageUrl: string;
  artistName: string;
}

@Component({
  selector: 'app-music-player',
  standalone: false,
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss',
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  constructor(
    private audioService: AudioSyncService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  audio!: HTMLAudioElement;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 1;
  currentSongIndex = 0;
  isFavorite = false;

  private currentTimeSubscription!: Subscription;
  private durationSubscription!: Subscription;

  playlist: Song[] = [];

  get currentSong(): Song {
    return this.playlist[this.currentSongIndex];
  }

  ngOnInit() {
    this.audio = new Audio();

    this.audio.crossOrigin = 'anonymous';

    this.audio.preload = 'metadata';

    this.audioService.setAudioElement(this.audio);
    this.setupAudioEventListeners();
    this.subscribeToAudioService();
    this.fetchApprovedSongs();
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
    }

    if (this.currentTimeSubscription) {
      this.currentTimeSubscription.unsubscribe();
    }
    if (this.durationSubscription) {
      this.durationSubscription.unsubscribe();
    }
  }

  private subscribeToAudioService() {
    this.durationSubscription = this.audioService.songDuration$.subscribe((duration) => {
      this.duration = duration;
    });
  }

  private fetchApprovedSongs() {
    this.apiService.getApprovedSongs().subscribe(
      (data: any[]) => {
        this.playlist = data.map((song) => ({
          title: song.title,
          artist: song.artistId,
          artistName: song.artistName,
          audioUrl: `http://localhost:3000/uploads/audio/${song.audioPath}`,
          imageUrl: `http://localhost:3000/uploads/images/${song.coverArt}`,
        }));

        if (this.playlist.length > 0) {
          this.loadCurrentSong();
        }
      },
      (error) => {
        console.error('Failed to fetch approved songs:', error);
      }
    );
  }

  private setupAudioEventListeners() {
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
    });

    this.audio.addEventListener('canplay', () => {});

    this.audio.addEventListener('loadstart', () => {});

    this.audio.addEventListener('ended', () => {
      this.nextSong();
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
    });
  }

  private loadCurrentSong() {
    if (this.currentSong) {
      this.audio.pause();
      this.audio.currentTime = 0;

      this.audio.crossOrigin = 'anonymous';
      this.audio.src = this.currentSong.audioUrl;
      this.audio.load();
      this.audioService.setSongInfo(this.currentSong);
    }
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch((error) => {});
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  previousSong() {
    this.currentSongIndex =
      this.currentSongIndex > 0 ? this.currentSongIndex - 1 : this.playlist.length - 1;
    this.loadCurrentSong();
    if (this.isPlaying) {
      setTimeout(() => this.play(), 100);
    }
  }

  nextSong() {
    this.currentSongIndex =
      this.currentSongIndex < this.playlist.length - 1 ? this.currentSongIndex + 1 : 0;
    this.loadCurrentSong();
    if (this.isPlaying) {
      setTimeout(() => this.play(), 100);
    }
  }

  setVolume(event: Event) {
    const target = event.target as HTMLInputElement;
    this.volume = parseFloat(target.value);
    this.audio.volume = this.volume;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
