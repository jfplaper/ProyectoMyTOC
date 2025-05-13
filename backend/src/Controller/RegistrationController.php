<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(
        Request $request, 
        SluggerInterface $slugger, 
        UserPasswordHasherInterface $userPasswordHasher, 
        EntityManagerInterface $entityManager,
        #[Autowire('%kernel.project_dir%/public/uploads/images')] string $imagesDirectory
    ): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                /** @var string $plainPassword */
                $plainPassword = $form->get('plainPassword')->getData();
                $confirmationPlainPassword = $form->get('confirmationPlainPassword')->getData();
                // Checks that the password entered by the user matches the confirmation password and if it 
                // does not match, displays a message to the user and renders the record view
                if ($plainPassword !== $confirmationPlainPassword) {
                    $this->addFlash('error', 'No coinciden ambos password introducidos');
                    return $this->redirectToRoute('app_register');
                }
    
                // Encodes the plain/pure password (as typed by the user without hashing)
                $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));

                /** @var UploadedFile $imageFile */
                $imageFile = $form->get('image')->getData();

                // Since the image field is not required but cannot be null in the database, we ensure that if 
                // the user does not upload an image, we will set a default one
                $newFilename = "avatar_default.png";

                // This condition is necessary because the 'image' field is not required, so the image should 
                // be processed only when an image is uploaded
                if ($imageFile) {
                    $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
                    // This is necessary to safely include the image name as part of the URL
                    $safeFilename = $slugger->slug($originalFilename);
                    $newFilename = $safeFilename . '-' . uniqid() . '.' . $imageFile->guessExtension();

                    // Move the image to the folder where user-uploaded images are stored
                    try {
                        $imageFile->move($imagesDirectory, $newFilename);
                    } catch (FileException $e) {
                        throw new FileException("Error al mover y almacenar la imagen subida " . $e->getMessage());
                    }
                }

                // Updates the 'image' property of the User entity by storing the name of the uploaded image, 
                // or the default avatar name if the user doesn't upload one (but not the image itself)
                $user->setImage($newFilename);
                // Save all remaining data
                $user->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
                $user->setBanned(false);
                //$user->setEmail($request->get('email')); // It is not necessary because it is mapped to true in RegistrationFormType

                $entityManager->persist($user);
                $entityManager->flush();

                $this->addFlash('success', '¡Bienvenido/a! ¡Te has registrado como nuevo usuario/a!');
                return $this->redirectToRoute('app_login');
            }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form,
        ]);
    }
}
