<?php

namespace App\Controller;

use App\Entity\Thread;
use App\Form\ThreadType;
use App\Repository\ThreadRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/thread')]
#[IsGranted("ROLE_ADMIN")]
final class ThreadController extends AbstractController{
    #[Route(name: 'app_thread_index', methods: ['GET'])]
    public function index(ThreadRepository $threadRepository, UserRepository $userRepository, Request $request): Response
    {
        $threads = $threadRepository->findAll();
        // Save the text of the text input in a variable
        $text = $request->query->get('find');
        if (isset($text) && $text != "") {
            $user = $userRepository->findOneBy(['username' => $text]);
            if ($user)
                $threads = $threadRepository->findBy(['author' => $user->getId()]);
        }

        return $this->render('thread/index.html.twig', [
            'threads' => $threads,
        ]);
    }

    #[Route('/{id}', name: 'app_thread_show', methods: ['GET'])]
    public function show(Thread $thread): Response
    {
        return $this->render('thread/show.html.twig', [
            'thread' => $thread,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_thread_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Thread $thread, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ThreadType::class, $thread);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($form->get('title')->getData()) {
                $entityManager->flush();

                $this->addFlash('success', '¡Registro del thread actualizado con éxito!');
                return $this->redirectToRoute('app_thread_index', [], Response::HTTP_SEE_OTHER);
            }
        }

        return $this->render('thread/edit.html.twig', [
            'thread' => $thread,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_thread_delete', methods: ['POST'])]
    public function delete(Request $request, Thread $thread, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$thread->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($thread);
            $entityManager->flush();
        }

        $this->addFlash('success', 'El registro del thread ha sido eliminado');
        return $this->redirectToRoute('app_thread_index', [], Response::HTTP_SEE_OTHER);
    }
}
