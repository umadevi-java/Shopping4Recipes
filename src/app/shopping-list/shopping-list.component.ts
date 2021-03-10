import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingListService } from './service/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
ingredients !: Ingredient[];
private subscription !: Subscription;

  constructor(private slService : ShoppingListService) { }

  ngOnInit(): void {
  this.ingredients = this.slService.getAllIngredients();
   this.subscription =  this.slService.ingChanged.subscribe(
      (ingredients : Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    
  }

  filterIngredients(event : any){
    const ingredientsOrig = this.slService.getAllIngredients();
    let searchString = event.target.value;
    this.ingredients = ingredientsOrig.filter(ingredient => ingredient.ingredientName.toLowerCase().includes(searchString.toLowerCase()));   
  }
  onEditIngredient(index: number){
      this.slService.edittedIngredient.next(index);

  }

  onAddToSL(ingredient : Ingredient){
    this.slService.addToSL(ingredient);
  }
  ngOnDestroy (){
    this.subscription.unsubscribe();
  }

}
