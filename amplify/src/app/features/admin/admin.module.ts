import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [AdminRoutingModule, CommonModule, MatIcon, RouterLink, SharedModule],
  exports: [AdminComponent, DashboardComponent],
})
export class AdminModule {}
