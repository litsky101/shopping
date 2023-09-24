import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import  { Subject } from 'rxjs';

export class ShoppingListService{
    //ingredientChanged = new EventEmitter<Ingredient[]>();
    ingredientChanged = new Subject<Ingredient[]>();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 10),
    ];
    startEditing = new Subject<number>();

    getIngredients(){
        return this.ingredients;
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        //this.ingredientChanged.emit(this.ingredients);
        this.ingredientChanged.next(this.ingredients);
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredients(ing: Ingredient[]){
        // for(let ingredient of ing){
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ing);
        //this.ingredientChanged.emit(this.ingredients);
        this.ingredientChanged.next(this.ingredients);
    }
}