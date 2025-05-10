<?php

namespace App\Controller;

use App\Entity\Clinic;
use App\Form\ClinicType;
use App\Repository\ClinicRepository;
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

#[Route('/clinic')]
#[IsGranted("ROLE_ADMIN")]
final class ClinicController extends AbstractController{
    #[Route(name: 'app_clinic_index', methods: ['GET'])]
    public function index(ClinicRepository $clinicRepository, Request $request): Response
    {
        $clinics = $clinicRepository->findAll();
        // Para comprobar si el usuario ha seleccionado un botón de tipo radio
        $search = $request->query->get('search');
        // Guardamos el texto del input tipo texto en una variable
        $text = $request->query->get('find');
        if (isset($text) && $text != "") {
            if (isset($search)) {
                $clinics = ($search == "name") ? 
                    $clinicRepository->findByName($text) : $clinicRepository->findByLocation($text);
            }
        }

        return $this->render('clinic/index.html.twig', [
            'clinics' => $clinics,
        ]);
    }

    #[Route('/new', name: 'app_clinic_new', methods: ['GET', 'POST'])]
    public function new(
        Request $request,
        SluggerInterface $slugger,
        EntityManagerInterface $entityManager,
        #[Autowire('%kernel.project_dir%/public/uploads/images')] string $imagesDirectory
    ): Response
    {
        $clinic = new Clinic();
        $form = $this->createForm(ClinicType::class, $clinic);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var UploadedFile $imageFile */
            $imageFile = $form->get('image')->getData();

            // Cómo el campo image no es requerido pero en la base de datos no puede ser null nos aseguramos 
            // de que, si el usuario no sube una imagen, le pondremos una por defecto a la clínica
            $newFilename = "clinic_default.jpg";

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

            // Actualiza la propiedad 'image' de la entidad Clinic almacenando el nombre de la clínica 
            // subido o el de la imagen de clínica por defecto si el usuario no sube una (pero no la imagen en sí)
            $clinic->setImage($newFilename);
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
    public function edit(
        Request $request,
        SluggerInterface $slugger,
        Clinic $clinic,
        EntityManagerInterface $entityManager,
        #[Autowire('%kernel.project_dir%/public/uploads/images')] string $imagesDirectory
    ): Response
    {
        $form = $this->createForm(ClinicType::class, $clinic);
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
                    // Actualiza la propiedad 'image' de la entidad Clinic almacenando el nombre de la nueva imagen
                    $clinic->setImage($newFilename);
                } catch (FileException $e) {
                    throw new FileException("Error al mover y almacenar la imagen subida " . $e->getMessage());
                }
            }

            $entityManager->persist($clinic);
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
