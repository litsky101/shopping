import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  styleUrls: ['./recipe-edit.component.css'],
  template:`
  <div class="row">
      <div class="col-xs-12">
          <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
              <div class="row">
                  <div class="col-xs-12">
                      <button type="submit" class="btn btn-success"  [disabled]="!recipeForm.valid">Save</button>
                      <button type="button" class="btn btn-danger" (click)="onCancel()">Cancel</button>
                  </div>
              </div>

              <div class="row">
                  <div class="col-xs-12">
                      <div class="form-group">
                          <label for="name">Name</label>
                          <input type="text" name="name" id="name" class="form-control" formControlName = "name">
                      </div>
                  </div>
              </div>

              <div class="row">
                  <div class="col-xs-12">
                      <div class="form-group">
                          <label for="imagePath">Image URL</label>
                          <input type="text" id="imagePath" class="form-control" formControlName = "imagePath" #imagePath>
                      </div>
                  </div>
              </div>

              <div class="row">
                  <div class="col-xs 12">
                      <img [src]="imagePath.value" class="img-responsive">
                  </div>
              </div>

              <div class="row">
                  <div class="col-xs-12">
                      <div class="form-group">
                          <label for="description">Description</label>
                          <textarea type="text" id="description" class="form-control" rows="6" formControlName="description"></textarea>
                      </div>
                      <!-- <div class="row">
                          <div class="col-xs-8">
                              <input type="text" class="form-control">
                          </div>
                          <div class="col-xs-2">
                              <input type="number" class="form-control">
                          </div>
                          <div class="col-xs-2">
                              <button class="btn btn-danger">X</button>
                          </div>
                      </div> -->
                  </div>
              </div>

              <div class="row">
                  <div class="col-xs-12" formArrayName="ingredients">
                      <div class="row" *ngFor="let ingredient of controls; let i = index" [formGroupName]="i" style="margin-top: 10px;">
                          <div class="col-xs-8">
                              <input type="text" class="form-control" formControlName="name">
                          </div>
                          <div class="col-xs-2">
                              <input type="text" class="form-control" formControlName="amount">
                          </div>
                          <div class="col-xs-2">
                              <button type="button" class="btn btn-danger" (click)="onDeleteIngredient(i)">X</button>
                          </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-xs-12">
                            <button type="button" class="btn btn-success" (click)="onAddIngredient()">Add Ingredient</button>
                            <button type="button" class="btn btn-danger" (click)="onDeleteIngredients()">Delete Ingredients</button>
                        </div>
                    </div>
                  </div>
              </div>
          </form>
      </div>
  </div>
  `
})

export class RecipeEditComponent implements OnInit {
    id: number;
    editMode: boolean = false;
    recipeForm: FormGroup;

    constructor(private route: ActivatedRoute,private recipeService: RecipeService, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.initForm();
        });
    }

    private initForm(){
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if(this.editMode){
            const recipe = this.recipeService.getRecipe(this.id);
            //recipe
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;

            if(recipe['ingredients']){
                for(let ingredient of recipe.ingredients){
                    recipeIngredients.push(
                        new FormGroup({
                            'name': new FormControl(ingredient.name, Validators.required),
                            'amount': new FormControl(ingredient.amount, 
                                [
                                    Validators.required,
                                    Validators.pattern(/^[1-9]+[0-9]*$/)
                                ])
                        }));
                }
            }
        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients' : recipeIngredients
        });
    }

    onSubmit(){
        // const newRecipe = new Recipe(
        //     this.recipeForm.value['name'],
        //     this.recipeForm.value['description'],
        //     this.recipeForm.value['imagePath'],
        //     this.recipeForm.value['ingredients'],
        // );

        // if(this.editMode){
        //     this.recipeService.updateRecipe(this.id, newRecipe);
        // }else{
        //     this.recipeService.addRecipe(newRecipe);
        // }
        if(this.editMode){
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        }else{
            this.recipeService.addRecipe(this.recipeForm.value);
        }

        this.onCancel();
    }

    get controls(){
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    onAddIngredient(){
       (<FormArray>this.recipeForm.get('ingredients')).push(
           new FormGroup(
            {'name': new FormControl(),
            'amount': new FormControl()})
       )
    }

    onCancel(){
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    onDeleteIngredient(index: number){
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    onDeleteIngredients(){
        (<FormArray>this.recipeForm.get('ingredients')).clear();
    }

}
