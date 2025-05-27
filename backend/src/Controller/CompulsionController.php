<?php

namespace App\Controller;

use App\Repository\CompulsionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted("ROLE_ADMIN")]
final class CompulsionController extends AbstractController{
    #[Route('/compulsion', name: 'app_compulsion')]
    public function index(CompulsionRepository $compulsionRepository): Response
    {
        $countCompulsionsGroupedByUserIdData = $compulsionRepository->countCompulsionsGroupedByUserId();
        /* Result example:  [
                                ['total' => 5, 'user_id' => 1],
                                ['total' => 3, 'user_id' => 2],
                                // etc.
                            ]
        */

        $countCompulsionsGroupedByTocIdData = $compulsionRepository->countCompulsionsGroupedByTocId();
        /* Result example:  [
                                ['total' => 5, 'toc_id' => 1],
                                ['total' => 3, 'toc_id' => 2],
                                // etc.
                            ]
        */

        return $this->render('compulsion/index.html.twig', [
            'countCompulsionsGroupedByUserIdData' => count($countCompulsionsGroupedByUserIdData),
            'countCompulsionsGroupedByTocIdData' => $countCompulsionsGroupedByTocIdData,
        ]);
    }
}
