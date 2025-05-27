<?php

namespace App\Controller;

use App\Entity\Compulsion;
use App\Entity\User;
use App\Repository\CompulsionRepository;
use App\Repository\TocRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ApiCompulsionController extends AbstractController{
    #[Route('/api/compulsion', name: 'app_api_compulsion_get_all', methods: ['GET'])]
    public function getAll(CompulsionRepository $compulsionRepository): JsonResponse
    {
        $compulsions = $compulsionRepository->findAll();
        return $this->json($compulsions, Response::HTTP_OK, [], ['groups' => 'compulsion:read']);
    }

    #[Route('/api/compulsion/user/{id}', name: 'app_api_compulsion_user_get_all', methods: ['GET'])]
    public function getAllByUser(User $user, CompulsionRepository $compulsionRepository): JsonResponse
    {
        $compulsions = $compulsionRepository->findBy(['user' => $user->getId()]);
        return $this->json($compulsions, Response::HTTP_OK, [], ['groups' => 'compulsion:read']);
    }

    #[Route('/api/compulsion/{id}', name: 'app_api_compulsion_get_one', methods: ['GET'])]
    public function getOne(Compulsion $compulsion): JsonResponse
    {
        return $this->json($compulsion, Response::HTTP_OK, [], ['groups' => 'compulsion:read']);
    }

    #[Route('/api/compulsion', name: 'app_api_compulsion_create', methods: ['POST'])]
    public function create(Request $request, UserRepository $userRepository, TocRepository $tocRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $compulsion = new Compulsion();
            $compulsion->setUser($userRepository->find($data['user']));
            $compulsion->setToc($tocRepository->find($data['toc']));
            $compulsion->setDate(new \DateTime());

            $entityManager->persist($compulsion);
            $entityManager->flush();

            return $this->json($compulsion, Response::HTTP_CREATED, [], ['groups' => 'compulsion:read']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
