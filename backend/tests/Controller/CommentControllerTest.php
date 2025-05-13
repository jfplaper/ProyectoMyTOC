<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use App\Repository\CommentRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class CommentControllerTest extends WebTestCase
{
    /** @test */
    public function testIndexComment(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['email' => 'jfplaper@gmail.com']);
        $client->loginUser($testUser);

        $client->request('GET', '/comment');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Comentarios');
    }

    /** @test */
    public function testShowComment(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $commentRepository = static::getContainer()->get(CommentRepository::class);
        // Assuming there is a comment with id 1
        $testComment = $commentRepository->findOneBy(['id' => 1]);

        $client->request('GET', "/comment/{$testComment->getId()}");
        $this->assertResponseIsSuccessful();
        // data-testid="comment-text" is indicated in the td element in show.html.twig
        $this->assertSelectorTextContains('[data-testid="comment-text"]', $testComment->getText());
    }

    /** @test */
    public function testEditComment(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        // Assuming there is a comment with name Texto de comentario de prueba (if not, create in database)
        $commentRepository = static::getContainer()->get(CommentRepository::class);
        $testCommentToUpdate = $commentRepository->findOneBy(['text' => 'Texto de comentario de prueba']);
        $crawler = $client->request('POST', "/comment/{$testCommentToUpdate->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Actualizar')->form();

        $form['comment[text]'] = 'Texto de comentario de prueba editado';

        // Send form
        $client->submit($form);

        // Check the comment index redirect
        $this->assertResponseRedirects('/comment');
        
        // Make sure the comment was updated in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Comentarios');
    }

    /** @test */
    public function testDeleteComment(): void
    {
        $client = static::createClient();

        $userRepository = static::getContainer()->get(UserRepository::class);
        $testUser = $userRepository->findOneBy(['id' => 1]);
        $client->loginUser($testUser);

        $commentRepository = static::getContainer()->get(CommentRepository::class);
        $testCommentToDelete = $commentRepository->findOneBy(['text' => 'Texto de comentario de prueba editado']);
        $crawler = $client->request('POST', "/comment/{$testCommentToDelete->getId()}/edit");
        $this->assertResponseIsSuccessful();

        // Get form
        $form = $crawler->selectButton('Eliminar')->form();

        $client->request('POST', "/comment/{$testCommentToDelete->getId()}", [
            '_token' => 'valid_token_here'
        ]);

        // Send form
        $client->submit($form);

        // Check the comment index redirect
        $this->assertResponseRedirects('/comment');
        
        // Make sure the comment was deleted in the database
        $client->followRedirect();
        $this->assertSelectorTextContains('h1', 'Comentarios');
    }
}
