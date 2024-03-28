import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IWeeklyGoal,
  IPriority,
  IStatus,
  IDailyGoal,
} from 'src/app/Models/interfaces';
import { WeeklyGoalService } from 'src/app/services/weekly-goal.service';
import { DailyGoalService } from 'src/app/services/daily-goal.service';

@Component({
  selector: 'app-weekly-goal-details',
  templateUrl: './weekly-goal-details.component.html',
  styleUrls: ['./weekly-goal-details.component.css'],
})
export class WeeklyGoalDetailsComponent implements OnInit {
  @Input() weeklyGoalId!: number;
  weeklyGoal!: IWeeklyGoal;
  weeklyGoals: IWeeklyGoal[] = [];

  priorities = Object.values(IPriority);
  statuses = Object.values(IStatus);

  constructor(
    private weeklyGoalService: WeeklyGoalService,
    private dailyGoalService: DailyGoalService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.weeklyGoalId = params['weeklyGoalId'];
    });

    this.getWeeklyGoal(this.weeklyGoalId);
    this.getWeeklyGoals();

    this.initDailyGoalCreateForm();
    this.initDailyGoalEditForm();
  }

  getWeeklyGoals() {
    this.weeklyGoalService.getGoals().subscribe({
      next: (data) => {
        this.weeklyGoals = data as IWeeklyGoal[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getWeeklyGoal(id: number) {
    this.weeklyGoalService.getGoal(id).subscribe({
      next: (data) => {
        this.weeklyGoal = data as IWeeklyGoal;
        this.initDailyGoalCreateForm();
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

  dailyGoals: IDailyGoal[] = [];
  dailyGoal!: IDailyGoal;

  // ################################ CREATE WEEKLY GOAL ################################

  dailyGoalCreateForm!: FormGroup;

  initDailyGoalCreateForm() {
    this.dailyGoalCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['TODO', Validators.required],
      progress: [0, Validators.required],
      // weeklyGoal: [this.weeklyGoal ? this.weeklyGoal : ''],
      weeklyGoal: { id: this.weeklyGoal ? this.weeklyGoal.id : '' },
    });
  }

  showDailyGoalCreateModal() {
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

  hideDailyGoalCreatelModal() {
    let editModal = document.getElementById('weekly-goal-create-modal');
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
          this.getWeeklyGoal(this.weeklyGoalId);
          this.initDailyGoalCreateForm();
        },
        error: (error) => {
          alert();
          console.log(error);
        },
      });
      console.log('Form submitted:', formData);
    } else {
      console.log('Form is invalid');
    }
  }

  // ################################ EDIT WEEKLY GOAL ################################

  dailyGoalEditForm!: FormGroup;

  initDailyGoalEditForm() {
    // Initialize the form
    this.dailyGoalEditForm = this.formBuilder.group({
      title: [this.dailyGoal ? this.dailyGoal.title : '', Validators.required],
      description: [
        this.dailyGoal ? this.dailyGoal.description : '',
        Validators.required,
      ],
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
    this.initDailyGoalEditForm();
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
