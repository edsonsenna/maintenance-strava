import { Athlete } from "./athlete";

export interface UserDetail {
    "ms-user-mail"?: String,
    "ms-user-fullname"?: String,
    "ms-user-birthday"?: Number,
    "ms-ath-info"?: String,
    "ms-exp-date"?: Number,
    "ms-ref-token"?: String,
    "ms-token"?: String,
    email: String;
    fullname: String;
    birthdate: Number;
    athleteInfo: Athlete;
    expirationDate: Number;
    refreshToken: String;
    token: String;
}