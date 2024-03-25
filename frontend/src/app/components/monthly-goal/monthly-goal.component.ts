import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMonthlyGoal, IPriority, IStatus } from 'src/app/Models/interfaces';
import { MonthlyGoalService } from 'src/app/services/monthly-goal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-monthly-goal',
  templateUrl: './monthly-goal.component.html',
  styleUrls: ['./monthly-goal.component.css'],
})
export class MonthlyGoalComponent {
  @Input() monthlyGoal?: IMonthlyGoal;
  @Input() index?: number;

  constructor(private monthlyGoalService: MonthlyGoalService) {}
  ngOnInit(): void {}

  // GOAL EDITIONEDIT GOAL EVENT EMITTER
  @Output() showEditGoalModal = new EventEmitter<void>();
  showEditModal() {
    this.showEditGoalModal.emit();
  }

  // ################################ DELETE ANNUAL GOAL ################################

  @Output() goalDeleted = new EventEmitter<void>();
  deleteGoal(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action can't be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.monthlyGoalService.delete(id).subscribe({
          next: (data) => {
            this.goalDeleted.emit();
            Swal.fire(
              'Deleted!',
              'Your annual goal has been deleted.',
              'success'
            );
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  // Helper Methods

  getPriorityStyleClass(priority: IPriority): string {
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
