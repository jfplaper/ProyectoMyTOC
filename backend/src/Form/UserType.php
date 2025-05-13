<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
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
                'label' => 'Nombre de usuario *',
                'attr' => ['class' => 'form-control mb-3', 'autofocus' => true, 'placeholder' => '(ejemplo: juan)'],
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email *',
                'mapped' => true,
                'attr' => ['class' => 'form-control mb-3', 'placeholder' => '(ejemplo: juan@gmail.com)'],
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
                    'ROLE_ADMIN' => 'ROLE_ADMIN',
                ],
                'multiple' => true,
                'expanded' => true,
                'attr' => ['class' => 'mb-3'],
                'choice_attr' => [
                    'ROLE_ADMIN' => ['class' => 'role-checkbox'],
                ],
                // Set the selected roles by default (if there is more than one)
                'data' => $options['data']->getRoles()
            ])
            ->add('banned', CheckboxType::class, [
                'label' => 'Baneado',
                'attr' => ['class' => 'mx-1 mb-4'],
                'required' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
