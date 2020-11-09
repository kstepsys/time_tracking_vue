import HttpClient from './HttpClient';
export default class Task{
    constructor({id, title, comment, date, time_spent}){
        this.id = id;
        this.title = title;
        this.comment = comment;
        this.date = date;
        this.time_spent = time_spent;
    }

    static getTasks(tasksObjects){
        const tasks = [];
        tasksObjects.forEach(task => {
            tasks.push(new Task(task));
        });

        return tasks;
    }

    static async loadPaginatedTasks(dateFrom, dateTo, page){
        const client = new HttpClient();
        const tasksResponse = await client.instance.get('tasks', {
            params: {
                date_from: dateFrom,
                date_to: dateTo,
                page: page
            }
        });
        const tasks = this.getTasks(tasksResponse.data.tasks);
        const pages = tasksResponse.data.pages;

        return { tasks, pages };
    }

    static async loadTasksExport(dateFrom, dateTo){
        const client = new HttpClient();
        const tasksResponse = await client.instance.get('tasks/export', {
            params: {
                date_from: dateFrom,
                date_to: dateTo,
            }
        });
        
        return this.getTasks(tasksResponse.data);
    }

    static async createTask({title, comment, date, time_spent}){
        const client = new HttpClient();
        await client.instance.post('tasks', {
            title: title,
            comment: comment,
            time_spent: time_spent,
            date: date
        });
    }
}