export default class ScalesObject {
    constructor(unionistIssues, nationalistIssues, unionistWeight, nationalistWeight) {
      this.unionistIssues = unionistIssues;
      this.nationalistIssues = nationalistIssues;
      this.unionistWeight = unionistWeight;
      this.nationalistWeight = nationalistWeight;
    }
  
    getUnionistIssues() {
      return this.unionistIssues;
    }
  
    placeOnUnionist(issue) {
      const updatedUnionistIssues = [...this.unionistIssues, issue];
      return new ScalesObject(updatedUnionistIssues, this.nationalistIssues, this.unionistWeight + issue.weight, this.nationalistWeight);
    }
  
    placeOnNationalist(issue) {
      const updatedNationalistIssues = [...this.nationalistIssues, issue];
      return new ScalesObject(this.unionistIssues, updatedNationalistIssues, this.unionistWeight, this.nationalistWeight + issue.weight);
    }
  }


// export default class ScalesObject{
//     constructor(unionistIssues, nationalistIssues, unionistWeight, nationalistWeight) {
//         this.unionistIssues = unionistIssues;
//         this.nationalistIssues = nationalistIssues;
//         this.unionistWeight = unionistWeight;
//         this.nationalistWeight = nationalistWeight;
//     }

//     getUnionistIssues() {
//          return this.unionistIssues;
//     }

//     placeOnUnionist(issue) {
//         const currentIssue = [issue];
//         this.unionistIssues = this.unionistIssues.concat(currentIssue);
//         this.unionistWeight = this.unionistWeight + issue.weight;
//     }

//     placeOnNationalist(issue) {
//         const currentIssue = [issue];
//         this.nationalistIssues = this.nationalistIssues.concat(currentIssue);
//         this.nationalistWeight = this.nationalistWeight + issue.weight;
//     }
// }
