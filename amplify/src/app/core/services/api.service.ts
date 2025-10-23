import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export interface song {
  title: string;

  genre: string;
  coverArt: string;
  audioPath: string;
  artistId: string;
  isApproved: boolean;
}
interface SongsResponse {
  songs: song[];
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  //Add Songs
  public addSongs(song: any) {
    return this.http.post(`${this.apiUrl}/add-songs`, song);
  }

  public getParticularArtist(ArtistId: number) {
    return this.http.get<{ artist: any[] }>(`${this.apiUrl}/artist/${ArtistId}`);
  }

  public getParticularArtistEvent(ArtistId: number) {
    return this.http.get<any>(`${this.apiUrl}/artist/event/${ArtistId}`);
  }
  public getArtist() {
    return this.http.get<any[]>(`${this.apiUrl}/all-artists`);
  }

  public getUnapprovedSongs() {
    return this.http.get<any[]>(`${this.apiUrl}/unapproved-songs`);
  }

  public getApprovedSongs() {
    return this.http.get<any[]>(`${this.apiUrl}/approved-songs`);
  }
  public approveSong(songId: number) {
    return this.http.post(`${this.apiUrl}/approve-song/${songId}`, {});
  }
  //Add Events
  public addEvents(eventDetails: any) {
    return this.http.post(`${this.apiUrl}/add-events`, eventDetails);
  }
  //book even
  public bookEvent(data: any) {
    return this.http.post(`${this.apiUrl}/book-event`, data);
  }

  public getUnapprovedEvents() {
    return this.http.get<any[]>(`${this.apiUrl}/unapproved-events`);
  }

  public approveEvent(EventId: number) {
    return this.http.post(`${this.apiUrl}/approve-event/${EventId}`, {});
  }

  public getAllEvents() {
    return this.http.get(`${this.apiUrl}/all-events`);
  }
  public getAllSongs() {
    return this.http.get<any[]>(`${this.apiUrl}/all-songs`);
  }

  public getArtistSong(ArtistId: number) {
    return this.http.get<SongsResponse>(`${this.apiUrl}/artist-songs/${ArtistId}`);
  }
  public getAllBookingInfo() {
    return this.http.get<any[]>(`${this.apiUrl}/all-user-bookings`);
  }
}
