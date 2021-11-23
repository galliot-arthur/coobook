<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => [
        'user_read'
    ]],
    collectionOperations: [
        'get',
        'post' => [
            'path' => '/register',
        ],
    ]
)]
#[UniqueEntity('email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(['recipes_read', 'user_read'])]
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    #[Groups(['recipes_read', 'user_read'])]
    #[Assert\NotBlank(message: "This field can't be null")]
    #[Assert\Email(message: 'The email {{ value }} is not a valid email.')]
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    #[Assert\NotBlank(message: "This field can't be null")]
    #[Assert\Length(
        min: 8,
        max: 70,
        minMessage: 'Your password must be at least {{ limit }} characters long',
        maxMessage: 'Your password cannot be longer than {{ limit }} characters',
    )]
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['recipes_read', 'user_read'])]
    #[Assert\NotBlank(message: "This field can't be null")]
    #[Assert\Length(
        min: 2,
        max: 50,
        minMessage: 'Your first name must be at least {{ limit }} characters long',
        maxMessage: 'Your first name cannot be longer than {{ limit }} characters',
    )]
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['recipes_read', 'user_read'])]
    #[Assert\NotBlank(message: "This field can't be null")]
    #[Assert\Length(
        min: 2,
        max: 50,
        minMessage: 'Your last name must be at least {{ limit }} characters long',
        maxMessage: 'Your last name cannot be longer than {{ limit }} characters',
    )]
    private $lastName;

    /**
     * @ORM\OneToMany(targetEntity=Customer::class, mappedBy="user")
     */
    private $customers;

    /**
     * @ORM\OneToMany(targetEntity=Recipe::class, mappedBy="User", orphanRemoval=true)
     */
    #[ApiSubresource()]
    private $recipes;

    /**
     * @ORM\OneToMany(targetEntity=Like::class, mappedBy="user", orphanRemoval=true)
     */
    private $likes;

    /**
     * @ORM\OneToMany(targetEntity=BookMark::class, mappedBy="user", orphanRemoval=true)
     */
    #[ApiSubresource()]
    private $bookMarks;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="user", orphanRemoval=true)
     */
    private $comments;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['recipes_read', 'user_read'])]
    private $website;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['recipes_read', 'user_read'])]
    private $bio;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="follows")
     */
    #[Groups(['recipes_read'])]
    private $following;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="following")
     */
    #[Groups(['recipes_read'])]
    private $follows;

    public function __construct()
    {
        $this->customers = new ArrayCollection();
        $this->recipes = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->bookMarks = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->following = new ArrayCollection();
        $this->follows = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return Collection|Customer[]
     */
    public function getCustomers(): Collection
    {
        return $this->customers;
    }

    public function addCustomer(Customer $customer): self
    {
        if (!$this->customers->contains($customer)) {
            $this->customers[] = $customer;
            $customer->setUser($this);
        }

        return $this;
    }

    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->removeElement($customer)) {
            // set the owning side to null (unless already changed)
            if ($customer->getUser() === $this) {
                $customer->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Recipe[]
     */
    public function getRecipes(): Collection
    {
        return $this->recipes;
    }

    public function addRecipe(Recipe $recipe): self
    {
        if (!$this->recipes->contains($recipe)) {
            $this->recipes[] = $recipe;
            $recipe->setUser($this);
        }

        return $this;
    }

    public function removeRecipe(Recipe $recipe): self
    {
        if ($this->recipes->removeElement($recipe)) {
            // set the owning side to null (unless already changed)
            if ($recipe->getUser() === $this) {
                $recipe->setUser(null);
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
            $like->setUser($this);
        }

        return $this;
    }

    public function removeLike(Like $like): self
    {
        if ($this->likes->removeElement($like)) {
            // set the owning side to null (unless already changed)
            if ($like->getUser() === $this) {
                $like->setUser(null);
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
            $bookMark->setUser($this);
        }

        return $this;
    }

    public function removeBookMark(BookMark $bookMark): self
    {
        if ($this->bookMarks->removeElement($bookMark)) {
            // set the owning side to null (unless already changed)
            if ($bookMark->getUser() === $this) {
                $bookMark->setUser(null);
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
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): self
    {
        $this->website = $website;

        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(?string $bio): self
    {
        $this->bio = $bio;

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getFollowing(): Collection
    {
        return $this->following;
    }

    public function addFollowing(self $following): self
    {
        if (!$this->following->contains($following)) {
            $this->following[] = $following;
        }

        return $this;
    }

    public function removeFollowing(self $following): self
    {
        $this->following->removeElement($following);

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getFollows(): Collection
    {
        return $this->follows;
    }

    public function addFollow(self $follow): self
    {
        if (!$this->follows->contains($follow)) {
            $this->follows[] = $follow;
            $follow->addFollowing($this);
        }

        return $this;
    }

    public function removeFollow(self $follow): self
    {
        if ($this->follows->removeElement($follow)) {
            $follow->removeFollowing($this);
        }

        return $this;
    }
}
