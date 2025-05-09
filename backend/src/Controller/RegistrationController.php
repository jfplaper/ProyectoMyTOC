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
                // Comprueba que el password introducido por el usuario coincide con el de confirmación y si
                // no coincide muestra un mensaje al usuario y renderiza la vista del registro
                if ($plainPassword !== $confirmationPlainPassword) {
                    $this->addFlash('error', 'No coinciden ambos password introducidos');
                    return $this->redirectToRoute('app_register');
                }
    
                // Codifica el password plano/puro (tal cual lo escribe el usuario sin hash)
                $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));

                /** @var UploadedFile $imageFile */
                $imageFile = $form->get('image')->getData();

                // Cómo el campo image no es requerido pero en la base de datos no puede ser null nos aseguramos 
                // de que, si el usuario no sube una imagen, le pondremos una por defecto
                $newFilename = "avatar_default.png";

                // Esta condición es necesaria porque el campo 'image' no es requerido, de manera que la 
                // imagen debe ser procesada sólo cuando una imagen es subida
                if ($imageFile) {
                    $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
                    // Esto es necesario para incluir de manera segura el nombre de la imagen como parte de la URL
                    $safeFilename = $slugger->slug($originalFilename);
                    $newFilename = $safeFilename . '-' . uniqid() . '.' . $imageFile->guessExtension();

                    // Mueve la imagen a la carpeta donde las imágenes subidas por los usuarios son almacenadas
                    try {
                        $imageFile->move($imagesDirectory, $newFilename);
                    } catch (FileException $e) {
                        throw new FileException("Error al mover y almacenar la imagen subida " . $e->getMessage());
                    }
                }

                // Actualiza la propiedad 'image' de la entidad User almacenando el nombre de la imagen 
                // subida o el del avatar por defecto si el usuario no sube una (pero no la imagen en sí)
                $user->setImage($newFilename);
                // Guardo todos los datos restantes
                $user->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
                $user->setBanned(false);
                //$user->setEmail($request->get('email')); // No es necesario porque está mapped a true en RegistrationFormType

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
