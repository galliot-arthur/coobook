<?php

namespace App\Controller;

use App\Repository\RecipeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class GetBookmarkController extends AbstractController
{
    public function __invoke(RecipeRepository $recipeRepository, Security $security)
    {

        $id = $security->getUser()->getId();
        $bookMarkedRecipes = [];
        $recipes = $recipeRepository->findAll();

        foreach ($recipes as $recipe) {
            foreach ($recipe->getBookMarks()->getIterator() as $bookmark) {
                $userid = $bookmark->getUser()->getId();
                if ($id == $userid) {
                    $bookMarkedRecipes[] = $recipe;
                }
            }
        }
        return $bookMarkedRecipes;
    }
}
