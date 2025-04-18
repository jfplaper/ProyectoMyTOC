<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_USERNAME', fields: ['username'])]
#[UniqueEntity(fields: ['username'], message: 'There is already an account with this username')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["user:read", "event:read", "toc:read", "compulsion:read", "thread:read", "comment:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    #[Groups(["user:read", "event:read", "toc:read", "compulsion:read", "thread:read", "comment:read"])]
    private ?string $username = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    #[Groups(["user:read", "event:read", "toc:read", "compulsion:read", "thread:read", "comment:read"])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Groups(["user:read", "event:read", "toc:read", "compulsion:read", "thread:read", "comment:read"])]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(["user:read", "event:read", "toc:read", "compulsion:read", "thread:read", "comment:read"])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(["user:read", "event:read", "toc:read", "compulsion:read", "thread:read", "comment:read"])]
    private ?string $image = null;

    #[ORM\Column]
    #[Groups(["user:read", "event:read", "toc:read", "compulsion:read", "thread:read", "comment:read"])]
    private ?bool $banned = null;

    /**
     * @var Collection<int, Toc>
     */
    #[ORM\OneToMany(targetEntity: Toc::class, mappedBy: 'creator', cascade: ['remove'])]
    private Collection $tocs;

    /**
     * @var Collection<int, Thread>
     */
    #[ORM\OneToMany(targetEntity: Thread::class, mappedBy: 'author', cascade: ['remove'])]
    private Collection $threads;

    /**
     * @var Collection<int, Comment>
     */
    #[ORM\OneToMany(targetEntity: Comment::class, mappedBy: 'author', cascade: ['remove'])]
    private Collection $comments;

    /**
     * @var Collection<int, Compulsion>
     */
    #[ORM\OneToMany(targetEntity: Compulsion::class, mappedBy: 'user', cascade: ['remove'])]
    private Collection $compulsions;

    /**
     * @var Collection<int, Event>
     */
    #[ORM\OneToMany(targetEntity: Event::class, mappedBy: 'creator', cascade: ['remove'])]
    private Collection $events;

    public function __construct()
    {
        $this->tocs = new ArrayCollection();
        $this->threads = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->compulsions = new ArrayCollection();
        $this->events = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function isBanned(): ?bool
    {
        return $this->banned;
    }

    public function setBanned(bool $banned): static
    {
        $this->banned = $banned;

        return $this;
    }

    /**
     * @return Collection<int, Toc>
     */
    public function getTocs(): Collection
    {
        return $this->tocs;
    }

    public function addToc(Toc $toc): static
    {
        if (!$this->tocs->contains($toc)) {
            $this->tocs->add($toc);
            $toc->setCreator($this);
        }

        return $this;
    }

    public function removeToc(Toc $toc): static
    {
        if ($this->tocs->removeElement($toc)) {
            // set the owning side to null (unless already changed)
            if ($toc->getCreator() === $this) {
                $toc->setCreator(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Thread>
     */
    public function getThreads(): Collection
    {
        return $this->threads;
    }

    public function addThread(Thread $thread): static
    {
        if (!$this->threads->contains($thread)) {
            $this->threads->add($thread);
            $thread->setAuthor($this);
        }

        return $this;
    }

    public function removeThread(Thread $thread): static
    {
        if ($this->threads->removeElement($thread)) {
            // set the owning side to null (unless already changed)
            if ($thread->getAuthor() === $this) {
                $thread->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setAuthor($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getAuthor() === $this) {
                $comment->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Compulsion>
     */
    public function getCompulsions(): Collection
    {
        return $this->compulsions;
    }

    public function addCompulsion(Compulsion $compulsion): static
    {
        if (!$this->compulsions->contains($compulsion)) {
            $this->compulsions->add($compulsion);
            $compulsion->setUser($this);
        }

        return $this;
    }

    public function removeCompulsion(Compulsion $compulsion): static
    {
        if ($this->compulsions->removeElement($compulsion)) {
            // set the owning side to null (unless already changed)
            if ($compulsion->getUser() === $this) {
                $compulsion->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Event>
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    public function addEvent(Event $event): static
    {
        if (!$this->events->contains($event)) {
            $this->events->add($event);
            $event->setCreator($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): static
    {
        if ($this->events->removeElement($event)) {
            // set the owning side to null (unless already changed)
            if ($event->getCreator() === $this) {
                $event->setCreator(null);
            }
        }

        return $this;
    }
}
