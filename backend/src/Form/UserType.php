<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints as Assert;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('username', TextType::class, [
                'attr' => ['class' => 'form-control'],
            ])
            ->add('email', EmailType::class, [
                'mapped' => true,
                'attr' => ['class' => 'form-control'],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Debes rellenar este campo',
                    ]),
                    new Assert\Email([
                        'message' => 'Debes usar un formato de email válido (ejemplo@servicioDeEmail.com).',
                    ]),
                ],
            ])
            ->add('roles', ChoiceType::class, [
                'choices' => [
                    'ROLE_USER' => 'ROLE_USER',
                    'ROLE_ADMIN' => 'ROLE_ADMIN',
                ],
                'multiple' => true,
                'expanded' => true,
                // Establecer los roles seleccionados por defecto
                'data' => $options['data']->getRoles()
            ])
            ->add('banned')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
