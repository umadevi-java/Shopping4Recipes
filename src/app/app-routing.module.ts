import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-list/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-list/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  
  {path : "recipes", component : RecipesComponent, children : [
    {path : 'new', component: RecipeEditComponent} ,
    {path : ':id', component: RecipeDetailComponent} ,
    {path : ':id/edit', component: RecipeEditComponent} 
  ]
  },
  {path : "shopping", component : ShoppingListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
