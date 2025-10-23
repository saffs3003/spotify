import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'app-feature',
  standalone: false,
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss',
})
export class FeatureComponent {
  isPlaying = false;
  currentTime = 0;
  duration = 200;
  song = {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    image: '../../../assets/images/1.jpg',
  };

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }

  @ViewChild('musicCard') cardRef!: ElementRef;
  onMouseMove(event: MouseEvent) {
    const card = this.cardRef.nativeElement;
    const cardBorder = card.getBoundingClientRect();

    const x = event.clientX - cardBorder.left;
    const y = event.clientY - cardBorder.top;
    const centerX = cardBorder.width / 2;
    const centerY = cardBorder.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  resetTilt() {
    this.cardRef.nativeElement.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
  }
}
