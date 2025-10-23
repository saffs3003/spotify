import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../../shared/music-player/music-player.component';

@Injectable({
  providedIn: 'root',
})
export class AudioSyncService {
  private _audio!: HTMLAudioElement;

  public songDuration: number = 0;
  private songDurationSubject = new BehaviorSubject<number>(0);
  songDuration$ = this.songDurationSubject.asObservable();

  setAudioElement(audio: HTMLAudioElement) {
    this._audio = audio;
    // this.songDuration = audio.duration;
    // console.log(`song duratiuon ${this.songDuration}`);
    audio.addEventListener('loadedmetadata', () => {
      this.songDurationSubject.next(audio.duration);
      console.log(`audin metadata ${audio}`);
    });
  }
  private songInfoSubject = new BehaviorSubject<Song | null>(null);
  public songInfo$ = this.songInfoSubject.asObservable();

  setSongInfo(song: Song) {
    this.songInfoSubject.next(song);
  }

  get currentSongInfo(): Song | null {
    return this.songInfoSubject.getValue();
  }

  songTime(): number {
    return this.songDuration;
  }
  get audio(): HTMLAudioElement {
    return this._audio;
  }
}
