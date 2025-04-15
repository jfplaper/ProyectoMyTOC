<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class ApiUserController extends AbstractController{
    #[Route('/api/user', name: 'app_api_user_get_all', methods: ['GET'])]
    public function getAll(UserRepository $userRepository): JsonResponse
    {
        $users = $userRepository->findAll();
        return $this->json($users, Response::HTTP_OK, [], ['groups' => 'user:read']);
    }

    #[Route('/api/user/{id}', name: 'app_api_user_get_one', methods: ['GET'])]
    public function getOne(User $user): JsonResponse
    {
        return $this->json($user, Response::HTTP_OK, [], ['groups' => 'user:read']);
    }

    #[Route('/api/login', name: 'app_api_user_login', methods: ['POST'])]
    public function login(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $userPasswordHasherInterface): JsonResponse
    {
        if ($this->getUser())
            return $this->json(['error' => 'User is already logged in'], Response::HTTP_UNAUTHORIZED);

        $data = json_decode($request->getContent(), true);
        $checkUser = $userRepository->findOneBy(['username' => $data['username']]);

        if (!isset($checkUser))
            return $this->json(['error' => 'Username or password invalid'], Response::HTTP_UNAUTHORIZED);

        if ($userPasswordHasherInterface->isPasswordValid($checkUser, trim($data['password'])))
            return $this->json($checkUser, Response::HTTP_OK, [], ['groups' => 'user:read']);
        
        return $this->json(['error' => 'Something went wrong. If you see this message, contact support'], Response::HTTP_I_AM_A_TEAPOT);
    }

    #[Route('/api/user', name: 'app_api_user_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasher): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $user = new User();
            $user->setUsername($data['username']);
            $user->setRoles(["ROLE_USER"]);
            $user->setPassword($userPasswordHasher->hashPassword($user, $data['password']));
            $user->setEmail($data['email']);
            $user->setImage("avatar_default.png");
            $user->setBanned(false);

            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json($user, Response::HTTP_CREATED, [], ['groups' => 'user:read']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/register', name: 'app_api_user_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasherInterface, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (!isset($data['password']))
                return $this->json(['error' => 'Password is required'], Response::HTTP_BAD_REQUEST);

            $user = new User();
            $user->setUserName($data['username']);
            $user->setRoles(["ROLE_USER"]);
            $user->setPassword($userPasswordHasherInterface->hashPassword($user, $data['password']));
            $user->setEmail($data['email']);
            $user->setImage("avatar_default.png");
            $user->setBanned(false);

            $entityManager->persist($user);
            $entityManager->flush();

            return $this->json($user, Response::HTTP_CREATED, [], ['groups' => 'user:read']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/user/{id}', name: 'app_api_user_edit', methods: ['PUT'])]
    public function edit(Request $request, User $user, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        try {
            $updatedUser = $serializer->deserialize($request->getContent(), User::class, 'json', ['object_to_populate' => $user]);
            $entityManager->flush();

            return $this->json($updatedUser, Response::HTTP_OK, [], ['groups' => 'user:read']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/user/{id}', name: 'app_api_user_delete', methods: ['DELETE'])]
    public function delete(User $user, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $entityManager->remove($user);
            $entityManager->flush();

            return $this->json(null, Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
