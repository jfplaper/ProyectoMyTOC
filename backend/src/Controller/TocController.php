<?php

namespace App\Controller;

use App\Entity\Toc;
use App\Form\TocType;
use App\Repository\TocRepository;
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

#[Route('/toc')]
#[IsGranted("ROLE_ADMIN")]
final class TocController extends AbstractController{
    #[Route(name: 'app_toc_index', methods: ['GET'])]
    public function index(TocRepository $tocRepository): Response
    {
        return $this->render('toc/index.html.twig', [
            'tocs' => $tocRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_toc_new', methods: ['GET', 'POST'])]
    public function new(
        Request $request,
        SluggerInterface $slugger,
        EntityManagerInterface $entityManager,
        #[Autowire('%kernel.project_dir%/public/uploads/images')] string $imagesDirectory
    ): Response
    {
        $toc = new Toc();
        $form = $this->createForm(TocType::class, $toc);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($form->get('name')->getData() && $form->get('description')->getData()) {
                /** @var UploadedFile $imageFile */
                $imageFile = $form->get('image')->getData();

                // Since the image field is not required but cannot be null in the database, it is necessary to 
                // ensure that if the user does not upload an image, a default image will be set for the toc
                $newFilename = "toc_default_1.png";

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

                // Updates the 'image' property of the Toc entity by storing the uploaded toc name or the 
                // default toc image if the user does not upload one (but not the image itself)
                $toc->setImage($newFilename);
                // Save all remaining data
                $toc->setCreator($this->getUser());
                $toc->setCustomed(false);
                // name and description are not needed because they are mapped to true in TocType
                $entityManager->persist($toc);
                $entityManager->flush();

                $this->addFlash('success', '¡Registro TOC creado con éxito!');
                return $this->redirectToRoute('app_toc_index', [], Response::HTTP_SEE_OTHER);
            }
        }

        return $this->render('toc/new.html.twig', [
            'toc' => $toc,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_toc_show', methods: ['GET'])]
    public function show(Toc $toc): Response
    {
        return $this->render('toc/show.html.twig', [
            'toc' => $toc,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_toc_edit', methods: ['GET', 'POST'])]
    public function edit(
        Request $request,
        SluggerInterface $slugger,
        Toc $toc,
        EntityManagerInterface $entityManager,
        #[Autowire('%kernel.project_dir%/public/uploads/images')] string $imagesDirectory
    ): Response
    {
        $form = $this->createForm(TocType::class, $toc);
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
                    // Updates the 'image' property of the Toc entity by storing the name of the new image
                    $toc->setImage($newFilename);
                } catch (FileException $e) {
                    throw new FileException("Error al mover y almacenar la imagen subida " . $e->getMessage());
                }
            }

            $entityManager->persist($toc);
            $entityManager->flush();

            $this->addFlash('success', '¡Registro TOC actualizado con éxito!');
            return $this->redirectToRoute('app_toc_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('toc/edit.html.twig', [
            'toc' => $toc,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_toc_delete', methods: ['POST'])]
    public function delete(Request $request, Toc $toc, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$toc->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($toc);
            $entityManager->flush();
        }

        $this->addFlash('success', 'El registro TOC ha sido eliminado');
        return $this->redirectToRoute('app_toc_index', [], Response::HTTP_SEE_OTHER);
    }
}
