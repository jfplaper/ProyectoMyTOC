<?php

namespace App\Controller;

use App\Entity\Toc;
use App\Repository\TocRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class ApiTocController extends AbstractController{
    #[Route('/api/toc', name: 'app_api_toc_get_all', methods: ['GET'])]
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

    #[Route('/api/toc', name: 'app_api_toc_create', methods: ['POST'])]
    public function create(Request $request, UserRepository $userRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $toc = new Toc();
            $toc->setCreator($userRepository->find($data['creator']));
            $toc->setName($data['name']);
            $toc->setDescription($data['description']);
            $toc->setImage("toc_default_1.png");
            $toc->setCustomed(true);

            $entityManager->persist($toc);
            $entityManager->flush();

            return $this->json($toc, Response::HTTP_CREATED, [], ['groups' => 'toc:read']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/toc/{id}', name: 'app_api_toc_edit', methods: ['PUT'])]
    public function edit(Request $request, Toc $toc, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        try {
            $updatedToc = $serializer->deserialize($request->getContent(), Toc::class, 'json', ['object_to_populate' => $toc]);
            $entityManager->flush();

            return $this->json($updatedToc, Response::HTTP_OK, [], ['groups' => 'toc:read']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/toc/{id}', name: 'app_api_toc_delete', methods: ['DELETE'])]
    public function delete(Toc $toc, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $entityManager->remove($toc);
            $entityManager->flush();

            return $this->json(null, Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
