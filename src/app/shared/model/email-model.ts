export class EmailModel {
    subject: string;
    body: string;

    constructor(subject: string, body: string) {
        this.subject = subject;
        this.body = body;
    }
}
