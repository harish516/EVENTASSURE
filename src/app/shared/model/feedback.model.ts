export class FeedbackModel {
    createdDate: Date;
    score: number;
    category: string;
    message: string;
    name: string;
    email: string;

    constructor(
        score: number,
        category: string,
        message: string,
        name?: string,
        email?: string
    ) {
        this.createdDate = new Date();
        this.score = score;
        this.category = category;
        this.message = message;
        this.name = name;
        this.email = email;
    }
}
