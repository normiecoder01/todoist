import { TaskPriority } from '../enums/task.enums';

export interface UpdateTaskCompletionDTO {
  isComplete: boolean;
}

export interface UpdateTaskPercentageDTO {
  percentageComplete: number;
}

export interface UpdateTodoTaskDTO {
  taskTitle: string;
  taskDescription: string;
  taskPriority: string;
  repeatFrequency: string;
  dueDate: string | null;
  assignedTo: number;
  bucketId: number;
}

export interface Task {
  todoTaskId: number;
  taskTitle: string;
  taskDescription: string;
  taskPriority: string;
  isComplete: boolean;
  repeatFrequency: string;
  createdDate: string;
  dueDate: string;
  updatedDate: string;
  completedDate: string | null;
  percentageComplete: number;
  createdBy: number;
  assignedTo: number;
  bucketId: number;
  bucketName: string;
  reminders: any | null;
  user: any | null;
}

export interface getIncompleteTasks extends Task {
  todoTaskId: number;
  taskTitle: string;
  taskDescription: string;
  taskPriority: string;
  repeatFrequency: string;
  createdDate: string;
  dueDate: string;
  percentageComplete: number;
  createdByUserName: string;
  assignedToUserName: string;
  bucketName: string;
}
export interface getCompletedTasks extends Task {
  todoTaskId: number;
  taskTitle: string;
  taskDescription: string;
  taskPriority: string;
  repeatFrequency: string;
  createdDate: string;
  dueDate: string;
  completedDate: string | null;
  createdByUserName: string;
  assignedToUserName: string;
  bucketName: string;
}


// Response body
// Download
// {
//   "todoTaskId": 2,
//   "taskTitle": "UI Design",
//   "taskDescription": "Design the homepage UI",
//   "taskPriority": "Medium",
//   "isComplete": true,
//   "repeatFrequency": "None",
//   "createdDate": "2024-09-01T00:00:00",
//   "dueDate": "2024-09-05T00:00:00",
//   "updatedDate": "2024-09-09T19:54:19.0856798+05:30",
//   "completedDate": "2024-09-09T19:54:19.0856771+05:30",
//   "percentageComplete": 100,
//   "createdBy": 2,
//   "assignedTo": 2,
//   "bucketId": 2,
//   "reminders": null,
//   "user": null
// }
