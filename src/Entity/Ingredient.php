<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\IngredientRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=IngredientRepository::class)
 */
#[ApiResource(
    itemOperations: [
        'get',
        'post',
        'delete',
        'put' => [
            'validate' => false,
        ],
    ]
)]
class Ingredient
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(['recipes_read'])]
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    #[Groups(['recipes_read'])]
    private $amount;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['recipes_read'])]
    private $name;

    /**
     * @ORM\Column(type="string", length=15, nullable=true)
     */
    private $unit;

    /**
     * @ORM\ManyToOne(targetEntity=Recipe::class, inversedBy="ingredients")
     * @ORM\JoinColumn(nullable=false)
     */
    private $recipe;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getUnit(): ?string
    {
        return $this->unit;
    }

    public function setUnit(string $unit): self
    {
        $this->unit = $unit;

        return $this;
    }

    public function getRecipe(): ?Recipe
    {
        return $this->recipe;
    }

    public function setRecipe(?Recipe $recipe): self
    {
        $this->recipe = $recipe;

        return $this;
    }
}
