<?php

namespace App\Controller;

use App\Entity\Event;
use App\Form\EventType;
use App\Repository\EventRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/event')]
#[IsGranted("ROLE_ADMIN")]
final class EventController extends AbstractController{
    #[Route(name: 'app_event_index', methods: ['GET'])]
    public function index(EventRepository $eventRepository, Request $request): Response
    {
        $events = $eventRepository->findAll();
        // To check if the user has selected a radio button
        $search = $request->query->get('search');
        // Save the text of the text input in a variable
        $text = $request->query->get('find');
        if (isset($text) && $text != "") {
            if (isset($search)) {
                $events = ($search == "title") ? 
                    $eventRepository->findByTitle($text) : $eventRepository->findByLocation($text);
            }
        }
        return $this->render('event/index.html.twig', [
            'events' => $events,
        ]);
    }

    #[Route('/new', name: 'app_event_new', methods: ['GET', 'POST'])]
    public function new(
        Request $request,
        SluggerInterface $slugger,
        EntityManagerInterface $entityManager,
        #[Autowire('%kernel.project_dir%/public/uploads/images')] string $imagesDirectory
    ): Response
    {
        $event = new Event();
        $form = $this->createForm(EventType::class, $event);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($form->get('title')->getData() && $form->get('text')->getData()) {
                /** @var UploadedFile $imageFile */
                $imageFile = $form->get('image')->getData();

                // Since the image field is not required but cannot be null in the database, it is necessary to 
                // ensure that if the user does not upload an image, a default image will be set for the event
                $newFilename = "event_default.jpg";

                if ($imageFile) {
                    $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
                    $safeFilename = $slugger->slug($originalFilename);
                    $newFilename = $safeFilename . '-' . uniqid() . '.' . $imageFile->guessExtension();

                    try {
                        $imageFile->move($imagesDirectory, $newFilename);
                    } catch (FileException $e) {
                        throw new FileException("Error al mover y almacenar la imagen subida " . $e->getMessage());
                    }
                }

                // Updates the 'image' property of the Event entity by storing the uploaded event name or the 
                // default event image if the user does not upload one (but not the image itself)
                $event->setImage($newFilename);
                $event->setCreator($this->getUser());
                $entityManager->persist($event);
                $entityManager->flush();

                $this->addFlash('success', '¡Registro del evento creado con éxito!');
                return $this->redirectToRoute('app_event_index', [], Response::HTTP_SEE_OTHER);
            }
        }

        return $this->render('event/new.html.twig', [
            'event' => $event,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_event_show', methods: ['GET'])]
    public function show(Event $event): Response
    {
        return $this->render('event/show.html.twig', [
            'event' => $event,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_event_edit', methods: ['GET', 'POST'])]
    public function edit(
        Request $request,
        SluggerInterface $slugger,
        Event $event,
        EntityManagerInterface $entityManager,
        #[Autowire('%kernel.project_dir%/public/uploads/images')] string $imagesDirectory
    ): Response
    {
        $form = $this->createForm(EventType::class, $event);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var UploadedFile $imageFile */
            $imageFile = $form->get('image')->getData();

            if ($imageFile) {
                $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename . '-' . uniqid() . '.' . $imageFile->guessExtension();

                try {
                    $imageFile->move($imagesDirectory, $newFilename);
                    // Updates the 'image' property of the Event entity by storing the name of the new image
                    $event->setImage($newFilename);
                } catch (FileException $e) {
                    throw new FileException("Error al mover y almacenar la imagen subida " . $e->getMessage());
                }
            }

            $entityManager->persist($event);
            $entityManager->flush();

            $this->addFlash('success', '¡Registro del evento actualizado con éxito!');
            return $this->redirectToRoute('app_event_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('event/edit.html.twig', [
            'event' => $event,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_event_delete', methods: ['POST'])]
    public function delete(Request $request, Event $event, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$event->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($event);
            $entityManager->flush();
        }

        $this->addFlash('success', 'El registro del evento ha sido eliminado');
        return $this->redirectToRoute('app_event_index', [], Response::HTTP_SEE_OTHER);
    }
}
