export interface Maintenance {
    id: string;
    equipmentId: string;
    equipmentDistance: number;
    equipmentName: string;
    goal: number;
    type: string;
    value: number;
    name: string;
    isValid: boolean;
}