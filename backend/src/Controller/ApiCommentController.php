<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use App\Repository\ThreadRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class ApiCommentController extends AbstractController{
    #[Route('/api/comment', name: 'app_api_comment_get_all', methods: ['GET'])]
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

    #[Route('/api/comment', name: 'app_api_comment_create', methods: ['POST'])]
    public function create(Request $request, UserRepository $userRepository, ThreadRepository $threadRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $comment = new Comment();
            $comment->setAuthor($userRepository->find($data['author']));
            $comment->setThread($threadRepository->find($data['thread']));
            $comment->setText($data['text']);
            $comment->setDate(new \DateTime());
            $comment->setVisible(true);

            $entityManager->persist($comment);
            $entityManager->flush();

            return $this->json($comment, Response::HTTP_CREATED, [], ['groups' => 'comment:read']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/comment/{id}', name: 'app_api_comment_edit', methods: ['PUT'])]
    public function edit(Request $request, Comment $comment, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        try {
            $updatedComment = $serializer->deserialize($request->getContent(), Comment::class, 'json', ['object_to_populate' => $comment]);
            $entityManager->flush();

            return $this->json($updatedComment, Response::HTTP_OK, [], ['groups' => 'comment:read']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/comment/{id}', name: 'app_api_comment_delete', methods: ['DELETE'])]
    public function delete(Comment $comment, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $entityManager->remove($comment);
            $entityManager->flush();

            return $this->json(null, Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
