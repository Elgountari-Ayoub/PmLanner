import { DatePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAnnualGoal, IPriority, IStatus } from 'src/app/Models/interfaces';
import { AnnualGoalsService } from 'src/app/services/annual-goals.service';
import { MonthlyGoalService } from 'src/app/services/monthly-goal.service';
import Swal from 'sweetalert2';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-annual-goal',
  templateUrl: './annual-goal.component.html',
  styleUrls: ['./annual-goal.component.css']
})
export class AnnualGoalComponent implements OnInit {
  @Input() annualGoal?: IAnnualGoal;
  @Input() index?: number;

  constructor(private annualGoalService: AnnualGoalsService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
  }
  ngOnInit(): void {
    this.initGoalEditForm();
  }



  goalEditForm!: FormGroup;
  priorities = Object.values(IPriority);
  statuses = Object.values(IStatus);

  initGoalEditForm() {
    // Initialize the form
    this.goalEditForm = this.formBuilder.group({
      title: [this.annualGoal ? this.annualGoal.title : '', Validators.required],
      description: [this.annualGoal ? this.annualGoal.description : '', Validators.required],
      deadline: [this.annualGoal ? this.annualGoal.deadline : '', Validators.required],
      priority: [this.annualGoal ? this.annualGoal.priority : '', Validators.required],
      status: [this.annualGoal ? this.annualGoal.status : '', Validators.required],
      progress: [this.annualGoal ? this.annualGoal.progress : '', Validators.required]
    });
  }

  // GOAL EDITION
  @Output() goalEdited = new EventEmitter<void>();
  editGoal() {
    if (this.goalEditForm.valid) {
      const formData = this.goalEditForm.value;
      const formattedDate = this.datePipe.transform(this.goalEditForm.get('date')?.value, "yyyy-MM-dd");
      const goalFormWithFormattedDate = { ...this.goalEditForm.value, date: formattedDate }
      this.annualGoalService.edit(this.annualGoal?.id, goalFormWithFormattedDate).subscribe({
        next: goal => {
          this.goalEdited.emit();
        },
        error: (error) => {
          console.log(error);
        },
      });
      console.log('Form submitted:', formData);
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }

  @Output() goalDeleted = new EventEmitter<void>();
  deleteGoal(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action can't be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.annualGoalService.delete(id).subscribe({
          next: data => {
            this.goalDeleted.emit();
            Swal.fire(
              'Deleted!',
              'Your annual goal has been deleted.',
              'success'
            )
          },
          error: err => {
            console.log(err);
          }
        })
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
