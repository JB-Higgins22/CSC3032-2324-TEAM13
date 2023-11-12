export default class ScalesObject{
    constructor(unionistIssues, nationalistIssues, unionistWeight, nationalistWeight) {
        this.unionistIssues = unionistIssues;
        this.nationalistIssues = nationalistIssues;
        this.unionistWeight = unionistWeight;
        this.nationalistWeight = nationalistWeight;
    }

    placeOnUnionist(issue) {
        console.log(issue);
        const currentIssue = [issue];
        this.unionistIssues = this.unionistIssues.concat(currentIssue);
        this.unionistWeight = this.unionistWeight + issue.weight;
    }

    placeOnNationalist(issue) {
        const currentIssue = [issue];
        this.nationalistIssues = this.nationalistIssues.concat(currentIssue);
        this.nationalistWeight = this.nationalistWeight + issue.weight;
    }
}
