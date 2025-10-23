import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HeroComponent } from './hero/hero.component';
import { HeroNavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome.component';
import { FeatureComponent } from './feature/feature.component';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [HeroComponent, HeroNavbarComponent, WelcomeComponent, FeatureComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, MatIcon],
})
export class WelcomeModule {}
