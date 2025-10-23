import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { SidebarModule } from '../../shared/sidebar/sidebar.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AddSongComponent } from './add-song/add-song.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEventComponent } from './add-event/add-event.component';
import { AllInfoComponent } from './all-info/all-info.component';

@NgModule({
  declarations: [
    ArtistComponent,
    DashboardComponent,
    AddSongComponent,
    AddEventComponent,
    AllInfoComponent,
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    SharedModule,
    SidebarModule,
    MatButtonModule,
    MatDialogModule,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [MatButtonModule, MatDialogModule],
})
export class ArtistModule {}
