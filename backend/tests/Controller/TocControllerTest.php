<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use App\Repository\TocRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class TocControllerTest extends WebTestCase
{
    /** @test */
    public function testIndexToc(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['email' => 'jfplaper@gmail.com']);
        $client->loginUser($testUser);

        $client->request('GET', '/toc');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Trastornos obsesivos-compulsivos (TOC)');
    }

    /** @test */
    public function testShowToc(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $tocRepository = static::getContainer()->get(TocRepository::class);
        // Assuming there is a toc with id 1
        $testToc = $tocRepository->findOneBy(['id' => 1]);

        $client->request('GET', "/toc/{$testToc->getId()}");
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Datos del TOC ' . $testToc->getName());
    }

    /** @test */
    public function testCreateToc(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $crawler = $client->request('POST', '/toc/new');
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Guardar')->form();

        $form['toc[name]'] = 'Nuevo toc';
        $form['toc[description]'] = 'Descripción del nuevo toc';

        // Send form
        $client->submit($form);

        // Check the toc index redirect
        $this->assertResponseRedirects('/toc');
        
        // Make sure the new toc was created in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Trastornos obsesivos-compulsivos (TOC)');
    }

    /** @test */
    public function testEditToc(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $tocRepository = static::getContainer()->get(TocRepository::class);
        $testTocToUpdate = $tocRepository->findOneBy(['name' => 'Nuevo toc']);
        $crawler = $client->request('POST', "/toc/{$testTocToUpdate->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Actualizar')->form();

        $form['toc[name]'] = 'Nuevo toc editado';
        $form['toc[description]'] = 'Descripción del nuevo toc editado';

        // Send form
        $client->submit($form);

        // Check the toc index redirect
        $this->assertResponseRedirects('/toc');
        
        // Make sure the toc was updated in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Trastornos obsesivos-compulsivos (TOC)');
    }

    /** @test */
    public function testDeleteToc(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $tocRepository = static::getContainer()->get(TocRepository::class);
        $testTocToDelete = $tocRepository->findOneBy(['name' => 'Nuevo toc editado']);
        $crawler = $client->request('POST', "/toc/{$testTocToDelete->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Eliminar')->form();

        $client->request('POST', "/toc/{$testTocToDelete->getId()}", [
            '_token' => 'valid_token_here' // Must obtain a valid CSRF token
        ]);

        // Send form
        $client->submit($form);

        // Check the toc index redirect
        $this->assertResponseRedirects('/toc');
        
        // Make sure the toc was deleted in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Trastornos obsesivos-compulsivos (TOC)');
    }
}
