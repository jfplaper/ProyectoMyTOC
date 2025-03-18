<?php

namespace App\Controller;

use App\Repository\ClinicRepository;
use App\Repository\CommentRepository;
use App\Repository\ThreadRepository;
use App\Repository\TocRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class MainController extends AbstractController{
    #[Route('/', name: 'app_main')]
    public function index(): Response
    {
        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    #[Route('/doc/user', name: 'app_main_doc_user', methods: ['GET'])]
    public function getUserDoc(UserRepository $userRepository): Response
    {
        return $this->render('main/doc_user.html.twig', [
            'users' => $userRepository->findAll(),
        ]);
    }

    #[Route('/doc/toc', name: 'app_main_doc_toc', methods: ['GET'])]
    public function getTocDoc(TocRepository $tocRepository): Response
    {
        return $this->render('main/doc_toc.html.twig', [
            'tocs' => $tocRepository->findAll(),
        ]);
    }

    #[Route('/doc/clinic', name: 'app_main_doc_clinic', methods: ['GET'])]
    public function getClinicDoc(ClinicRepository $clinicRepository): Response
    {
        return $this->render('main/doc_clinic.html.twig', [
            'clinics' => $clinicRepository->findAll(),
        ]);
    }

    #[Route('/doc/thread', name: 'app_main_doc_thread', methods: ['GET'])]
    public function getThreadDoc(ThreadRepository $threadRepository): Response
    {
        return $this->render('main/doc_thread.html.twig', [
            'threads' => $threadRepository->findAll(),
        ]);
    }

    #[Route('/doc/comment', name: 'app_main_doc_comment', methods: ['GET'])]
    public function getCommentDoc(CommentRepository $commentRepository): Response
    {
        return $this->render('main/doc_comment.html.twig', [
            'comments' => $commentRepository->findAll(),
        ]);
    }

    #[Route('/doc/compulsion', name: 'app_main_doc_compulsion', methods: ['GET'])]
    public function getCompulsionDoc(): Response
    {
        $compulsion = [
            [
                "id" => "1",
                "user" => "1",
                "toc" => "2",
                "date" => "2025-03-18 14:59:00"
            ]
        ];

        return $this->render('main/doc_compulsion.html.twig', [
            'compulsion' => $compulsion,
        ]);
    }
}
