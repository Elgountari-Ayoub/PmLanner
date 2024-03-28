import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPriority, IStatus, IWeeklyGoal } from 'src/app/Models/interfaces';
import { WeeklyGoalService } from 'src/app/services/weekly-goal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weekly-goal',
  templateUrl: './weekly-goal.component.html',
  styleUrls: ['./weekly-goal.component.css'],
})
export class WeeklyGoalComponent implements OnInit {
  @Input() weeklyGoal!: IWeeklyGoal;
  @Input() index?: number;

  constructor(private weeklyGoalService: WeeklyGoalService) {}
  ngOnInit(): void {}

  // GOAL EDITION EDIT GOAL EVENT EMITTER
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
        this.weeklyGoalService.delete(id).subscribe({
          next: (data) => {
            this.goalDeleted.emit();
            Swal.fire(
              'Deleted!',
              'Your weekly goal has been deleted.',
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
