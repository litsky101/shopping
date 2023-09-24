import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[] = [];
    idChanged: Subscription;

    constructor(private shoppingService: ShoppingListService) { }

    ngOnInit(): void {
        this.ingredients = this.shoppingService.getIngredients();
        // this.shoppingService.ingredientChanged.subscribe((ingredient: Ingredient[]) =>{
        //     this.ingredients = ingredient
        // });
        this.idChanged = this.shoppingService.ingredientChanged.subscribe((ingredient: Ingredient[]) =>{
            this.ingredients = ingredient;
        });
    }

    onEditItem(index: number){
        this.shoppingService.startEditing.next(index);
    }

    ngOnDestroy(): void {
        this.idChanged.unsubscribe();
    }

}
