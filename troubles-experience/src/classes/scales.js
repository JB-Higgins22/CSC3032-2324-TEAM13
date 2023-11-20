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

    getNationalistIssues() {
        return this.nationalistIssues;
      }

    getUnionistWeight() {
        return this.unionistWeight;
    }

    getNationalistWeight() {
        return this.nationalistWeight;
    }
  
    placeOnUnionist(issue) {
        if (this.unionistIssues.indexOf(issue) > -1) {
            return new ScalesObject(this.unionistIssues, this.nationalistIssues, this.unionistWeight, this.nationalistWeight);
        } else {
            const updatedUnionistIssues = [...this.unionistIssues, issue];
            const updatedUnionistWeight = this.unionistWeight + issue.weight;

            if (this.checkIfOnNationalist(issue)) {
                var index = this.nationalistIssues.indexOf(issue);
                this.nationalistIssues.splice(index, 1);
                this.nationalistWeight = this.nationalistWeight - issue.weight;
            }

            return new ScalesObject(updatedUnionistIssues, this.nationalistIssues, updatedUnionistWeight, this.nationalistWeight);
        }
    }
  
    placeOnNationalist(issue) {
        if (this.nationalistIssues.indexOf(issue) > -1) {
            return new ScalesObject(this.unionistIssues, this.nationalistIssues, this.unionistWeight, this.nationalistWeight);
        } else {
            const updatedNationalistIssues = [...this.nationalistIssues, issue];
            const updatedNationalistWeight = this.nationalistWeight + issue.weight;

            if (this.checkIfOnUnionist(issue)) {
                var index = this.unionistIssues.indexOf(issue);
                this.unionistIssues.splice(index, 1);
                this.unionistWeight = this.unionistWeight - issue.weight;
            }

            return new ScalesObject(this.unionistIssues, updatedNationalistIssues, this.unionistWeight, updatedNationalistWeight);
        }
    }

    checkIfOnUnionist(issue) {
        if (this.unionistIssues.indexOf(issue) > -1) {
            return true;
        } else {
            return false;
        }
    }

    checkIfOnNationalist(issue) {
        if (this.nationalistIssues.indexOf(issue) > -1) {
            return true;
        } else {
            return false;
        }
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
