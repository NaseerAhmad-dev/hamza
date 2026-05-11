export const environment = {
  production: false,
  firebase: {
    apiKey:            'YOUR_API_KEY',
    authDomain:        'YOUR_PROJECT.firebaseapp.com',
    projectId:         'YOUR_PROJECT_ID',
    storageBucket:     'YOUR_PROJECT.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId:             'YOUR_APP_ID',
  },
  // ── YouTube Data API v3 ──────────────────────────────────────────────
  // 1. Go to console.cloud.google.com → APIs & Services → Enable "YouTube Data API v3"
  // 2. Create an API key and restrict it to YouTube Data API v3
  // 3. Paste the channel ID from your YouTube channel URL:
  //    youtube.com/@YourChannel → Settings → Advanced → Channel ID (starts with UC...)
  youtubeApiKey:   'YOUR_YOUTUBE_API_KEY',
  youtubeChannelId: 'YOUR_CHANNEL_ID',   // e.g. UCxxxxxxxxxxxxxxxxxx

  // ── Google Places API ────────────────────────────────────────────────
  // 1. Enable "Places API (New)" in the same Google Cloud project
  // 2. Use the same or a separate API key (restrict to Places API)
  // 3. Find your Place ID:
  //    → Go to maps.google.com, search your business name
  //    → Click your listing → Share → Copy link
  //    → The URL contains  ...place/... or use https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
  googleApiKey:  'YOUR_GOOGLE_API_KEY',
  googlePlaceId: 'YOUR_PLACE_ID',        // e.g. ChIJxxxxxxxxxxxxxxxx
};
