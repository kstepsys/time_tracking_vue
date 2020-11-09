import { jsPDF } from "jspdf";
export default class PdfGenerator {
    constructor(tasks, dateFrom, dateTo) {
        this.tasks = tasks;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    prepareData() {
        const data = [];
        let totalTime = 0;
        for (const task of this.tasks) {
            totalTime += task.time_spent;
            data.push(Object.assign({}, {
                "Title": task.title,
                "Comment": task.comment,
                "Date": task.date,
                "Time Spent": `${task.time_spent}`,
            }));
        }
        data.push({
            "Title": "",
            "Comment": "",
            "Date": "Total time:",
            "Time Spent": `${totalTime}`,
        });

        return data;
    }

    generatePdf() {
        const headers = [
            { name: "Title", align: "left" },
            { name: "Comment", align: "left" },
            { name: "Date", align: "center" },
            { name: "Time Spent", align: "right" },
        ];
        const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
        doc.table(10, 10, this.prepareData(), headers, { autoSize: true });
        doc.save("export.pdf");
    }
}