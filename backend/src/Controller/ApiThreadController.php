<?php

namespace App\Controller;

use App\Entity\Thread;
use App\Repository\ThreadRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class ApiThreadController extends AbstractController{
    #[Route('/api/thread', name: 'app_api_thread_get_all', methods: ['GET'])]
    public function getAll(ThreadRepository $threadRepository): JsonResponse
    {
        $threads = $threadRepository->findAll();
        return $this->json($threads, Response::HTTP_OK, [], ['groups' => 'thread:read']);
    }

    #[Route('/api/thread/{id}', name: 'app_api_thread_get_one', methods: ['GET'])]
    public function getOne(Thread $thread): JsonResponse
    {
        return $this->json($thread, Response::HTTP_OK, [], ['groups' => 'thread:read']);
    }

    #[Route('/api/thread', name: 'app_api_thread_create', methods: ['POST'])]
    public function create(Request $request, UserRepository $userRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $thread = new Thread();
            $thread->setAuthor($userRepository->find($data['author']));
            $thread->setTitle($data['title']);
            $thread->setDate(new \DateTime());
            $thread->setVisible(true);

            $entityManager->persist($thread);
            $entityManager->flush();

            return $this->json($thread, Response::HTTP_CREATED, [], ['groups' => 'thread:read']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/thread/{id}', name: 'app_api_thread_edit', methods: ['PUT'])]
    public function edit(Request $request, Thread $thread, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        try {
            $updatedThread = $serializer->deserialize($request->getContent(), Thread::class, 'json', ['object_to_populate' => $thread]);
            $entityManager->flush();

            return $this->json($updatedThread, Response::HTTP_OK, [], ['groups' => 'thread:read']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/thread/{id}', name: 'app_api_thread_delete', methods: ['DELETE'])]
    public function delete(Thread $thread, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $entityManager->remove($thread);
            $entityManager->flush();

            return $this->json(null, Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
