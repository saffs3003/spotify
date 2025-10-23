import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { song } from '../../../core/services/api.service';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-add-song',
  standalone: false,
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.scss',
})
export class AddSongComponent {
  constructor(private apiService: ApiService, private token: TokenStorageService) {}
  public songsForm = new FormGroup({
    title: new FormControl(''),
    genre: new FormControl(''),
    coverArt: new FormControl(''),
    audioPath: new FormControl(''),
  });
  coverArtFile: File | null = null;
  audioFile: File | null = null;

  onCoverArtSelected(event: any) {
    this.coverArtFile = event.target.files[0];
  }

  onAudioSelected(event: any) {
    this.audioFile = event.target.files[0];
  }
  public getSongInfo() {
    if (this.songsForm.invalid) {
      throw new Error('Songs not added ');
    } else {
      const id = this.token.getUserInfo().id;
      console.log(`this is arist id:${id}`);
      const song = new FormData();

      song.append('title', this.songsForm.get('title')?.value || '');
      song.append('genre', this.songsForm.get('genre')?.value || '');
      song.append('artistId', id);
      song.append('coverArt', this.coverArtFile!);
      song.append('audioPath', this.audioFile!);
      song.append('isApproved', 'false');

      this.apiService.addSongs(song).subscribe({
        next: (res) => {},
        error: (err) => {},
      });
    }
  }

  @Output() close = new EventEmitter<void>();

  closeComponent() {
    this.close.emit();
  }
}
