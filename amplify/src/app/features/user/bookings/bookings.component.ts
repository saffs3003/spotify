import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { OnInit } from '@angular/core';
import { map } from 'rxjs';
import { TokenStorageService } from '../../../core/services/token-storage.service';
export interface ticket {
  userId: number;
  eventId: number;
  title: string;
  date: string;
  time: string;
  location: string;
  artistId: number;
}
@Component({
  selector: 'app-bookings',
  standalone: false,
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
  constructor(private apiService: ApiService, private token: TokenStorageService) {}

  public Events: ticket[] = [];

  ngOnInit() {
    const userId = this.token.getUserInfo().id;
    this.apiService
      .getAllBookingInfo()
      .pipe(
        map((res: any[]) => {
          return res
            .filter((item) => item.userId === userId)
            .map((item) => ({
              eventId: item.eventId,
              userId: item.userId,
              title: item.title,
              date: item.date,
              time: item.time,
              location: item.location,
              artistId: item.artistId,
            }));
        })
      )
      .subscribe((Events) => {
        this.Events = Events;
      });
  }
}
