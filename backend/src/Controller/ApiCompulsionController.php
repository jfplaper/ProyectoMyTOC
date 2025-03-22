<?php

namespace App\Controller;

use App\Entity\Compulsion;
use App\Repository\CompulsionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class ApiCompulsionController extends AbstractController{
    #[Route('/api/compulsion', name: 'app_api_compulsion_get_all')]
    public function getAll(CompulsionRepository $compulsionRepository): JsonResponse
    {
        $compulsions = $compulsionRepository->findAll();
        return $this->json($compulsions, Response::HTTP_OK, [], ['groups' => 'compulsion:read']);
    }

    #[Route('/api/compulsion/{id}', name: 'app_api_compulsion_get_one', methods: ['GET'])]
    public function getOne(Compulsion $compulsion): JsonResponse
    {
        return $this->json($compulsion, Response::HTTP_OK, [], ['groups' => 'compulsion:read']);
    }

    #[Route('/api/compulsion', name: 'app_api_compulsion_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        try {
            $compulsion = $serializer->deserialize($request->getContent(), Compulsion::class, 'json');
            if ($compulsion && ($compulsion->getUser() && $compulsion->getToc() && $compulsion->getDate())) {
                $entityManager->persist($compulsion);
                $entityManager->flush();

                return $this->json($compulsion, Response::HTTP_CREATED, [], []);
            } else {
                return $this->json(['error' => 'Todos los campos no están correctos'], Response::HTTP_BAD_REQUEST, [], []);
            }
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST, [], []);
        }
    }
}
