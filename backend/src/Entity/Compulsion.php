<?php

namespace App\Entity;

use App\Repository\CompulsionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ORM\Entity(repositoryClass: CompulsionRepository::class)]
class Compulsion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["compulsion:read"])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(["compulsion:read"])]
    private ?\DateTimeInterface $date = null;

    #[ORM\ManyToOne(inversedBy: 'compulsions', targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[MaxDepth(1)]
    #[Groups(["compulsion:read", "user:read"])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'compulsions', targetEntity: Toc::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[MaxDepth(1)]
    #[Groups(["compulsion:read", "toc:read"])]
    private ?Toc $toc = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getToc(): ?Toc
    {
        return $this->toc;
    }

    public function setToc(?Toc $toc): static
    {
        $this->toc = $toc;

        return $this;
    }
}
