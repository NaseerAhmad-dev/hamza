import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface GoogleReview {
  authorName: string;
  authorPhoto: string;
  rating: number;
  text: string;
  relativeTime: string;
  initial: string;
}

interface PlacesApiResponse {
  reviews?: Array<{
    relativePublishTimeDescription: string;
    rating: number;
    text?: { text: string };
    authorAttribution: { displayName: string; photoUri?: string };
  }>;
}

@Injectable({ providedIn: 'root' })
export class GoogleReviewsService {
  private http = inject(HttpClient);

  fetchReviews(): Observable<GoogleReview[]> {
    const { googlePlaceId: placeId, googleApiKey: key } = environment;
    if (!placeId || !key || placeId === 'YOUR_PLACE_ID') return of([]);

    const headers = new HttpHeaders({
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'reviews',
    });

    return this.http
      .get<PlacesApiResponse>(
        `https://places.googleapis.com/v1/places/${placeId}`,
        { headers }
      )
      .pipe(
        map(res =>
          (res.reviews || []).map(r => ({
            authorName: r.authorAttribution.displayName,
            authorPhoto: r.authorAttribution.photoUri || '',
            rating: r.rating,
            text: r.text?.text || '',
            relativeTime: r.relativePublishTimeDescription,
            initial: r.authorAttribution.displayName.charAt(0).toUpperCase(),
          }))
        ),
        catchError(() => of([]))
      );
  }
}
