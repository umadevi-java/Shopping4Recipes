import { Ingredient } from "src/app/model/ingredient.model";

export class Recipe{
    ingredient: any;

    constructor(public recipeName : string,
    public desc : string,
    public recipeUrl : string,
    public ingredients? : Ingredient[])  {
    }
}