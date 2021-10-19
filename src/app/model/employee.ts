import {Project} from './Project';

export class Employee {
    id: number;
    firstName: string = '';
    lastName: string = '';
    emailId: string = '';
    active: boolean = false;
    role: string = 'ROLE_EMPLOYEE';
    userName: string = '';
    dob: Date;
    manager: Employee;
    projects: Project[];
}
