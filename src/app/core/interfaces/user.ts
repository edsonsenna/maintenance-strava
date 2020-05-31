import { Athlete } from './athlete';

export interface User {
    athlete: Athlete;
    created: Date;
    update: Date;
}