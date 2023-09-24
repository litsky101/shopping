import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppinglist.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();

    // recipes: Recipe[] = [
    //     new Recipe('Pares', 'Masarap are', 'https://images.aws.nestle.recipes/resized/e8279a3cb2b541dfd775803ec6ef333c_Beef_Pares_Main_944_531.jpg',
    //         [
    //             new Ingredient('Beef Meat', 1),
    //             new Ingredient('Garlic', 5)
    //         ]
    //     ),
    //     new Recipe('Lomi', 'Masarap din are', 'https://yummykitchentv.com/wp-content/uploads/2021/04/lomi-batangas-recipe.jpg',
    //     [
    //         new Ingredient('Flour', 1),
    //         new Ingredient('Egg', 5),
    //         new Ingredient('Kikyam', 3)
    //     ])
    // ];
    private recipes: Recipe[] = [];
    
    selectedRecipe = new EventEmitter<Recipe>();


    constructor(private slService:  ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(id: number){
        return this.recipes.slice()[id];
    }

    addIngredientsToShoppingList(ing: Ingredient[]){
        this.slService.addIngredients(ing);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}