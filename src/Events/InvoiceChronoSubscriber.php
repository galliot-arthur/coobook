<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use DateTime;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{
    /** @var Security */
    private $security;

    /** @var InvoiceRepository */
    private $invoice_repository;

    public function __construct(Security $security, InvoiceRepository $invoice_repository)
    {
        $this->security = $security;
        $this->invoice_repository = $invoice_repository;
    }

    public static function getSubscribedEvents() {
        return [
            KernelEvents::VIEW => ['handleInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function handleInvoice(ViewEvent $event) {
        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($invoice instanceof Invoice && $method == "POST") {

            $user = $this->security->getUser();
            $last = $this->invoice_repository->nextChrono($user);
            //dd($last);
            $invoice->setChrono($last);

            if(empty($invoice->getSentAt())) $invoice->setSentAt(new DateTime());
        }
    }
}
