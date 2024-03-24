import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAnnualGoal, IMonthlyGoal, IPriority, IStatus } from 'src/app/Models/interfaces';
import { AnnualGoalsService } from 'src/app/services/annual-goals.service';
import { MonthlyGoalService } from 'src/app/services/monthly-goal.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    constructor(private annualGoalService: AnnualGoalsService, private monthlyGoalService: MonthlyGoalService, private formBuilder: FormBuilder, private datePipe: DatePipe) { }
    ngOnInit(): void {
        this.initForm();
        this.getGoals();
        this.getMonthlyGoals();
    }

    //CORE METHODS

    // ANNUAL GOALS
    annualGoals: IAnnualGoal[] = [];
    annualGoals_Nested: IAnnualGoal[][] = [];

    goalCreateForm!: FormGroup;

    // Enums for select options
    priorities = Object.values(IPriority);
    statuses = Object.values(IStatus);

    getGoals() {
        this.annualGoalService.getGoals().subscribe({
            next: data => {
                this.annualGoals = data as IAnnualGoal[];
                this.annualGoals_Nested = this.generatePyramidRows(this.annualGoals)
            },
            error: err => {
                console.log(err);
            }
        })
    }


    // Initialize the annual goal form
    initForm() {
        this.goalCreateForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            deadline: ['', Validators.required],
            priority: ['', Validators.required],
            status: ['TODO', Validators.required],
            progress: [0, Validators.required]
        });
    }

    createGoal() {
        if (this.goalCreateForm.valid) {
            const formData = this.goalCreateForm.value;
            const formattedDate = this.datePipe.transform(this.goalCreateForm.get('date')?.value, "yyyy-MM-dd");
            const goalFormWithFormattedDate = { ...this.goalCreateForm.value, date: formattedDate }
            this.annualGoalService.create(goalFormWithFormattedDate).subscribe({
                next: goal => {
                    this.getGoals();
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

    // MONTHLY GOALS
    monthlyGolas: IMonthlyGoal[] = [];
    monthlyGoals_Nested: IMonthlyGoal[][] = [];
    getMonthlyGoals() {
        this.monthlyGoalService.getMonthlyGoals().subscribe({
            next: data => {
                this.monthlyGolas = data as IMonthlyGoal[];
                this.monthlyGoals_Nested = this.generatePyramidRows(this.monthlyGolas)
            },
            error: err => {
                console.log(err);
            }
        })
    }

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
        // alert(index)
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
                return 'grid-cols-1 md-grid-cols-2 lg:grid-cols-2';
            default:
                return 'grid-cols-1 sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-2 xl:grid-cols-3';
        }
    }


}
