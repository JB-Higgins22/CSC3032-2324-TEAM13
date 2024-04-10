export default class BookshelfObject {
    constructor(issues) {
        this.issues = issues;
    }

    getIssues() {               // Return issues belonging to the Bookshelf Object
        return this.issues;
    }

    removeBook(issue) {                                 // Remove issue from Bookshelf
        if (this.checkIfOnBookshelf(issue)) {
            var index = this.issues.indexOf(issue);
            this.issues.splice(index, 1);
        }

        return new BookshelfObject(this.issues);
    }

    checkIfOnBookshelf(issue) {                         // Checks if issue is on the Bookshelf
        if (this.issues.indexOf(issue) > -1) {
            return true;
        } else {
            return false;
        }
    }

}

