import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import {
  IAnnualGoal,
  IDailyGoal,
  IMonthlyGoal,
  IPriority,
  IStatus,
  IWeeklyGoal,
} from 'src/app/Models/interfaces';
import { AnnualGoalsService } from 'src/app/services/annual-goals.service';
import { DailyGoalService } from 'src/app/services/daily-goal.service';
import { MonthlyGoalService } from 'src/app/services/monthly-goal.service';
import { WeeklyGoalService } from 'src/app/services/weekly-goal.service';

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
    private weeklyGoalService: WeeklyGoalService,
    private dailyGoalService: DailyGoalService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    
    this.getAnnualGoals();
    this.initAnnualGoalCreateForm();
    this.initAnnualGoalEditForm();
    
    this.getMonthlyGoals();
    this.initMonthlyGoalCreateForm();
    this.initMonthlyGoalEditForm();
    
    this.getWeeklyGoals();
    this.initWeeklyGoalCreateForm();
    this.initWeeklyGoalEditForm();

    this.getTodayGoals();
    this.initDailyGoalCreateForm();
    this.initDailyGoalEditForm();
  }

  // ##############################################################################
  // ------------------------------------------------------------------------------
  // ################################ TODAY GOALS ################################
  // ------------------------------------------------------------------------------
  // ##############################################################################

  todayGoals: IDailyGoal[] = [];
  getTodayGoals() {
    this.dailyGoalService.getTodayGoals().subscribe({
      next: (data) => {
        this.todayGoals = data as IDailyGoal[];
        this.todayGoals_Nested = this.generatePyramidRows(this.todayGoals);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ##############################################################################
  // ------------------------------------------------------------------------------
  // ################################ ANNUAL GOALS ################################
  // ------------------------------------------------------------------------------
  // ##############################################################################

  dailyGoal!: IDailyGoal;
  dailyGoals: IDailyGoal[] = [];
  todayGoals_Nested: IDailyGoal[][] = [];

  // ################################ CREATE WEEKLY GOAL ################################

  dailyGoalCreateForm!: FormGroup;

  initDailyGoalCreateForm() {
    this.dailyGoalCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      deadline: [
        moment().format('YYYY-MM-DD'),
        Validators.compose([
          Validators.required,
          this.DailyGoalFutureDateValidator,
        ]),
      ],
      priority: ['', Validators.required],
      status: ['TODO', Validators.required],
      progress: [0, Validators.required],
      weeklyGoal: ['', Validators.required],
    });
  }
  DailyGoalFutureDateValidator(control: FormControl): ValidationErrors | null {
    const deadline = moment(control.value);
    const now = moment();

    if (!deadline || deadline.isBefore(now.startOf('day'))) {
      return { futureDate: true };
    }

    return null;
  }

  showDailyGoalCreateModal() {
    let editModal = document.getElementById('daily-goal-create-modal');

    if (editModal != null) {
      editModal.classList.remove('hidden');
      editModal.classList.add('flex');
      document.body.insertAdjacentHTML(
        'beforeend',
        '<div modal-backdrop="" id="tempElement" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>'
      );
    }
  }

  hideDailyGoalCreatelModal() {
    let editModal = document.getElementById('daily-goal-create-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');
      let tempElement = document.getElementById('tempElement');
      tempElement?.remove();
    }
  }

  createDailyGoal() {
    console.log(this.dailyGoalCreateForm.valid);

    if (this.dailyGoalCreateForm.valid) {
      const formData = this.dailyGoalCreateForm.value;
      this.dailyGoalService.create(formData).subscribe({
        next: (goal) => {
          this.getTodayGoals();
          this.initDailyGoalCreateForm();
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

  // ################################ EDIT DAILY GOAL ################################

  dailyGoalEditForm!: FormGroup;

  initDailyGoalEditForm() {
    // Initialize the form
    this.dailyGoalEditForm = this.formBuilder.group({
      title: [this.dailyGoal ? this.dailyGoal.title : '', Validators.required],
      description: [this.dailyGoal ? this.dailyGoal.description : ''],
      deadline: [
        this.dailyGoal ? this.dailyGoal.deadline : '',
        Validators.required,
      ],
      priority: [
        this.dailyGoal ? this.dailyGoal.priority : '',
        Validators.required,
      ],
      status: [
        this.dailyGoal ? this.dailyGoal.status : '',
        Validators.required,
      ],
      progress: [
        this.dailyGoal ? this.dailyGoal.progress : '',
        Validators.required,
      ],
      weeklyGoal: [
        this.dailyGoal ? this.dailyGoal.weeklyGoal : '',
        Validators.required,
      ],
    });
  }

  showDailyGoalEditModal(dailyGoal: IDailyGoal) {
    this.dailyGoal = dailyGoal;
    console.log(this.dailyGoal);

    this.initDailyGoalEditForm();
    console.log(this.dailyGoalEditForm.value);

    let editModal = document.getElementById('daily-goal-edit-modal');
    if (editModal != null) {
      editModal.classList.remove('hidden');
      editModal.classList.add('flex');

      document.body.insertAdjacentHTML(
        'beforeend',
        '<div modal-backdrop="" id="tempElement" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>'
      );
    }
  }

  hideDailyGoalEditlModal() {
    let editModal = document.getElementById('daily-goal-edit-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');
      let tempElement = document.getElementById('tempElement');
      tempElement?.remove();
    }
  }

  editDailyGoal() {
    console.log(this.dailyGoalEditForm.value);
    if (this.dailyGoalEditForm.valid) {
      const formData = this.dailyGoalEditForm.value;

      this.dailyGoalService.edit(this.dailyGoal?.id, formData).subscribe({
        next: (goal) => {
          this.getTodayGoals();
          this.initDailyGoalEditForm();
          this.hideDailyGoalEditlModal();
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
      deadline: [
        '',
        Validators.compose([Validators.required, this.futureDateValidator]),
      ],
      priority: ['', Validators.required],
      status: ['TODO', Validators.required],
      progress: [0, Validators.required],
    });
  }
  futureDateValidator(control: FormControl): ValidationErrors | null {
    const deadline = moment(control.value).format('YYYY-MM-DD');
    if (!deadline || moment(deadline).isBefore(moment())) {
      return { futureDate: true };
    }
    return null;
  }
  showAnnualGoalCreateModal() {
    let editModal = document.getElementById('create-modal');
    if (editModal != null) {
      editModal.classList.remove('hidden');
      editModal.classList.add('flex');
      document.body.insertAdjacentHTML(
        'beforeend',
        '<div modal-backdrop="" id="tempElement" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>'
      );
    }
  }
  hideAnnualGoalCreateModal() {
    let editModal = document.getElementById('create-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');
      let tempElement = document.getElementById('tempElement');
      tempElement?.remove();
    }
  }

  createAnnualGoal() {
    if (this.goalCreateForm.valid) {
      const formData = this.goalCreateForm.value;
      console.log(formData);

      this.annualGoalService.create(formData).subscribe({
        next: (goal) => {
          // this.initAnnualGoalCreateForm();
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

      document.body.insertAdjacentHTML(
        'beforeend',
        '<div modal-backdrop="" id="tempElement" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>'
      );
    }
  }
  hideAnnualGoalEditModal() {
    this.annualGoal = {} as IAnnualGoal;
    this.initAnnualGoalEditForm();

    let editModal = document.getElementById('edit-modal');
    if (editModal != null) {
      editModal.classList.remove('flex');
      editModal.classList.add('hidden');

      let tempElement = document.getElementById('tempElement');
      tempElement?.remove();
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

  monthlyGoals: IMonthlyGoal[] = [];
  monthlyGoals_Nested: IMonthlyGoal[][] = [];
  getMonthlyGoals() {
    this.monthlyGoalService.getMonthlyGoals().subscribe({
      next: (data) => {
        this.monthlyGoals = data as IMonthlyGoal[];
        this.monthlyGoals_Nested = this.generatePyramidRows(this.monthlyGoals);
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
      annualGoal: ['', Validators.required],
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
    if (this.monthlyGoalCreateForm.valid) {
      console.log(this.monthlyGoalCreateForm.value);

      const formData = this.monthlyGoalCreateForm.value;
      this.monthlyGoalService.create(formData).subscribe({
        next: (goal) => {
          this.initMonthlyGoalCreateForm();
          this.getMonthlyGoals();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
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
        this.monthlyGoal ? this.monthlyGoal.annualGoal : '',
        Validators.required,
      ],
    });
  }

  showMonthlyGoalEditModal(monthylGoal: IMonthlyGoal) {
    this.monthlyGoal = monthylGoal;
    this.initMonthlyGoalEditForm();
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

  // ###############################################################################
  // -------------------------------------------------------------------------------
  // ################################ WEEKLY GOALS ################################
  // -------------------------------------------------------------------------------
  // ###############################################################################

  weeklyGoal!: IWeeklyGoal;

  weeklyGoals: IWeeklyGoal[] = [];

  getWeeklyGoals() {
    this.weeklyGoalService.getGoals().subscribe({
      next: (data) => {
        console.log('data', data);
        this.weeklyGoals = data as IWeeklyGoal[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ################################ CREATE WEEKLY GOAL ################################

  weeklyGoalCreateForm!: FormGroup;

  initWeeklyGoalCreateForm() {
    this.weeklyGoalCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['TODO', Validators.required],
      progress: [0, Validators.required],
      monthlyGoal: ['', Validators.required],
    });
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
    if (this.weeklyGoalCreateForm.valid) {
      console.log(this.weeklyGoalCreateForm.value);

      const formData = this.weeklyGoalCreateForm.value;
      this.weeklyGoalService.create(formData).subscribe({
        next: (goal) => {
          this.getWeeklyGoals();
          this.initWeeklyGoalCreateForm();
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
        this.weeklyGoal ? this.weeklyGoal.monthlyGoal : '',
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
