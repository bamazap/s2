import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { headers, objectToParams } from '../utils';

interface SongOverview {
  id: number;
  title: string;
  artist: string;
  lyrics: string;
  arranged: boolean;
  suggestor: string | null;
  myRating: number | null;
  // below are dates but I have no need to convert them
  lastEdited: number;
  lastViewed: number;
}

export interface Song extends SongOverview {
  comments: [];
  links: [];
}

export interface GetSongOptions {
  suggested?: boolean;
}

export interface UpdateSongOptions {
  title?: string;
  artist?: string;
  lyrics?: string;
  arranged?: boolean;
  suggested?: boolean;
}

function jsonToSong<T>(json: T & { edited: number }): T & { edited: Date } {
  return Object.assign({}, json, { edited: new Date(json.edited * 1000) });
}

@Injectable()
export class SongService {
  constructor(private http: HttpClient) { }

  getSong(songID: number): Observable<Song> {
    const url = `api/songs/${songID}`;
    return this.http.get<Song>(url, { headers })
      .pipe(map(jsonToSong));
  }

  getSongs(filters: GetSongOptions): Observable<SongOverview[]> {
    const url = 'api/songs';
    const params = objectToParams(filters);
    return this.http.get<SongOverview[]>(url, { headers, params })
      .pipe(map(jsonArr => jsonArr.map(jsonToSong)));
  }

  addSong(title: string, artist: String): Observable<SongOverview> {
    const url = 'api/songs';
    const body = {
      title,
      artist,
    };
    return this.http.post<SongOverview>(url, body, { headers })
      .pipe(map(jsonToSong));
  }

  updateSong(songID: number, body: UpdateSongOptions): Observable<boolean> {
    const url = `api/songs/${songID}`;
    return this.http.patch<boolean>(url, body, { headers });
  }

  rateSong(songID: number, rating: number): Observable<boolean> {
    const url = `api/songs/${songID}/ratings/mine`;
    const body = { rating };
    return this.http.put<boolean>(url, body, { headers });
  }

  deleteSong(songID: number): Observable<boolean> {
    const url = `api/songs/${songID}`;
    return this.http.delete<boolean>(url, { headers });
  }

}
