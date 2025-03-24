<?php

namespace App\Controller;

use App\Entity\Event;
use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ApiEventController extends AbstractController{
    #[Route('/api/event', name: 'app_api_event_get_all', methods: ['GET'])]
    public function getAll(EventRepository $eventRepository): JsonResponse
    {
        $events = $eventRepository->findAll();
        return $this->json($events, Response::HTTP_OK, [], ['groups' => 'event:read']);
    }

    #[Route('/api/event/{id}', name: 'app_api_event_get_one', methods: ['GET'])]
    public function getOne(Event $event): JsonResponse
    {
        return $this->json($event, Response::HTTP_OK, [], ['groups' => 'event:read']);
    }
}
