<?php

namespace App\Controller;

use App\Entity\Toc;
use App\Repository\TocRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ApiTocController extends AbstractController{
    #[Route('/api/toc', name: 'app_api_toc_get_all')]
    public function getAll(TocRepository $tocRepository): JsonResponse
    {
        $tocs = $tocRepository->findAll();
        return $this->json($tocs, Response::HTTP_OK, [], ['groups' => 'toc:read']);
    }

    #[Route('/api/toc/{id}', name: 'app_api_toc_get_one', methods: ['GET'])]
    public function getOne(Toc $toc): JsonResponse
    {
        return $this->json($toc, Response::HTTP_OK, [], ['groups' => 'toc:read']);
    }
}
