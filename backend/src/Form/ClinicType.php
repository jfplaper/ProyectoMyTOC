<?php

namespace App\Form;

use App\Entity\Clinic;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints as Assert;

class ClinicType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'attr' => ['class' => 'form-control', 'autofocus' => true],
            ])
            ->add('description', TextType::class, [
                'attr' => ['class' => 'form-control'],
            ])
            ->add('location', TextType::class, [
                'attr' => ['class' => 'form-control'],
            ])
            ->add('email', EmailType::class, [
                'mapped' => true,
                'attr' => ['class' => 'form-control'],
                'required' => false,
                'constraints' => [
                    new Assert\Optional([
                        new Assert\Email([
                            'message' => 'Debes usar un formato de email válido (ejemplo@servicioDeEmail.com).',
                        ]),
                    ]),
                ],
            ])
            ->add('phone', TextType::class, [
                'attr' => ['class' => 'form-control'],
                'required' => false,
            ])
            ->add('url', TextType::class, [
                'attr' => ['class' => 'form-control'],
                'required' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Clinic::class,
        ]);
    }
}
