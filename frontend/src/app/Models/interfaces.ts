export interface IGoal {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    priority: IPriority;
    status: string;
    progress: number;
}

export enum IPriority{
    HEIGTH = 'HEIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}
export enum IStatus{
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export interface IAnnualGoals extends IGoal{

}