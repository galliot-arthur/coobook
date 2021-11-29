<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class FollowController extends AbstractController
{
    public function __invoke(User $target, EntityManagerInterface $em)
    {
        $target->addFollow($this->getUser());
        $em->persist($target);
        $em->flush();
    }
}
