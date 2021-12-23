<?php

namespace App\Controller;

use App\Repository\RecipeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetBookmarkController extends AbstractController
{
    public function __invoke(RecipeRepository $recipeRepository)
    {

        $id = $this->getUser()->getId();
        $bookMarkedRecipes = [];
        $recipes = $recipeRepository->findAll();

        foreach ($recipes as $recipe) {
            foreach ($recipe->getBookMarks()->getIterator() as $bookmark) {
                $userId = $bookmark->getUser()->getId();
                if ($id == $userId) {
                    $bookMarkedRecipes[] = $recipe;
                }
            }
        }
        return $bookMarkedRecipes;
    }
}
