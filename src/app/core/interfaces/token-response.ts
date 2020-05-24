import { Athlete } from './athlete';

export interface TokenResponse {
    "access_token": string;
    "athlete": Athlete;
    "expires_at": number;
    "expires_in": number;
    "refresh_token": string;
}