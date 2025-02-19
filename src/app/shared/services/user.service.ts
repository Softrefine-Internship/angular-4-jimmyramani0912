import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://dummyjson.com/users';
  userEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  fetchUsers(): void {
    this.http.get(this.apiUrl).subscribe((data) => {
      this.userEmitter.emit(data);
    });
  }
}
