import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SongCardComponent } from './song-card/song-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { HorizontalMusicCardComponent } from './horizontal-music-card/horizontal-music-card.component';
import { MatIcon } from '@angular/material/icon';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    NavbarComponent,
    SongCardComponent,

    ArtistCardComponent,
    HorizontalMusicCardComponent,
    MusicPlayerComponent,
    MusicPlayerComponent,
  ],
  imports: [CommonModule, MatIcon, MatButtonModule, MatMenuModule],
  exports: [
    NavbarComponent,
    SongCardComponent,

    HorizontalMusicCardComponent,
    ArtistCardComponent,
    MusicPlayerComponent,
  ],
})
export class SharedModule {}
