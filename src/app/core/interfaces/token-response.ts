import { AthleteStrava } from './athlete-strava';

export interface TokenResponse {
    "access_token": string;
    "athlete": AthleteStrava;
    "expires_at": number;
    "expires_in": number;
    "refresh_token": string;
}