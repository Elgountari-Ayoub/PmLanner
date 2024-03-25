import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IAnnualGoal,
  IMonthlyGoal,
  IPriority,
  IStatus,
} from 'src/app/Models/interfaces';
import { AnnualGoalsService } from 'src/app/services/annual-goals.service';
import { MonthlyGoalService } from 'src/app/services/monthly-goal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  priorities = Object.values(IPriority);
  statuses = Object.values(IStatus);
  constructor(
    private annualGoalService: AnnualGoalsService,
    private monthlyGoalService: MonthlyGoalService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getAnnualGoals();
    this.initAnnualGoalCreateForm();
    this.initAnnualGoalEditForm();
    
    this.getMonthlyGoals();
    this.initMonthlyGoalCreateForm();
    this.initMonthlyGoalEditForm();
  }

  // ##############################################################################
  // ------------------------------------------------------------------------------
  // ################################ ANNUAL GOALS ################################
  // ------------------------------------------------------------------------------
  // ##############################################################################
  annualGoal!: IAnnualGoal;
  annualGoals: IAnnualGoal[] = [];
  annualGoals_Nested: IAnnualGoal[][] = [];

  goalCreateForm!: FormGroup;

  getAnnualGoals() {
    this.annualGoalService.getGoals().subscribe({
      next: (data) => {
        this.annualGoals = data as IAnnualGoal[];
        this.annualGoals_Nested = this.generatePyramidRows(this.annualGoals);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ################################ ANNUAL GOAL CREATE ################################
  initAnnualGoalCreateForm() {
    this.goalCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['TODO', Validators.required],
      progress: [0, Validators.required],
    });
  }
  showCreateGoalModal() {
    let editModal = document.getElementById('create-modal');
    if (editModal != null) {
      editModal.classList.remove('hidden');
      editModal.classList.add('flex');
    }
  }
  hideCreateGoalModal() {
    let editModal = document.getElementById('create-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');
    }
  }

  createGoal() {
    if (this.goalCreateForm.valid) {
      const formData = this.goalCreateForm.value;
      console.log(formData);

      this.annualGoalService.create(formData).subscribe({
        next: (goal) => {
          this.getAnnualGoals();
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

  // ################################ ANNUAL GOAL EDIT ################################

  annualGoalEditForm!: FormGroup;

  initAnnualGoalEditForm() {
    // Initialize the form
    this.annualGoalEditForm = this.formBuilder.group({
      title: [
        this.annualGoal ? this.annualGoal.title : '',
        Validators.required,
      ],
      description: [
        this.annualGoal ? this.annualGoal.description : '',
        Validators.required,
      ],
      deadline: [
        this.annualGoal ? this.annualGoal.deadline : '',
        Validators.required,
      ],
      priority: [
        this.annualGoal ? this.annualGoal.priority : '',
        Validators.required,
      ],
      status: [
        this.annualGoal ? this.annualGoal.status : '',
        Validators.required,
      ],
      progress: [
        this.annualGoal ? this.annualGoal.progress : '',
        Validators.required,
      ],
    });
  }

  showAnnualGoalEditModal(annualGoal: IAnnualGoal) {
    this.annualGoal = annualGoal;
    this.initAnnualGoalEditForm();

    let editModal = document.getElementById('edit-modal');
    if (editModal != null) {
      editModal.classList.remove('hidden');
      editModal.classList.add('flex');
    }
  }
  hideAnnualGoalEditModal() {
    this.annualGoal = {} as IAnnualGoal;
    this.initAnnualGoalEditForm();

    let editModal = document.getElementById('edit-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');
    }
  }

  editAnnualGoal() {
    if (this.annualGoalEditForm.valid) {
      const formData = this.annualGoalEditForm.value;

      this.annualGoalService.edit(this.annualGoal?.id, formData).subscribe({
        next: (goal) => {
          this.getAnnualGoals();
          this.hideAnnualGoalEditModal();
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
  // ###############################################################################
  // -------------------------------------------------------------------------------
  // ################################ MONTHLY GOALS ################################
  // -------------------------------------------------------------------------------
  // ###############################################################################
  monthlyGoal!: IMonthlyGoal;

  monthlyGolas: IMonthlyGoal[] = [];
  monthlyGoals_Nested: IMonthlyGoal[][] = [];
  getMonthlyGoals() {
    this.monthlyGoalService.getMonthlyGoals().subscribe({
      next: (data) => {
        this.monthlyGolas = data as IMonthlyGoal[];
        this.monthlyGoals_Nested = this.generatePyramidRows(this.monthlyGolas);
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
      annualGoal: [null, Validators.required],
    });
  }
  showMonthlyGoalCreateModal() {
    let editModal = document.getElementById('monthly-goal-create-modal');
    if (editModal != null) {
      editModal.classList.remove('hidden');
      editModal.classList.add('flex');
    }
  }
  hideMonthlyGoaCreatelModal() {
    let editModal = document.getElementById('monthly-goal-create-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');
    }
  }
  createMonthlyGoal() {
    if (this.monthlyGoalCreateForm.valid) {
      const formData = this.monthlyGoalCreateForm.value;
      this.monthlyGoalService.create(formData).subscribe({
        next: (goal) => {
          this.getMonthlyGoals();
          this.monthlyGoalCreateForm.reset(); // Optionally reset the form after successful creation
        },
        error: (error) => {
          console.log(error);
        },
      });
      console.log('Form submitted:', formData);
    } else {
      console.log('Form is invalid');
    }
  }

  // ################################ EDIT MONTHYL GOAL ################################

  monthylGoalEditForm!: FormGroup;

  initMonthlyGoalEditForm() {
    // Initialize the form
    this.annualGoalEditForm = this.formBuilder.group({
      title: [
        this.annualGoal ? this.annualGoal.title : '',
        Validators.required,
      ],
      description: [
        this.annualGoal ? this.annualGoal.description : '',
        Validators.required,
      ],
      deadline: [
        this.annualGoal ? this.annualGoal.deadline : '',
        Validators.required,
      ],
      priority: [
        this.annualGoal ? this.annualGoal.priority : '',
        Validators.required,
      ],
      status: [
        this.annualGoal ? this.annualGoal.status : '',
        Validators.required,
      ],
      progress: [
        this.annualGoal ? this.annualGoal.progress : '',
        Validators.required,
      ],
    });
  }
  showMonthlyGoalEditModal(monthylGoal: IMonthlyGoal) {
    this.monthlyGoal = monthylGoal;
    this.initAnnualGoalEditForm();
    let editModal = document.getElementById('monthly-goal-edit-modal');
    if (editModal != null) {
      editModal.classList.remove('hidden');
      editModal.classList.add('flex');
    }
  }

  hideMonthlyGoalEditModal() {
    this.monthlyGoal = {} as IMonthlyGoal;
    this.initAnnualGoalEditForm();
    let editModal = document.getElementById('monthly-goal-edit-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');
    }
  }

  // ----------------------------------------------------------------
  // HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS
  // HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS
  // ----------------------------------------------------------------
  // HELPER METHODS
  rows: number[][] = [];

  generatePyramidRows(data: IAnnualGoal[]): any[][] {
    const rows: any[][] = [];
    let rowIndex = 0;
    let counter = 0;

    for (let i = 0; i < data.length; i++) {
      if (!rows[rowIndex]) {
        rows[rowIndex] = [];
      }
      rows[rowIndex].push(data[i]);
      counter++;

      // Condition to increment row index
      if (counter >= rowIndex + 1 && rowIndex <= 1) {
        rowIndex++;
        counter = 0;
      }
    }
    return rows;
  }

  getGoalCardStyleClass(index: number): string {
    switch (index) {
      // Row 1
      case 0:
        return 'bg-golden-goal hover:bg-golden-goal-light md:mx-24 lg:mx-28 xl:mx-40';
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
