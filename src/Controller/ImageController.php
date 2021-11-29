<?php

namespace App\Controller;

use App\Entity\Recipe;
use App\Entity\RecipesImage;
use App\Repository\RecipeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageController extends AbstractController
{
    public function __invoke(Recipe $recipe, Request $request, EntityManagerInterface $em)
    {
        $file = $request->files->get('file');
        if ($file->isValid()) {
            [$originalWidth, $originalHeight] = getimagesize($file->getPathname());

            // Check px size
            if (
                $originalWidth >= 100
                && $originalHeight >= 100
                && $originalWidth <= 140000
                && $originalHeight <= 140000
                && $file->getSize() <= 12582912
                && str_contains(
                    $file->getMimeType(),
                    "image"
                )
            ) {
                $id = $request->attributes->get('id');
                $dossier = __DIR__ . "/../../public/images/recipes";
                $file_name = $id . '.' . $file->getClientOriginalExtension();
                $file->move($dossier, $file_name);

                $image = new RecipesImage;
                $image
                    ->setPath($file_name)
                    ->setRecipe($recipe);
                $em->persist($image);
                $em->flush();
                return true;
            }
            return false;
        }
        return false;
    }
}
