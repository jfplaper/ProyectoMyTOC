<?php

namespace App\Controller;

use App\Entity\Thread;
use App\Repository\ThreadRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ApiThreadController extends AbstractController{
    #[Route('/api/thread', name: 'app_api_thread_get_all')]
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
}
