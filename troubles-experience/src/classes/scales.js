import PaperObject from "./paper";

export default class ScalesObject {
    constructor(centralisedIssues, unionistIssues, nationalistIssues, unionistWeight, nationalistWeight) {
        this.centralisedIssues = centralisedIssues;
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

    // REVISIONS
    
    removePreviousSelection(issue) {
        const previousOption = issue.selectedOption;
        if (previousOption === 'A') {
            // Reverse changes for option A
            this.unionistWeight -= issue.optionAUnionistWeight;
            this.nationalistWeight -= issue.optionANationalistWeight;
            // Remove perspectives

            this.nationalistIssues = this.nationalistIssues.filter(paper => paper.headline !== issue.optionANationalistPerspective);
            this.unionistIssues = this.unionistIssues.filter(paper => paper.headline !== issue.optionAUnionistPerspective);
        } else if (previousOption === 'B') {
            // Reverse changes for option B
            this.unionistWeight -= issue.optionBUnionistWeight;
            this.nationalistWeight -= issue.optionBNationalistWeight;
            // Remove perspectives

            this.nationalistIssues = this.nationalistIssues.filter(paper => paper.headline !== issue.optionBNationalistPerspective);
            this.unionistIssues = this.unionistIssues.filter(paper => paper.headline !== issue.optionBUnionistPerspective);
        } else if (previousOption === 'C') {
            // Reverse changes for option C
            this.unionistWeight -= issue.optionCUnionistWeight;
            this.nationalistWeight -= issue.optionCNationalistWeight;
            // Remove perspectives

            this.nationalistIssues = this.nationalistIssues.filter(paper => paper.headline !== issue.optionCNationalistPerspective);
            this.unionistIssues = this.unionistIssues.filter(paper => paper.headline !== issue.optionCUnionistPerspective);
        }
        issue.selectedOption = null;

        // Additional logic as needed
    }
    
    
    selectOptionA(issue) {
        if (issue?.selectedOption == 'A') {
            return new ScalesObject(this.centralisedIssues, this.unionistIssues, this.nationalistIssues, this.unionistWeight, this.nationalistWeight);
        } else if (issue?.selectedOption != 'X') {
            this.removePreviousSelection(issue);
        }
            
        const updatedCentralisedIssues = [...this.centralisedIssues, issue];
        const updatedUnionistWeight = this.unionistWeight + issue?.optionAUnionistWeight;
        const updatedNationalistWeight = this.nationalistWeight + issue?.optionANationalistWeight;

        const nationalistPaper = new PaperObject(issue?.optionANationalistPerspective, 0, issue);
        const unionistPaper = new PaperObject(issue?.optionAUnionistPerspective, 0, issue);
            
        const updatedNationalistIssues = [...this.nationalistIssues, nationalistPaper];
        const updatedUnionistIssues = [...this.unionistIssues, unionistPaper];

        issue.selectedOption = 'A';
            
        return new ScalesObject(updatedCentralisedIssues, updatedUnionistIssues, updatedNationalistIssues, updatedUnionistWeight, updatedNationalistWeight);
    }

    selectOptionB(issue) {
        if (issue?.selectedOption == 'B') {
            return new ScalesObject(this.centralisedIssues, this.unionistIssues, this.nationalistIssues, this.unionistWeight, this.nationalistWeight);
        } else if (issue?.selectedOption != 'X') {
            this.removePreviousSelection(issue);
        }
            
        const updatedCentralisedIssues = [...this.centralisedIssues, issue];
        const updatedUnionistWeight = this.unionistWeight + issue?.optionBUnionistWeight;
        const updatedNationalistWeight = this.nationalistWeight + issue?.optionBNationalistWeight;
    
        const nationalistPaper = new PaperObject(issue?.optionBNationalistPerspective, 0, issue);
        const unionistPaper = new PaperObject(issue?.optionBUnionistPerspective, 0, issue);
            
        const updatedNationalistIssues = [...this.nationalistIssues, nationalistPaper];
        const updatedUnionistIssues = [...this.unionistIssues, unionistPaper];

        issue.selectedOption = 'B';
            
        return new ScalesObject(updatedCentralisedIssues, updatedUnionistIssues, updatedNationalistIssues, updatedUnionistWeight, updatedNationalistWeight);
    }
    
    selectOptionC(issue) {
        if (issue?.selectedOption == 'C') {
            return new ScalesObject(this.centralisedIssues, this.unionistIssues, this.nationalistIssues, this.unionistWeight, this.nationalistWeight);
        } else if (issue?.selectedOption != 'X') {
            this.removePreviousSelection(issue);
        }
            
        const updatedCentralisedIssues = [...this.centralisedIssues, issue];
        const updatedUnionistWeight = this.unionistWeight + issue?.optionCUnionistWeight;
        const updatedNationalistWeight = this.nationalistWeight + issue?.optionCNationalistWeight;
    
        const nationalistPaper = new PaperObject(issue?.optionCNationalistPerspective, 0, issue);
        const unionistPaper = new PaperObject(issue?.optionCUnionistPerspective, 0, issue);
            
        const updatedNationalistIssues = [...this.nationalistIssues, nationalistPaper];
        const updatedUnionistIssues = [...this.unionistIssues, unionistPaper];

        issue.selectedOption = 'C';
            
        return new ScalesObject(updatedCentralisedIssues, updatedUnionistIssues, updatedNationalistIssues, updatedUnionistWeight, updatedNationalistWeight);
    }
    

    

  }




// export default class ScalesObject {
//     constructor(unionistIssues, nationalistIssues, unionistWeight, nationalistWeight) {
//       this.unionistIssues = unionistIssues;
//       this.nationalistIssues = nationalistIssues;
//       this.unionistWeight = unionistWeight;
//       this.nationalistWeight = nationalistWeight;
//     }
  
//     getUnionistIssues() {
//       return this.unionistIssues;
//     }

//     getNationalistIssues() {
//         return this.nationalistIssues;
//       }

//     getUnionistWeight() {
//         return this.unionistWeight;
//     }

//     getNationalistWeight() {
//         return this.nationalistWeight;
//     }
  
//     placeOnUnionist(issue) {
//         if (this.unionistIssues.indexOf(issue) > -1) {
//             return new ScalesObject(this.unionistIssues, this.nationalistIssues, this.unionistWeight, this.nationalistWeight);
//         } else {
//             const updatedUnionistIssues = [...this.unionistIssues, issue];
//             const updatedUnionistWeight = this.unionistWeight + issue.weight;

//             if (this.checkIfOnNationalist(issue)) {
//                 var index = this.nationalistIssues.indexOf(issue);
//                 this.nationalistIssues.splice(index, 1);
//                 this.nationalistWeight = this.nationalistWeight - issue.weight;
//             }

//             return new ScalesObject(updatedUnionistIssues, this.nationalistIssues, updatedUnionistWeight, this.nationalistWeight);
//         }
//     }
  
//     placeOnNationalist(issue) {
//         if (this.nationalistIssues.indexOf(issue) > -1) {
//             return new ScalesObject(this.unionistIssues, this.nationalistIssues, this.unionistWeight, this.nationalistWeight);
//         } else {
//             const updatedNationalistIssues = [...this.nationalistIssues, issue];
//             const updatedNationalistWeight = this.nationalistWeight + issue.weight;

//             if (this.checkIfOnUnionist(issue)) {
//                 var index = this.unionistIssues.indexOf(issue);
//                 this.unionistIssues.splice(index, 1);
//                 this.unionistWeight = this.unionistWeight - issue.weight;
//             }

//             return new ScalesObject(this.unionistIssues, updatedNationalistIssues, this.unionistWeight, updatedNationalistWeight);
//         }
//     }

//     checkIfOnUnionist(issue) {
//         if (this.unionistIssues.indexOf(issue) > -1) {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     checkIfOnNationalist(issue) {
//         if (this.nationalistIssues.indexOf(issue) > -1) {
//             return true;
//         } else {
//             return false;
//         }
//     }


//     // REVISIONS
//     selectOptionA(issue) {

//     }

//     selectOptionB(issue) {

//     }

//     selectOptionC(issue) {

//     }

    

//   }


