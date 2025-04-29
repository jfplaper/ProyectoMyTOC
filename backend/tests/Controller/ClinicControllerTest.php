<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use App\Repository\ClinicRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
//use PHPUnit\Framework\Attributes\Test; // composer require --dev phpunit/phpunit:^9.5

final class ClinicControllerTest extends WebTestCase
{
    //#[Test]
    /** @test */
    public function testIndexClinic(): void
    {
        // See https://symfony.com/doc/current/testing.html#integration-tests
        // This calls KernelTestCase::bootKernel(), and creates a "client" that is acting as the browser
        $client = static::createClient();

        // It is necessary to log in
        $userRepository = static::getContainer()->get(UserRepository::class);
        // Retrieve the test user
        $testUser = $userRepository->findOneBy(['email' => 'jfplaper@gmail.com']);
        // Simulate $testUser being logged in
        $client->loginUser($testUser);

        // Request a specific page. And $crawler cans be used to create more complex assertions in the tests
        // (e.g. to count the number of page elements that match a given CSS selector)
        //$crawler = $client->request('GET', '/clinic');
        $client->request('GET', '/clinic');

        // Validate a successful response and some content (e.g. page contains "Clínicas")
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Clínicas');
    }

    /** @test */
    public function testShowClinic(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $clinicRepository = static::getContainer()->get(ClinicRepository::class);
        // Assuming there is a clinic with id 1
        $testClinic = $clinicRepository->findOneBy(['id' => 1]);

        $client->request('GET', "/clinic/{$testClinic->getId()}");
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Datos de la clínica ' . $testClinic->getName());
    }

    /** @test */
    public function testCreateClinic(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $crawler = $client->request('POST', '/clinic/new');
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Guardar')->form();

        $form['clinic[name]'] = 'Nueva clínica';
        $form['clinic[description]'] = 'Descripción de la nueva clínica';
        $form['clinic[location]'] = 'Granada';

        // Send form
        $client->submit($form);

        // Check the clinic index redirect
        $this->assertResponseRedirects('/clinic');
        
        // Make sure the new clinic was created in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Clínicas');
    }

    /** @test */
    public function testEditClinic(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $clinicRepository = static::getContainer()->get(ClinicRepository::class);
        $testClinicToUpdate = $clinicRepository->findOneBy(['name' => 'Nueva clínica']);
        $crawler = $client->request('POST', "/clinic/{$testClinicToUpdate->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Actualizar')->form();

        $form['clinic[name]'] = 'Nueva clínica editada';
        $form['clinic[description]'] = 'Descripción de la nueva clínica editada';
        $form['clinic[location]'] = 'Granada editada';

        // Send form
        $client->submit($form);

        // Check the clinic index redirect
        $this->assertResponseRedirects('/clinic');
        
        // Make sure the clinic was updated in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Clínicas');
    }

    /** @test */
    public function testDeleteClinic(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $clinicRepository = static::getContainer()->get(ClinicRepository::class);
        $testClinicToDelete = $clinicRepository->findOneBy(['name' => 'Nueva clínica editada']);
        $crawler = $client->request('POST', "/clinic/{$testClinicToDelete->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Eliminar')->form();

        $client->request('POST', "/clinic/{$testClinicToDelete->getId()}", [
            '_token' => 'valid_token_here' // Must obtain a valid CSRF token
        ]);

        // Send form
        $client->submit($form);

        // Check the clinic index redirect
        $this->assertResponseRedirects('/clinic');
        
        // Make sure the clinic was deleted in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Clínicas');
    }
}
