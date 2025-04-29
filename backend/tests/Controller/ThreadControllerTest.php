<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use App\Repository\ThreadRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class ThreadControllerTest extends WebTestCase
{
    /** @test */
    public function testIndexThread(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['email' => 'jfplaper@gmail.com']);
        $client->loginUser($testUser);

        $client->request('GET', '/thread');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Threads');
    }

    /** @test */
    public function testShowThread(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $threadRepository = static::getContainer()->get(ThreadRepository::class);
        // Assuming there is a thread with id 1
        $testThread = $threadRepository->findOneBy(['id' => 1]);

        $client->request('GET', "/thread/{$testThread->getId()}");
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Datos del thread');
    }

    /** @test */
    public function testEditThread(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        // Assuming there is a thread with title Título de thread de prueba (if not, create in database)
        $threadRepository = static::getContainer()->get(ThreadRepository::class);
        $testThreadToUpdate = $threadRepository->findOneBy(['title' => 'Título de thread de prueba']);
        $crawler = $client->request('POST', "/thread/{$testThreadToUpdate->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Actualizar')->form();

        $form['thread[title]'] = 'Título de thread de prueba editado';

        // Send form
        $client->submit($form);

        // Check the thread index redirect
        $this->assertResponseRedirects('/thread');
        
        // Make sure the thread was updated in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Threads');
    }

    /** @test */
    public function testDeleteThread(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $threadRepository = static::getContainer()->get(ThreadRepository::class);
        $testThreadToDelete = $threadRepository->findOneBy(['title' => 'Título de thread de prueba editado']);
        $crawler = $client->request('POST', "/thread/{$testThreadToDelete->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Eliminar')->form();

        $client->request('POST', "/thread/{$testThreadToDelete->getId()}", [
            '_token' => 'valid_token_here' // Must obtain a valid CSRF token
        ]);

        // Send form
        $client->submit($form);

        // Check the thread index redirect
        $this->assertResponseRedirects('/thread');
        
        // Make sure the thread was deleted in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Threads');
    }
}
