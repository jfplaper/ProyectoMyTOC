<?php

namespace App\Controller;

use App\Entity\Clinic;
use App\Repository\ClinicRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ApiClinicController extends AbstractController{
    #[Route('/api/clinic', name: 'app_api_clinic_get_all', methods: ['GET'])]
    public function getAll(ClinicRepository $clinicRepository): JsonResponse
    {
        $clinics = $clinicRepository->findAll();
        return $this->json($clinics, Response::HTTP_OK, [], ['groups' => 'clinic:read']);
    }

    #[Route('/api/clinic/{id}', name: 'app_api_clinic_get_one', methods: ['GET'])]
    public function getOne(Clinic $clinic): JsonResponse
    {
        return $this->json($clinic, Response::HTTP_OK, [], ['groups' => 'clinic:read']);
    }
}
