import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-artist',
  standalone: false,
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent {
  @ViewChild('artistCard') artistCard!: ElementRef;
  onMouseMove(event: MouseEvent) {
    const card = this.artistCard.nativeElement;
    const cardBorder = card.getBoundingClientRect();

    const x = event.clientX - cardBorder.left;
    const y = event.clientY - cardBorder.top;
    const centerX = cardBorder.width / 2;
    const centerY = cardBorder.height / 2;

    const rotateX = ((y - centerY) / centerY) * 2;
    const rotateY = ((x - centerX) / centerX) * 2;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  resetTilt() {
    this.artistCard.nativeElement.style.transform =
      'perspective(600px) rotateX(0deg) rotateY(0deg)';
  }
}
