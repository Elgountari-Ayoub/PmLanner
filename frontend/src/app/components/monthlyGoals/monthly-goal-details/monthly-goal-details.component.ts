import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import {
  IMonthlyGoal,
  IPriority,
  IStatus,
  IWeeklyGoal,
} from 'src/app/Models/interfaces';
import { MonthlyGoalService } from 'src/app/services/monthly-goal.service';
import { WeeklyGoalService } from 'src/app/services/weekly-goal.service';

@Component({
  selector: 'app-monthly-goal-details',
  templateUrl: './monthly-goal-details.component.html',
  styleUrls: ['./monthly-goal-details.component.css'],
})
export class MonthlyGoalDetailsComponent implements OnInit {
  @Input() monthlyGoalId!: number;
  monthlyGoal!: IMonthlyGoal;
  monthlyGoals: IMonthlyGoal[] = [];

  priorities = Object.values(IPriority);
  statuses = Object.values(IStatus);

  constructor(
    private monthlyGoalService: MonthlyGoalService,
    private weeklyGoalService: WeeklyGoalService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.monthlyGoalId = params['monthlyGoalId'];
    });

    this.getMonthlyGoal(this.monthlyGoalId);
    this.getMonthlyGoals();

    this.initWeeklyGoalCreateForm();
    this.initWeeklyGoalEditForm();
  }

  getMonthlyGoals() {
    this.monthlyGoalService.getMonthlyGoals().subscribe({
      next: (data) => {
        this.monthlyGoals = data as IMonthlyGoal[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getMonthlyGoal(id: number) {
    this.monthlyGoalService.getGoal(id).subscribe({
      next: (data) => {
        this.monthlyGoal = data as IMonthlyGoal;
        console.log(this.monthlyGoal);
        this.initWeeklyGoalCreateForm();
        this.initWeeklyGoalEditForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ###############################################################################
  // -------------------------------------------------------------------------------
  // ################################ WEEKLY GOALS ################################
  // -------------------------------------------------------------------------------
  // ###############################################################################

  weeklyGoals: IWeeklyGoal[] = [];
  weeklyGoal!: IWeeklyGoal;

  // ################################ CREATE WEEKLY GOAL ################################

  weeklyGoalCreateForm!: FormGroup;

  initWeeklyGoalCreateForm() {
    this.weeklyGoalCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      deadline: [
        '',
        Validators.compose([Validators.required, this.futureDateValidator]),
      ],
      priority: ['', Validators.required],
      status: ['TODO', Validators.required],
      progress: [0, Validators.required],
      // monthlyGoal: [this.monthlyGoal ? this.monthlyGoal : ''],
      monthlyGoal: { id: this.monthlyGoal ? this.monthlyGoal.id : '' },
    });
  }
  futureDateValidator(control: FormControl): ValidationErrors | null {
    const deadline = moment(control.value).format('YYYY-MM-DD');
    if (!deadline || moment(deadline).isSameOrBefore(moment())) {
      return { futureDate: true };
    }
    return null;
  }
  showWeeklyGoalCreateModal() {
    let editModal = document.getElementById('weekly-goal-create-modal');

    if (editModal != null) {
      editModal.classList.remove('hidden');
      editModal.classList.add('flex');
      document.body.insertAdjacentHTML(
        'beforeend',
        '<div modal-backdrop="" id="tempElement" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>'
      );
    }
  }

  hideWeeklyGoalCreatelModal() {
    let editModal = document.getElementById('weekly-goal-create-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');
      let tempElement = document.getElementById('tempElement');
      tempElement?.remove();
    }
  }

  createWeeklyGoal() {
    console.log(this.weeklyGoalCreateForm.valid);

    if (this.weeklyGoalCreateForm.valid) {
      const formData = this.weeklyGoalCreateForm.value;
      this.weeklyGoalService.create(formData).subscribe({
        next: (goal) => {
          this.getMonthlyGoal(this.monthlyGoalId);
          this.initWeeklyGoalCreateForm();
          this.hideWeeklyGoalCreatelModal();
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

  // ################################ EDIT WEEKLY GOAL ################################

  weeklyGoalEditForm!: FormGroup;

  initWeeklyGoalEditForm() {
    // Initialize the form
    this.weeklyGoalEditForm = this.formBuilder.group({
      title: [
        this.weeklyGoal ? this.weeklyGoal.title : '',
        Validators.required,
      ],
      description: [
        this.weeklyGoal ? this.weeklyGoal.description : '',
        Validators.required,
      ],
      deadline: [
        this.weeklyGoal ? this.weeklyGoal.deadline : '',
        Validators.required,
      ],
      priority: [
        this.weeklyGoal ? this.weeklyGoal.priority : '',
        Validators.required,
      ],
      status: [
        this.weeklyGoal ? this.weeklyGoal.status : '',
        Validators.required,
      ],
      progress: [
        this.weeklyGoal ? this.weeklyGoal.progress : '',
        Validators.required,
      ],
      monthlyGoal: [
        this.monthlyGoal ? this.monthlyGoal : 'hi',
        Validators.required,
      ],
    });
  }

  showWeeklyGoalEditModal(weeklyGoal: IWeeklyGoal) {
    this.weeklyGoal = weeklyGoal;
    this.initWeeklyGoalEditForm();
    let editModal = document.getElementById('weekly-goal-edit-modal');
    if (editModal != null) {
      editModal.classList.remove('hidden');
      editModal.classList.add('flex');

      document.body.insertAdjacentHTML(
        'beforeend',
        '<div modal-backdrop="" id="tempElement" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>'
      );
    }
  }
  hideWeeklyGoalEditlModal() {
    let editModal = document.getElementById('weekly-goal-edit-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');
      let tempElement = document.getElementById('tempElement');
      tempElement?.remove();
    }
  }

  editWeeklyGoal() {
    console.log(this.weeklyGoalEditForm.value);
    if (this.weeklyGoalEditForm.valid) {
      const formData = this.weeklyGoalEditForm.value;

      this.weeklyGoalService.edit(this.weeklyGoal?.id, formData).subscribe({
        next: (goal) => {
          this.getMonthlyGoal(this.monthlyGoalId);
          this.initWeeklyGoalEditForm();
          this.hideWeeklyGoalEditlModal();
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

  // ----------------------------------------------------------------
  // HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS
  // HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS
  // ----------------------------------------------------------------
  // HELPER METHODS

  getGoalCardStyleClass(index: number): string {
    switch (index) {
      // Row 1
      case 0:
        return 'bg-golden-goal hover:bg-golden-goal-light';
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
