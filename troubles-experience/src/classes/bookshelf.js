export default class BookshelfObject {
    constructor(issues) {
      this.issues = issues;
    }
  
    getIssues() {
      return this.issues;
    }

    removeBook(issue) {
        if (this.checkIfOnBookshelf(issue)) {
            var index = this.issues.indexOf(issue);
            this.issues.splice(index, 1);
        }
        
        return new BookshelfObject(this.issues);
    }

    checkIfOnBookshelf(issue) {
        if (this.issues.indexOf(issue) > -1) {
            return true;
        } else {
            return false;
        }
    }

  }

