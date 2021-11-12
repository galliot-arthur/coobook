<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\InvoiceRepository;
use Doctrine\Common\Annotations\Annotation\Attributes;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => [
        'invoices_read'
    ]],
    subresourceOperations: [
        'api_customers_invoices_get_subresource' =>  [
            'normalization_context' => [
                'groups' => ['invoices_subresources']
            ]
        ],
    ],
    denormalizationContext: [
        "disable_type_enforcement" => true
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'status' => 'exact',
        'customer.firstName' => 'partial',
        'customer.lastName' => 'partial',
    ]
)]
class Invoice
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     */
    #[Groups(['invoices_read', 'customer:read', 'invoices_subresources'])]
    #[Assert\NotBlank(message: "This field can't be null")]
    #[Assert\Type(
        type: 'float',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[Assert\Positive(message: "This number have to be positive")]
    private $amout;

    /**
     * @ORM\Column(type="datetime")
     */
    #[Groups(['invoices_read', 'customer:read', 'invoices_subresources'])]
    #[Assert\NotBlank(message: "This field can't be null")]
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(['invoices_read', 'customer:read', 'invoices_subresources'])]
    #[Assert\NotBlank(message: "This field can't be null")]
    #[Assert\Choice(['SENT', 'PAID', 'CANCELLED'])]
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     */
    #[Groups('invoices_read')]
    #[Assert\NotBlank(message: "This field can't be null")]
    private $customer;

    /**
     * @ORM\Column(type="integer")
     */
    #[Groups(['invoices_read', 'customer:read', 'invoices_subresources'])]
    #[Assert\NotBlank(message: "This field can't be null")]
    #[Assert\Type(
        type: 'integer',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[Assert\Positive(message: "This number have to be positive")]
    private $chrono;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Get user
     * @return User
     */
    #[Groups('invoices_read')]
    public function getUser(): User
    {
        return $this->customer->getUser();
    }

    public function getAmout(): ?float
    {
        return $this->amout;
    }

    public function setAmout($amout): self
    {
        $this->amout = $amout;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
