import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './artist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllInfoComponent } from './all-info/all-info.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistComponent,
    data: { roles: ['Artist'] },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { roles: ['Artist'] },
      },
      {
        path: 'all-info',
        component: AllInfoComponent,
        data: { roles: ['Artist'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
