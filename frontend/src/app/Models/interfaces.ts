export interface IGoal {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    priority: IPriority;
    status: IStatus;
    progress: number;
}

export enum IPriority {
    HEIGTH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}
export enum IStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export interface IAnnualGoal extends IGoal {
    monthlyGoals?: IMonthlyGoal[]

}
export interface IMonthlyGoal extends IGoal {
    annualGoal: IAnnualGoal
    weeklyGoals?: IWeeklyGoal[]

}
export interface IWeeklyGoal extends IGoal {
    monthlyGoal: IMonthlyGoal
    dailyGoals: IDailyGoal[]
}
export interface IDailyGoal extends IGoal {
    weeklyGoal: IWeeklyGoal
}