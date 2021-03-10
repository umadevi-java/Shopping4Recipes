import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FileDetector } from 'protractor';
import { Ingredient } from 'src/app/model/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/service/shopping-list.service';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe !: Recipe ;
index!: number;


  constructor(private recipeService : RecipeService,
            private slService : ShoppingListService,
            private route : ActivatedRoute,
            private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.index = +params['id'];
        this.recipe = this.recipeService.getOneRecipe(this.index);

      }
    );
    
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo : this.route})
    
  }
  
  onDeleteRecipe(){
    if(confirm('Are you sure to delete this Recipe')){
        this.recipeService.deleteRecipe(this.index);
        this.router.navigate(['../'],{relativeTo : this.route});
    }
  }


  fetchSelectedItems() {
     // if the array is not initialized it will show error 
    //property push of undefined
  console.log('to shopping list triggered');
  this.recipe.ingredients?.map(
                            ingredient => {  if(ingredient.isChecked){
                                  // this.slService.shoppingList.push(ingredient);
                                  this.slService.addToSL(ingredient);
                                 }
                               return null
                              }
                          );
  
}

}
