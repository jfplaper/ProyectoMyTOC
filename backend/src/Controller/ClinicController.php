<?php

namespace App\Controller;

use App\Entity\Clinic;
use App\Form\ClinicType;
use App\Repository\ClinicRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/clinic')]
#[IsGranted("ROLE_ADMIN")]
final class ClinicController extends AbstractController{
    #[Route(name: 'app_clinic_index', methods: ['GET'])]
    public function index(ClinicRepository $clinicRepository): Response
    {
        return $this->render('clinic/index.html.twig', [
            'clinics' => $clinicRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_clinic_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $clinic = new Clinic();
        $form = $this->createForm(ClinicType::class, $clinic);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($clinic);
            $entityManager->flush();

            $this->addFlash('success', '¡Registro de la clínica creado con éxito!');
            return $this->redirectToRoute('app_clinic_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('clinic/new.html.twig', [
            'clinic' => $clinic,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_clinic_show', methods: ['GET'])]
    public function show(Clinic $clinic): Response
    {
        return $this->render('clinic/show.html.twig', [
            'clinic' => $clinic,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_clinic_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Clinic $clinic, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ClinicType::class, $clinic);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            $this->addFlash('success', '¡Registro de la clínica actualizado con éxito!');
            return $this->redirectToRoute('app_clinic_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('clinic/edit.html.twig', [
            'clinic' => $clinic,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_clinic_delete', methods: ['POST'])]
    public function delete(Request $request, Clinic $clinic, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$clinic->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($clinic);
            $entityManager->flush();
        }

        $this->addFlash('success', 'El registro de la clínica ha sido eliminado');
        return $this->redirectToRoute('app_clinic_index', [], Response::HTTP_SEE_OTHER);
    }
}
