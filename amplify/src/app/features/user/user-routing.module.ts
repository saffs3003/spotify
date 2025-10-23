import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './bookings/bookings.component';
import { MusicLibraryComponent } from './music-library/music-library.component';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: DashboardComponent, data: { roles: ['User'] } },
      { path: 'dashboard', component: DashboardComponent, data: { roles: ['User'] } },
      { path: 'profile', component: ProfileComponent, data: { roles: ['User'] } },
      { path: 'mybookings', component: BookingsComponent, data: { roles: ['User'] } },
      { path: 'songs', component: MusicLibraryComponent, data: { roles: ['User'] } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
