<?php

namespace App\Entity;

use App\Repository\TocRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ORM\Entity(repositoryClass: TocRepository::class)]
class Toc
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["toc:read", "compulsion:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["toc:read", "compulsion:read"])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(["toc:read", "compulsion:read"])]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Groups(["toc:read", "compulsion:read"])]
    private ?string $image = null;

    #[ORM\Column]
    #[Groups(["toc:read", "compulsion:read"])]
    private ?bool $customed = null;

    #[ORM\ManyToOne(inversedBy: 'tocs', targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[MaxDepth(1)]
    #[Groups(["toc:read", "user:read", "compulsion:read"])]
    private ?User $creator = null;

    /**
     * @var Collection<int, Compulsion>
     */
    #[ORM\OneToMany(targetEntity: Compulsion::class, mappedBy: 'toc')]
    private Collection $compulsions;

    public function __construct()
    {
        $this->compulsions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

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

    public function isCustomed(): ?bool
    {
        return $this->customed;
    }

    public function setCustomed(bool $customed): static
    {
        $this->customed = $customed;

        return $this;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): static
    {
        $this->creator = $creator;

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
            $compulsion->setToc($this);
        }

        return $this;
    }

    public function removeCompulsion(Compulsion $compulsion): static
    {
        if ($this->compulsions->removeElement($compulsion)) {
            // set the owning side to null (unless already changed)
            if ($compulsion->getToc() === $this) {
                $compulsion->setToc(null);
            }
        }

        return $this;
    }
}
