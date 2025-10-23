import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { TokenStorageService } from '../../../../core/services/token-storage.service';
import { Input } from '@angular/core';
import { ArtistEvent } from '../artist-show.component';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-artist-show-book',
  standalone: false,
  templateUrl: './artist-show-book.component.html',
  styleUrl: './artist-show-book.component.scss',
})
export class ArtistShowBookComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ArtistEvent) {}
}
