<?php

namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Controller\FeedController;
use App\Controller\GetBookmarkController;
use App\Controller\ImageController;
use App\Controller\MyRecipeController;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\RecipeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=RecipeRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => [
        'recipes_read'
    ]],
    denormalizationContext: [
        'disable_type_enforcement' => true
    ],
    collectionOperations: [
        'get',
        'post',
        'image' => [
            'method' => 'POST',
            'path' => '/recipes/{id}/image',
            'deserialize' => false,
            'validate' => false,
            'controller' => ImageController::class,
        ],
        'bookmark' => [
            'method' => 'GET',
            'path' => '/recipes/{id}/rec',
            'deserialize' => false,
            'controller' => GetBookmarkController::class,
        ],
        'feed' => [
            'method' => 'GET',
            'path' => '/feed',
            'controller' => FeedController::class,
        ]
    ]
)]
#[ApiFilter(
    OrderFilter::class,
    properties: ['createdAt']
)]
class Recipe
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(['recipes_read'])]
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['recipes_read'])]
    #[Assert\NotBlank(message: "Ce champ ne peut pas être vide.")]
    #[Assert\Type(
        type: 'string',
        message: '"{{ value }}" devrait être un texte.',
    )]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: 'Titre trop court !',
        maxMessage: 'Titre trop long !',
    )]
    private $title;

    /**
     * @ORM\Column(type="text")
     */
    #[Groups(['recipes_read'])]
    #[Assert\NotBlank(message: "Ce champ ne peut pas être vide.")]
    #[Assert\Type(
        type: 'string',
        message: '"{{ value }}" devrait être un texte.',
    )]
    private $intro;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime", nullable=true)
     */
    #[Groups(['recipes_read'])]
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="recipes")
     * @ORM\JoinColumn(nullable=false)
     */
    #[ApiProperty(fetchEager: true)]
    #[Groups(['recipes_read'])]
    #[Assert\NotBlank(message: "This field can't be null")]
    private $User;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    #[Groups(['recipes_read'])]
    private $createdAt;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    #[Groups(['recipes_read'])]
    private $outro;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    #[Groups(['recipes_read'])]
    private $author;

    /**
     * @ORM\OneToMany(targetEntity=Step::class, mappedBy="recipe", orphanRemoval=true)
     */
    #[ApiProperty(fetchEager: true)]
    #[Groups(['recipes_read'])]
    private $steps;

    /**
     * @ORM\OneToMany(targetEntity=RecipesImage::class, mappedBy="recipe", orphanRemoval=true)
     */
    #[Groups(['recipes_read'])]
    private $recipesImages;

    /**
     * @Gedmo\Slug(fields={"title"})    
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['recipes_read'])]
    private $slug;

    /**
     * @ORM\OneToMany(targetEntity=Ingredient::class, mappedBy="recipe", orphanRemoval=true)
     */
    #[ApiProperty(fetchEager: true)]
    #[Groups(['recipes_read'])]
    private $ingredients;

    /**
     * @ORM\OneToMany(targetEntity=Like::class, mappedBy="recipe", orphanRemoval=true)
     */
    #[ApiProperty(fetchEager: true)]
    #[Groups(['recipes_read'])]
    private $likes;

    /**
     * @ORM\OneToMany(targetEntity=BookMark::class, mappedBy="recipe", orphanRemoval=true)
     */
    #[Groups(['recipes_read'])]
    private $bookMarks;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="recipe", orphanRemoval=true)
     */
    #[Groups(['recipes_read'])]
    private $comments;


    public function __construct()
    {
        $this->steps = new ArrayCollection();
        $this->recipesImages = new ArrayCollection();
        $this->ingredients = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->bookMarks = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getIntro(): ?string
    {
        return $this->intro;
    }

    public function setIntro(string $intro): self
    {
        $this->intro = $intro;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    public function getUser(): ?User
    {
        return $this->User;
    }

    public function setUser(?User $User): self
    {
        $this->User = $User;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function getOutro(): ?string
    {
        return $this->outro;
    }

    public function setOutro(?string $outro): self
    {
        $this->outro = $outro;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(?string $author): self
    {
        $this->author = $author;

        return $this;
    }

    /**
     * @return Collection|Step[]
     */
    public function getSteps(): Collection
    {
        return $this->steps;
    }

    public function addStep(Step $step): self
    {
        if (!$this->steps->contains($step)) {
            $this->steps[] = $step;
            $step->setRecipe($this);
        }

        return $this;
    }

    public function removeStep(Step $step): self
    {
        if ($this->steps->removeElement($step)) {
            // set the owning side to null (unless already changed)
            if ($step->getRecipe() === $this) {
                $step->setRecipe(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|RecipesImage[]
     */
    public function getRecipesImages(): Collection
    {
        return $this->recipesImages;
    }

    public function addRecipesImage(RecipesImage $recipesImage): self
    {
        if (!$this->recipesImages->contains($recipesImage)) {
            $this->recipesImages[] = $recipesImage;
            $recipesImage->setRecipe($this);
        }

        return $this;
    }

    public function removeRecipesImage(RecipesImage $recipesImage): self
    {
        if ($this->recipesImages->removeElement($recipesImage)) {
            // set the owning side to null (unless already changed)
            if ($recipesImage->getRecipe() === $this) {
                $recipesImage->setRecipe(null);
            }
        }

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    /**
     * @return Collection|Ingredient[]
     */
    public function getIngredients(): Collection
    {
        return $this->ingredients;
    }

    public function addIngredient(Ingredient $ingredient): self
    {
        if (!$this->ingredients->contains($ingredient)) {
            $this->ingredients[] = $ingredient;
            $ingredient->setRecipe($this);
        }

        return $this;
    }

    public function removeIngredient(Ingredient $ingredient): self
    {
        if ($this->ingredients->removeElement($ingredient)) {
            // set the owning side to null (unless already changed)
            if ($ingredient->getRecipe() === $this) {
                $ingredient->setRecipe(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Like[]
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): self
    {
        if (!$this->likes->contains($like)) {
            $this->likes[] = $like;
            $like->setRecipe($this);
        }

        return $this;
    }

    public function removeLike(Like $like): self
    {
        if ($this->likes->removeElement($like)) {
            // set the owning side to null (unless already changed)
            if ($like->getRecipe() === $this) {
                $like->setRecipe(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|BookMark[]
     */
    public function getBookMarks(): Collection
    {
        return $this->bookMarks;
    }

    public function addBookMark(BookMark $bookMark): self
    {
        if (!$this->bookMarks->contains($bookMark)) {
            $this->bookMarks[] = $bookMark;
            $bookMark->setRecipe($this);
        }

        return $this;
    }

    public function removeBookMark(BookMark $bookMark): self
    {
        if ($this->bookMarks->removeElement($bookMark)) {
            // set the owning side to null (unless already changed)
            if ($bookMark->getRecipe() === $this) {
                $bookMark->setRecipe(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setRecipe($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getRecipe() === $this) {
                $comment->setRecipe(null);
            }
        }

        return $this;
    }
}
