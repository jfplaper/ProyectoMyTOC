<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class EventControllerTest extends WebTestCase
{
    /** @test */
    public function testIndexEvent(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['email' => 'jfplaper@gmail.com']);
        $client->loginUser($testUser);

        $client->request('GET', '/event');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Eventos');
    }

    /** @test */
    public function testShowEvent(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $eventRepository = static::getContainer()->get(EventRepository::class);
        // Assuming there is an event with id 1
        $testEvent = $eventRepository->findOneBy(['id' => 1]);

        $client->request('GET', "/event/{$testEvent->getId()}");
        $this->assertResponseIsSuccessful();
        // data-testid="event-title" is indicated in the td element in show.html.twig
        $this->assertSelectorTextContains('[data-testid="event-title"]', $testEvent->getTitle());
    }

    /** @test */
    public function testCreateEvent(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $crawler = $client->request('POST', '/event/new');
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Guardar')->form();

        $form['event[title]'] = 'Nuevo evento';
        $form['event[text]'] = 'Texto explicativo del nuevo evento';
        $form['event[date]'] = '2025-05-12 12:28:00';
        $form['event[location]'] = 'Granada';
        $form['event[price]'] = '10';

        // Send form
        $client->submit($form);

        // Check the event index redirect
        $this->assertResponseRedirects('/event');
        
        // Make sure the new event was created in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Eventos');
    }

    /** @test */
    public function testEditEvent(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $eventRepository = static::getContainer()->get(EventRepository::class);
        $testEventToUpdate = $eventRepository->findOneBy(['title' => 'Nuevo evento']);
        $crawler = $client->request('POST', "/event/{$testEventToUpdate->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Actualizar')->form();

        $form['event[title]'] = 'Nuevo evento editado';
        $form['event[text]'] = 'Texto explicativo del nuevo evento editado';
        $form['event[date]'] = '2025-05-12 12:30:00';
        $form['event[location]'] = 'Granada editada';
        $form['event[price]'] = '20';

        // Send form
        $client->submit($form);

        // Check the event index redirect
        $this->assertResponseRedirects('/event');
        
        // Make sure the event was updated in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Eventos');
    }

    /** @test */
    public function testDeleteEvent(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $eventRepository = static::getContainer()->get(EventRepository::class);
        $testEventToDelete = $eventRepository->findOneBy(['title' => 'Nuevo evento editado']);
        $crawler = $client->request('POST', "/event/{$testEventToDelete->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Eliminar')->form();

        $client->request('POST', "/event/{$testEventToDelete->getId()}", [
            '_token' => 'valid_token_here'
        ]);

        // Send form
        $client->submit($form);

        // Check the event index redirect
        $this->assertResponseRedirects('/event');
        
        // Make sure the event was deleted in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Eventos');
    }
}
