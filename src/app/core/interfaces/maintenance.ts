export interface Maintenance {
    id: string;
    equipmentId: string;
    equipmentDistance: number;
    maintenanceGoal: number;
    type: string;
    value: number;
    name: string;
    userId: string;
}