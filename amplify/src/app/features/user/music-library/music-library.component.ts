import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AudioSyncService } from '../../../core/services/audio-sync.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../../../shared/music-player/music-player.component';

@Component({
  selector: 'app-music-library',
  templateUrl: './music-library.component.html',
  styleUrls: ['./music-library.component.scss'],
  standalone: false,
})
export class MusicLibraryComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;

  private ctx!: CanvasRenderingContext2D;
  private audioContext!: AudioContext;
  private analyser!: AnalyserNode;
  private dataArray!: Uint8Array;
  private bars: any[] = [];

  public currentTimeSub!: Subscription;
  public durationSub!: Subscription;
  public songTime: number = 0;
  public currentTime: number = 0;

  constructor(private audioService: AudioSyncService, private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.subscribeToAudio();

    const canvas = this.canvasRef.nativeElement;
    const container = this.containerRef.nativeElement;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    window.addEventListener('resize', () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    });

    this.ctx = canvas.getContext('2d')!;
    const audio = this.audioService.audio;

    if (!audio) {
      return;
    }

    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = this.audioContext.createMediaElementSource(audio);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 512;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    audio.addEventListener('play', () => {
      if (this.audioContext.state === 'suspended') this.audioContext.resume();
    });
    this.audioService.songInfo$.subscribe((songInfo) => {
      // if (songInfo) {
      //   // this.createBars();
      //   // this.animate();
      // } else {
      //   console.warn('No song info yet');
      // }
    });

    this.createBars();
    this.animate();
  }

  private subscribeToAudio() {
    this.durationSub = this.audioService.songDuration$.subscribe((d) => {
      this.songTime = d;
      this.cdr.detectChanges();
    });
  }

  private createBars() {
    class Bar {
      constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string,
        public index: number
      ) {}

      update(value: number) {
        const h = value * 300;
        this.height = h > this.height ? h : this.height * 0.97;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y + 10, this.width, -this.height);
      }
    }

    for (let i = 1; i < this.analyser.frequencyBinCount; i += 6) {
      this.bars.push(new Bar(0 + i, 0, 4, 50, 'white', i));
    }
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.analyser.getByteTimeDomainData(this.dataArray);
    const norm = [...this.dataArray].map((v) => v / 128 - 1);

    this.ctx.save();
    this.ctx.translate(canvas.width / 3, canvas.height / 2);
    this.bars.forEach((bar, i) => {
      bar.update(norm[i] || 0);
      bar.draw(this.ctx);
    });
    this.ctx.restore();

    requestAnimationFrame(this.animate);
  };
}
