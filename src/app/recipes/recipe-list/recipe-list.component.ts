import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { relative } from 'path';
import { Subscription } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
 recipes: Recipe[] = [];
 recipeSubscription !: Subscription;

  constructor(private recipeService : RecipeService,
              private router: Router,
              private route :ActivatedRoute) { }

  ngOnInit(): void {
   this.recipes = this.recipeService.getAllRecipes();
    this.recipeSubscription = this.recipeService.recipeChanged.subscribe(
      (recipesEmitted : Recipe[]) => {
        this.recipes = recipesEmitted;
      }
    );

  }

  onAddRecipe(){
    this.router.navigate(['new'], {relativeTo : this.route});
  }

  ngOnDestroy(){
    this.recipeSubscription.unsubscribe();
  }

}
