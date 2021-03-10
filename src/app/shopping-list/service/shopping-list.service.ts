import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "src/app/model/ingredient.model";


@Injectable()
export class ShoppingListService{
ingredients : Ingredient[] = [
    new Ingredient('Meat', 10), 
    new Ingredient('Meat-Hotdog', 1), 
    new Ingredient('Bun', 1),
    new Ingredient('Lettuce', 1)
];
ingChanged = new Subject<Ingredient[]>();
edittedIngredient = new Subject<number>();
slBadge = new Subject<number>();

shoppingList : Ingredient[]=[];


addToSL(ingredient : Ingredient){
    console.log('##'+ingredient.ingredientName);
    this.shoppingList.push(ingredient);
    this.slBadge.next(this.shoppingList.length);
  }

getAllIngredients(){
    return this.ingredients
}

getIngredient(index : number){
    return this.ingredients[index]
}

addIngredient(ingredient : Ingredient){
    
    this.ingredients.push(ingredient);
    console.log('how many'+this.ingredients.length);
    this.ingChanged.next(this.ingredients);
}
}