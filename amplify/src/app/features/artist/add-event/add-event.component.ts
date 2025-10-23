import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { ApiService } from '../../../core/services/api.service';
import { Time } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
export interface Events {
  artistId: string;
  title: string;
  date: string;
  time: string;
  location: string;
}
@Component({
  selector: 'app-add-event',
  standalone: false,
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss',
})
export class AddEventComponent {
  constructor(private token: TokenStorageService, private apiService: ApiService) {}
  public EventForm = new FormGroup({
    EventTitle: new FormControl('', Validators.required),
    EventLocation: new FormControl('', Validators.required),
    EventDate: new FormControl('', Validators.required),
    EventTime: new FormControl('', Validators.required),
  });
  public getEventInfo() {
    this.EventForm.markAllAsTouched();
    if (this.EventForm.invalid) {
      return;
    } else {
      const { EventTitle, EventLocation, EventDate, EventTime } = this.EventForm.controls;
      const id = this.token.getUserInfo().id;

      const EventDetail: Events = {
        artistId: id,
        title: EventTitle.value!,
        location: EventLocation.value!,
        date: EventDate.value!,
        time: EventTime.value!,
      };

      this.apiService.addEvents(EventDetail).subscribe({
        next: (res) => {},
        error: (err) => {},
      });
    }
  }

  @Output() close = new EventEmitter<void>();

  closeComponent() {
    console.log('close');
    this.close.emit();
  }
}
