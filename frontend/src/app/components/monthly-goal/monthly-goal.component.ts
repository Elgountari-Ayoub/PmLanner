import { Component, Input} from '@angular/core';
import { IMonthlyGoal, IStatus } from 'src/app/Models/interfaces';

@Component({
  selector: 'app-monthly-goal',
  templateUrl: './monthly-goal.component.html',
  styleUrls: ['./monthly-goal.component.css']
})
export class MonthlyGoalComponent {
  @Input() monthlyGoal?: IMonthlyGoal;
  @Input() index?: number;

  getPriorityStyleClass(priority: string): string {
    switch (priority) {
      case 'HIGH':
        return 'text-white bg-red-700';
      case 'MEDIUM':
        return 'text-white bg-green-700';
      case 'LOW':
        return 'bg-gray-600 text-white';
      default:
        return '';
    }
  }

  getStatusStyleClass(status: IStatus): string {
    switch (status) {
      case 'TODO':
        return 'bg-gray-300';
      case 'IN_PROGRESS':
        return 'bg-blue-500';
      case 'DONE':
        return 'bg-green-500 text-white';
      default:
        return '';
    }
  }
}
