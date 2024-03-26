import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  IAnnualGoal,
  IMonthlyGoal,
  IPriority,
  IStatus,
} from 'src/app/Models/interfaces';
import { AnnualGoalsService } from 'src/app/services/annual-goals.service';
import { MonthlyGoalService } from 'src/app/services/monthly-goal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annual-goal-details',
  templateUrl: './annual-goal-details.component.html',
  styleUrls: ['./annual-goal-details.component.css'],
})
export class AnnualGoalDetailsComponent {
  @Input() annualGoalId!: number;

  annualGoals: IAnnualGoal[] = [];
  annualGoal?: IAnnualGoal;

  priorities = Object.values(IPriority);
  statuses = Object.values(IStatus);

  constructor(
    private annualGoalService: AnnualGoalsService,
    private monthlyGoalService: MonthlyGoalService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.annualGoalId = params['annualGoalId'];
    });

    this.getAnnualGoal(this.annualGoalId);
    this.getAnnualGoals();

    this.getMonthlyGoals();

    this.initMonthlyGoalCreateForm();
    this.initMonthlyGoalEditForm();
  }

  // ANNUAL GOALS
  getAnnualGoals() {
    this.annualGoalService.getGoals().subscribe({
      next: (data) => {
        this.annualGoals = data as IAnnualGoal[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAnnualGoal(annualGoalId: number) {
    this.annualGoalService.getGoal(annualGoalId).subscribe({
      next: (data) => {
        this.annualGoal = data as IAnnualGoal;
        this.initMonthlyGoalCreateForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // ###############################################################################
  // -------------------------------------------------------------------------------
  // ################################ MONTHLY GOALS ################################
  // -------------------------------------------------------------------------------
  // ###############################################################################
  monthlyGoal!: IMonthlyGoal;

  monthlyGoals: IMonthlyGoal[] = [];
  // ################################ GET MONTHYL GOAL ################################
  getMonthlyGoals() {
    if (this.annualGoalId)
      this.monthlyGoalService
        .getMonthlyGoalsByAnnualGoalId(this.annualGoalId)
        .subscribe({
          next: (data) => {
            this.monthlyGoals = data as IMonthlyGoal[];
          },
          error: (err) => {
            console.log(err);
          },
        });
  }

  // ################################ CREATE MONTHYL GOAL ################################

  monthlyGoalCreateForm!: FormGroup;
  initMonthlyGoalCreateForm() {
    this.monthlyGoalCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['TODO', Validators.required],
      progress: [0, Validators.required],
      annualGoal: [this.annualGoal ? this.annualGoal : ''],
    });
  }
  showMonthlyGoalCreateModal() {
    let editModal = document.getElementById('monthly-goal-create-modal');

    if (editModal != null) {
      editModal.classList.remove('hidden');
      editModal.classList.add('flex');
      document.body.insertAdjacentHTML(
        'beforeend',
        '<div modal-backdrop="" id="tempElement" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>'
      );
    }
  }
  hideMonthlyGoaCreatelModal() {
    let editModal = document.getElementById('monthly-goal-create-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');
      let tempElement = document.getElementById('tempElement');
      tempElement?.remove();
    }
  }

  createMonthlyGoal() {
    console.log(this.annualGoal);

    if (this.monthlyGoalCreateForm.valid) {
      console.log(this.monthlyGoalCreateForm.value);
      // this.monthlyGoalCreateForm.controls['annualGoal'] = this.annualGoal;
      const formData = this.monthlyGoalCreateForm.value;
      this.monthlyGoalService.create(formData).subscribe({
        next: (goal) => {
          this.getMonthlyGoals();
          this.initMonthlyGoalCreateForm();
        },
        error: (error) => {
          console.log(error);
        },
      });
      console.log('Form submitted:', formData);
    } else {
      console.log(this.monthlyGoalCreateForm.value);

      console.log('Form is invalid');
    }
  }

  // ################################ EDIT MONTHYL GOAL ################################

  monthlyGoalEditForm!: FormGroup;

  initMonthlyGoalEditForm() {
    // Initialize the form
    this.monthlyGoalEditForm = this.formBuilder.group({
      title: [
        this.monthlyGoal ? this.monthlyGoal.title : '',
        Validators.required,
      ],
      description: [
        this.monthlyGoal ? this.monthlyGoal.description : '',
        Validators.required,
      ],
      deadline: [
        this.monthlyGoal ? this.monthlyGoal.deadline : '',
        Validators.required,
      ],
      priority: [
        this.monthlyGoal ? this.monthlyGoal.priority : '',
        Validators.required,
      ],
      status: [
        this.monthlyGoal ? this.monthlyGoal.status : '',
        Validators.required,
      ],
      progress: [
        this.monthlyGoal ? this.monthlyGoal.progress : '',
        Validators.required,
      ],
      annualGoal: [
        this.monthlyGoal ? this.annualGoal : '',
        Validators.required,
      ],
    });
  }

  showMonthlyGoalEditModal(monthylGoal: IMonthlyGoal) {
    this.monthlyGoal = monthylGoal;
    this.initMonthlyGoalEditForm();
    console.log(this.monthlyGoalEditForm.valid);
    console.log(this.monthlyGoalEditForm.value);

    let editModal = document.getElementById('monthly-goal-edit-modal');
    if (editModal != null) {
      editModal.classList.remove('hidden');
      editModal.classList.add('flex');

      document.body.insertAdjacentHTML(
        'beforeend',
        '<div modal-backdrop="" id="tempElement" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>'
      );
    }
  }

  hideMonthlyGoalEditModal() {
    this.monthlyGoal = {} as IMonthlyGoal;
    // this.initMonthlyGoalEditForm();
    let editModal = document.getElementById('monthly-goal-edit-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');
      let tempElement = document.getElementById('tempElement');
      tempElement?.remove();
    }
  }

  editMonthlyGoal() {
    console.log(this.monthlyGoalEditForm.value);
    if (this.monthlyGoalEditForm.valid) {
      const formData = this.monthlyGoalEditForm.value;

      this.monthlyGoalService.edit(this.monthlyGoal?.id, formData).subscribe({
        next: (goal) => {
          this.getMonthlyGoals();
          this.hideMonthlyGoalEditModal();
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

  // ################################ DELETE MONTHLY GOAL ################################

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

  getGoalCardStyleClass(index: number): string {
    switch (index) {
      // Row 1
      case 0:
        return 'bg-golden-goal hover:bg-golden-goal-light ';
      // Row 2
      case 1:
        return 'bg-silver-goal hover:bg-silver-goal-light';
      // Row 3 and move on
      default:
        return 'bg-bronze-goal hover:bg-bronze-goal-light';
    }
  }

  getGridColClass(row: number): string {
    switch (row) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md-grid-cols-2 lg:grid-cols-2 md:mx-4 lg:mx-8 xl:mx-12';
      default:
        return 'grid-cols-1 sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:mx-2 lg:mx-4 xl:mx-8';
    }
  }
}
