import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipes.service';
import {  FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/model/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
index !: number;
recipe !: Recipe;
recipeForm !: FormGroup;
editMode = false ;


  constructor(private route : ActivatedRoute,
              private recipeService : RecipeService,
              private fb : FormBuilder) { 
               
  }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      recipeName: '',
      desc : '',
      recipeUrl : '',
      ingredients :new FormArray([])
    });
    this.index = +this.route.snapshot.params['id'];
   if(this.index>=0)
      this.editMode=true;
  
   const recipeObj : Recipe = this.recipeService.getOneRecipe(this.index);

    if(this.editMode)
      this.setFormValues(recipeObj);
    
     
  }


  get ingredients(): FormArray{
     return this.recipeForm.get('ingredients') as FormArray;
  }

  newIngredient() : FormGroup{
    return this.fb.group({
      ingredientName : '',
      ingredientAmount : null
     });
  }

  populateIngredient(name : string,amount : number) : FormGroup{
    console.log('on populating');

    return this.fb.group({
      ingredientName : name,
      ingredientAmount : amount
     });
  }

  onAddIngredient() {
    this.ingredients.push(this.newIngredient());
  }
  onDeleteIngredient(index: number){
    this.ingredients.removeAt(index)
  }
  setFormValues(recipe : Recipe){

    recipe.ingredients?.forEach( ingredient => {
      this.ingredients.push(
        this.populateIngredient(ingredient.ingredientName, ingredient.ingredientAmount));
    } )
    
    this.recipeForm = this.fb.group({
      recipeName: recipe.recipeName,
      desc : recipe.desc,
      recipeUrl : recipe.recipeUrl,
      ingredients : this.ingredients
     // ingredients : this.fb.array( this.recipe.ingredients || [])
    });
    
    
    
    
    
    

  }

  onSubmit(){
    const recipeEdited = this.recipeForm.value;
    if(this.editMode)
    this.recipeService.updateRecipe(recipeEdited, this.index);
    else
    this.recipeService.addRecipe(recipeEdited);
  }
}
