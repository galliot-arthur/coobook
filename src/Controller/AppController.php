<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app')]
    public function index(): Response
    {
        return $this->render('app/index.html.twig', []);
    }

    #[Route('/api/logout', name:"app_logout", methods: 'POST')]
    public function logout(Request $request)
    {
        $response = new Response();
        if ($request->cookies->get('BEARER')) {
            $response->headers->clearCookie('BEARER', '/', null);
            return $response;
        }
        return $response;
    }
}
