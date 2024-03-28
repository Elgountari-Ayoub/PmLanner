import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPriority, IStatus, IDailyGoal } from 'src/app/Models/interfaces';
import { DailyGoalService } from 'src/app/services/daily-goal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-daily-goal',
  templateUrl: './daily-goal.component.html',
  styleUrls: ['./daily-goal.component.css'],
})
export class DailyGoalComponent implements OnInit {
  @Input() dailyGoal!: IDailyGoal;
  @Input() index?: number;

  constructor(private dailyGoalService: DailyGoalService) {}
  ngOnInit(): void {}

  // GOAL EDITION EDIT GOAL EVENT EMITTER
  @Output() showEditGoalModal = new EventEmitter<void>();
  showEditModal() {
    this.showEditGoalModal.emit();
  }
  // ################################ DELETE DAILY GOAL ################################

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
        this.dailyGoalService.delete(id).subscribe({
          next: (data) => {
            this.goalDeleted.emit();
            Swal.fire(
              'Deleted!',
              'Your daily goal has been deleted.',
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
        return 'text-white bg-red-700';
      case 'IN_PROGRESS':
        return 'text-white bg-green-700';
      case 'DONE':
        return 'text-white bg-gray-600';
      default:
        return '';
    }
  }
}
