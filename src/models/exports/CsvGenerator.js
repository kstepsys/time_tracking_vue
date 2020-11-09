export default class CsvGenerator {
    constructor(tasks, dateFrom, dateTo) {
        this.tasks = tasks;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    prepareData() {
        const data = [
            ["Title", "Comment", "Date", "Time Spent"]
        ];
        let totalTime = 0;
        for (const task of this.tasks) {
            totalTime += task.time_spent;
            data.push([task.title, task.comment, task.date, task.time_spent])
        }
        data.push([null, null, "Total time:", totalTime]);
        return data;
    }

    generateCsv() {
        const rows = this.prepareData();
        let csvContent = "data:text/csv;charset=utf-8,";
        rows.forEach(function (rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link);
        link.click();
    }
}