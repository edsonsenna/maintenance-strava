import { Athlete } from './athlete';

export interface User {
    id: string;
    athlete: Athlete;
    created: Date;
    update: Date;
}