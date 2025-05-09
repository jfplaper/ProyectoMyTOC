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
    public function index(EventRepository $eventRepository): Response
    {
        return $this->render('event/index.html.twig', [
            'events' => $eventRepository->findAll(),
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
            /** @var UploadedFile $imageFile */
            $imageFile = $form->get('image')->getData();

            // Cómo el campo image no es requerido pero en la base de datos no puede ser null nos aseguramos 
            // de que, si el usuario no sube una imagen, le pondremos una por defecto al evento
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

            // Actualiza la propiedad 'image' de la entidad Event almacenando el nombre del evento 
            // subido o el de la imagen de evento por defecto si el usuario no sube una (pero no la imagen en sí)
            $event->setImage($newFilename);
            $entityManager->persist($event);
            $entityManager->flush();

            $this->addFlash('success', '¡Registro del evento creado con éxito!');
            return $this->redirectToRoute('app_event_index', [], Response::HTTP_SEE_OTHER);
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
                    // Actualiza la propiedad 'image' de la entidad Event almacenando el nombre de la nueva imagen
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
