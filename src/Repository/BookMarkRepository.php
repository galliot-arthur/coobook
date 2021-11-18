<?php

namespace App\Repository;

use App\Entity\BookMark;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method BookMark|null find($id, $lockMode = null, $lockVersion = null)
 * @method BookMark|null findOneBy(array $criteria, array $orderBy = null)
 * @method BookMark[]    findAll()
 * @method BookMark[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookMarkRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BookMark::class);
    }

    // /**
    //  * @return BookMark[] Returns an array of BookMark objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?BookMark
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
