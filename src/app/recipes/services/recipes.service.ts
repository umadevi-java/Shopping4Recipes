import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "src/app/model/ingredient.model";
import { Recipe } from "../model/recipe.model";

@Injectable({
    providedIn: 'root',
  })
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

 recipes : Recipe[] =[
     new Recipe('Tasty Burger',
                'A big fat Burger',
                'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
                [new Ingredient('Meat', 10), new Ingredient('Bun', 1)]),

     new Recipe('Tasty Burger2',
                'A second fat Burger',
                'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
                [new Ingredient('Tomatoes', 1,false), new Ingredient('Lettuce', 5,false)])
 ];

getAllRecipes(){
    return this.recipes.slice();
}
getOneRecipe(index : number){
    return this.recipes[index];
}

addRecipe(editedRecipe : Recipe){
  
    this.recipes.push(editedRecipe);
    this.recipeChanged.next(this.recipes.slice());
}
updateRecipe(editedRecipe : Recipe, i:number){
    const  locIngrArr = this.recipes[i]['ingredients'];
    
    this.recipes[i]= editedRecipe;
    this.recipeChanged.next(this.recipes.slice());
}

deleteRecipe(index:number){
    this.recipes.splice(index,1)
    this.recipeChanged.next(this.recipes.slice());
}

}