export default class Issue{
    constructor(name, 
        descriptionOne, 
        descriptionTwo, 
        imageURL, 
        optionA, 
        optionANationalistWeight,
        optionANationalistPerspective,
        optionAUnionistWeight,
        optionAUnionistPerspective,
        optionB, 
        optionBNationalistWeight,
        optionBNationalistPerspective,
        optionBUnionistWeight,
        optionBUnionistPerspective,
        optionC, 
        optionCNationalistWeight,
        optionCNationalistPerspective,
        optionCUnionistWeight,
        optionCUnionistPerspective,
        numberOfOptions,
        selectedOption) {

        // MetaData
        this.name = name;
        this.descriptionOne = descriptionOne;
        this.descriptionTwo = descriptionTwo;
        this.imageURL = imageURL;
        this.numberOfOptions = numberOfOptions;
        this.selectedOption = selectedOption;

        //Option A
        this.optionA = optionA;
        this.optionANationalistWeight = optionANationalistWeight;
        this.optionANationalistPerspective = optionANationalistPerspective;
        this.optionAUnionistWeight = optionAUnionistWeight;
        this.optionAUnionistPerspective = optionAUnionistPerspective;

        //Option B
        this.optionB = optionB;
        this.optionBNationalistWeight = optionBNationalistWeight;
        this.optionBNationalistPerspective = optionBNationalistPerspective;
        this.optionBUnionistWeight = optionBUnionistWeight;
        this.optionBUnionistPerspective = optionBUnionistPerspective;

        //Option C
        this.optionC = optionC;
        this.optionCNationalistWeight = optionCNationalistWeight;
        this.optionCNationalistPerspective = optionCNationalistPerspective;
        this.optionCUnionistWeight = optionCUnionistWeight;
        this.optionCUnionistPerspective = optionCUnionistPerspective;
    }
}

// export default class Issue{
//     constructor(name, descriptionOne, descriptionTwo, imageURL, weight) {
//         this.name = name;
//         this.descriptionOne = descriptionOne;
//         this.descriptionTwo = descriptionTwo;
//         this.imageURL = imageURL;
//         this.weight = weight;
//     }
// }

/*
NAME
DESCRIPTION ONE
DESCRIPTION TWO
IMAGE URL


OPTION-A
OPTION-A-NATIONALIST-WEIGHT
OPTION-A-NATIONALIST-PERSPECTIVE
OPTION-A-UNIONIST-WEIGHT
OPTION-A-UNIONIST-PERSPECTIVE

OPTION-B
...

OPTION-C
...


NUMBEROFOPTIONS: 3

*/