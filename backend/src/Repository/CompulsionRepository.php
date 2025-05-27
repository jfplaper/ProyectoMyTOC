<?php

namespace App\Repository;

use App\Entity\Compulsion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Compulsion>
 */
class CompulsionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Compulsion::class);
    }

    /**
     * Returns an array with the count of compulsions grouped by user_id
     * @return array<int, array{user_id: int, total: int}>
     */
    public function countCompulsionsGroupedByUserId(): array
    {
        return $this->createQueryBuilder('c')
            ->select('COUNT(c.id) AS total', 'IDENTITY(c.user) AS user_id')
            ->groupBy('c.user')
            ->getQuery()
            ->getArrayResult()
        ;
    }

    /**
     * Returns an array with the count of compulsions grouped by toc_id
     * @return array<int, array{toc_id: int, total: int}>
     */
    public function countCompulsionsGroupedByTocId(): array
    {
        return $this->createQueryBuilder('c')
            ->select('COUNT(c.id) AS total', 'IDENTITY(c.toc) AS toc_id')
            ->groupBy('c.toc')
            ->orderBy('c.toc', 'ASC')
            ->getQuery()
            ->getArrayResult()
        ;
    }

//    /**
//     * @return Compulsion[] Returns an array of Compulsion objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Compulsion
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
