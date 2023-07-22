export class Appointment{
    type: string = '';
    notes:string = '';
    date:string = '';
    slot:string = '';
}

export type AppointmentWithId = Appointment & { id: string };