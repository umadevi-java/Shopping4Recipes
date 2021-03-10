import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list/service/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Shopping4Recipes';
slBadge !: number;
constructor(private slService : ShoppingListService){}

  ngOnInit(){
    this.slService.slBadge.subscribe(
      (slCount : number) => {
          this.slBadge = slCount;
      }
    );

  }

}
