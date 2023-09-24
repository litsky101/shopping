import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, imagePath: string, _ingredient: Ingredient[] = null){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = _ingredient;
    }
}