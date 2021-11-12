<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\InvoicesCounterController;
use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CustomerRepository::class)
 */
#[ApiResource(
    normalizationContext: [
        'groups' => ['customer:read']
    ],
    subresourceOperations: [
        'invoices_get_subresource_' => [
            'path' => '/client/{id}/factures'
        ]
    ],
)]
class Customer
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(['customer:read', 'invoices_read'])]
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['customer:read', 'invoices_read'])]
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
    #[Groups(['customer:read', 'invoices_read'])]
    #[Assert\NotBlank(message: "This field can't be null")]
    #[Assert\Length(
        min: 2,
        max: 50,
        minMessage: 'Your first name must be at least {{ limit }} characters long',
        maxMessage: 'Your first name cannot be longer than {{ limit }} characters',
    )]
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['customer:read', 'invoices_read'])]
    #[Assert\NotBlank(message: "This field can't be null")]
    #[Assert\Email(message: 'The email {{ value }} is not a valid email.')]
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups(['customer:read', 'invoices_read'])]
    private $company;

    /**
     * @ORM\OneToMany(targetEntity=Invoice::class, mappedBy="customer", orphanRemoval=true)
     */
    #[Groups('customer:read')]
    #[ApiSubresource()]
    private $invoices;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="customers")
     */
    #[Groups(['customer:read'])]
    #[Assert\NotBlank(message: "This field can't be null")]
    private $user;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }

    /**
     * Get total amount of invoices
     * @return float
     */
    #[Groups('customer:read')]
    public function getTotalAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function ($total, $invoice) {
            return $total + $invoice->getAmout();
        }, 0);
    }

    /**
     * Get total amount of unpaid invoices
     * @return float
     */
    #[Groups('customer:read')]
    public function getUnpaidAmout(): float
    {
        return array_reduce($this->invoices->toArray(), function ($amout, $invoice) {
            return $amout + ($invoice->getStatus() === 'PAID' || $invoice->getStatus() === "CANCELED" ?
                0 :
                $invoice->getAmout());
        }, 0);
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection|Invoice[]
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->removeElement($invoice)) {
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
