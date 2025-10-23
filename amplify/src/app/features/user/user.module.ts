import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MusicLibraryComponent } from './music-library/music-library.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { SidebarModule } from '../../shared/sidebar/sidebar.module';
import { MatIconModule } from '@angular/material/icon';
import { ArtistShowComponent } from './artist-show/artist-show.component';
import { ArtistShowBookComponent } from './artist-show/artist-show-book/artist-show-book.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from 'express';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    MusicLibraryComponent,
    PlaylistComponent,
    BookingsComponent,
    ProfileComponent,
    ArtistShowComponent,
    ArtistShowBookComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    SidebarModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class UserModule {}
