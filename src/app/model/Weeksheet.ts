import {Employee} from './employee';
import {Project} from './Project';

export class Weeksheet {
  id: number;
  approved: boolean;
  submitted: boolean;
  totalHour: number;
  employee: Employee;
  project: Project;
}
