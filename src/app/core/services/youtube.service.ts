import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

interface PlaylistResponse {
  items: Array<{
    snippet: {
      resourceId: { videoId: string };
      title: string;
      thumbnails: { high?: { url: string }; medium?: { url: string } };
      publishedAt: string;
    };
  }>;
}

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  private http = inject(HttpClient);
  private base = 'https://www.googleapis.com/youtube/v3';

  fetchChannelVideos(maxResults = 6): Observable<YouTubeVideo[]> {
    const { youtubeChannelId: channelId, youtubeApiKey: key } = environment;
    if (!channelId || !key || channelId === 'YOUR_CHANNEL_ID') return of([]);

    // Channel uploads playlist = replace leading "UC" with "UU"
    const playlistId = channelId.startsWith('UC')
      ? 'UU' + channelId.slice(2)
      : channelId;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('playlistId', playlistId)
      .set('maxResults', String(maxResults))
      .set('key', key);

    return this.http.get<PlaylistResponse>(`${this.base}/playlistItems`, { params }).pipe(
      map(res => res.items.map(item => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          `https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/hqdefault.jpg`,
        publishedAt: item.snippet.publishedAt,
      }))),
      catchError(() => of([]))
    );
  }
}
