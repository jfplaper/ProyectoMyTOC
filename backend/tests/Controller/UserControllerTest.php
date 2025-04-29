<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class UserControllerTest extends WebTestCase
{
    /** @test */
    public function testIndexUser(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['email' => 'jfplaper@gmail.com']);
        $client->loginUser($testUser);

        $client->request('GET', '/user');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Usuarios');
    }

    /** @test */
    public function testShowUser(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);
        
        $client->request('GET', "/user/{$testUser->getId()}");
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Datos del usuario ' . $testUser->getUsername());
    }

    /** @test */
    public function testCreateUser(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/register');
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Registrarme')->form();

        $form['registration_form[username]'] = 'jose';
        $form['registration_form[email]'] = 'jose@gmail.com';
        $form['registration_form[plainPassword]'] = '123456';
        $form['registration_form[confirmationPlainPassword]'] = '123456';
        $form['registration_form[agreeTerms]'] = true;

        // Send form
        $client->submit($form);

        // Check the login redirect
        $this->assertResponseRedirects('/login');
        
        // Make sure the new user was created in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Formulario de inicio de sesión');
    }

    /** @test */
    public function testEditUser(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $testUserToUpdate = $userRepository->findOneBy(['email' => 'jose@gmail.com']);
        $crawler = $client->request('GET', "/user/{$testUserToUpdate->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Actualizar')->form();

        $form['user[username]'] = 'joselillo';
        $form['user[email]'] = 'joselillo@gmail.com';

        // Send form
        $client->submit($form);

        // Check the user index redirect
        $this->assertResponseRedirects('/user');
        
        // Make sure the user was updated in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Usuarios');
    }

    /** @test */
    public function testDeleteUser(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $testUserToDelete = $userRepository->findOneBy(['email' => 'joselillo@gmail.com']);
        $crawler = $client->request('GET', "/user/{$testUserToDelete->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Eliminar')->form();

        $client->request('POST', "/user/{$testUserToDelete->getId()}", [
            '_token' => 'valid_token_here' // Must obtain a valid CSRF token
        ]);

        // Send form
        $client->submit($form);

        // Check the user index redirect
        $this->assertResponseRedirects('/user');
        
        // Make sure the user was deleted in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Usuarios');
    }
}
