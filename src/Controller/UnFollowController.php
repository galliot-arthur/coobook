<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class UnFollowController extends AbstractController
{
    public function __invoke(User $target, EntityManagerInterface $em)
    {
        $target->removeFollow($this->getUser());
        $em->persist($target);
        $em->flush();
    }
}
