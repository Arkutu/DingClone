import { RealtimeClient } from '@supabase/realtime-js';

const REALTIME_URL = 'wss://uihnplwdnyltryjfbrop.supabase.co/realtime/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpaG5wbHdkbnlsdHJ5amZicm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4MjQ4MjAsImV4cCI6MjAzNDQwMDgyMH0.e3xgL7e8J1U3QueltvwwkT4Pcc-y8zAvcH-v7p1SJFQ';

const client = new RealtimeClient(REALTIME_URL, {
  params: {
    apikey: API_KEY
  }
});

export default client;
