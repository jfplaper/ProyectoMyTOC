<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ApiCommentController extends AbstractController{
    #[Route('/api/comment', name: 'app_api_comment_get_all')]
    public function getAll(CommentRepository $commentRepository): JsonResponse
    {
        $comments = $commentRepository->findAll();
        return $this->json($comments, Response::HTTP_OK, [], ['groups' => 'comment:read']);
    }

    #[Route('/api/comment/{id}', name: 'app_api_comment_get_one', methods: ['GET'])]
    public function getOne(Comment $comment): JsonResponse
    {
        return $this->json($comment, Response::HTTP_OK, [], ['groups' => 'comment:read']);
    }
}
