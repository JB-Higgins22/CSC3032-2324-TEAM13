export default class RevisedIssue {
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
        numberOfOptions) {

        // MetaData
        this.name = name;
        this.descriptionOne = descriptionOne;
        this.descriptionTwo = descriptionTwo;
        this.imageURL = imageURL;
        this.numberOfOptions = numberOfOptions;

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