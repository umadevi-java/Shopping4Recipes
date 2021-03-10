import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient } from 'src/app/model/ingredient.model';
import { ShoppingListService } from '../service/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  shoppingForm !: FormGroup;
  constructor(private fb: FormBuilder,
    private slService : ShoppingListService) { }

  ngOnInit(): void {
    this.slService.edittedIngredient.subscribe(
      (index: number)=>{
        const ingredient = this.slService.getIngredient(index);
        this.shoppingForm = this.fb.group({
          ingredientName: ingredient.ingredientName,
          ingredientAmount : ingredient.ingredientAmount    
        });
      }
    );
    this.shoppingForm = this.fb.group({
      ingredientName: '',
      ingredientAmount : ''     
    });
  }
  
  onSubmit(){
    const ingredientForm = this.shoppingForm.value;
    this.slService.addIngredient(ingredientForm);

  }

}
