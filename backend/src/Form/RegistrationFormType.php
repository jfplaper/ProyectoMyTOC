<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints as Assert;

class RegistrationFormType extends AbstractType
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
            ->add('agreeTerms', CheckboxType::class, [
                'label' => 'Acepto los términos *',
                'mapped' => false,
                'attr' => ['class' => 'mx-1'],
                'constraints' => [
                    new IsTrue([
                        'message' => 'Deberías estar de acuerdo con nuestros términos.',
                    ]),
                ],
            ])
            ->add('plainPassword', PasswordType::class, [
                // instead of being set onto the object directly, this is read and encoded in the controller
                'mapped' => false,
                'attr' => ['autocomplete' => 'new-password', 'class' => 'form-control mb-3', 'placeholder' => 'Mín. 6 caracteres'],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor, introduce un password.',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Tu password debería tener al menos {{ limit }} caracteres',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                ],
            ])
            ->add('confirmationPlainPassword', PasswordType::class, [
                'mapped' => false,
                'attr' => ['autocomplete' => 'new-password', 'class' => 'form-control mb-3'],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor, introduce de nuevo el password.',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Tu password debería tener al menos {{ limit }} caracteres',
                        'max' => 4096,
                    ]),
                ],
            ])
            ->add('image', FileType::class, [
                'label' => 'Sube una imagen de perfil (jpeg, jpg o png)',
                // unmapped means that this field is not associated to any entity property
                'mapped' => false,
                'attr' => ['class' => 'px-1 mb-3'],
                // make it optional so you don't have to re-upload the PDF file every time you edit the Product details
                'required' => false,
                // unmapped fields can't define their validation using attributes in the associated entity, so you can use the PHP constraint classes
                'constraints' => [
                    new File([
                        'maxSize' => '5000k',
                        'mimeTypes' => [
                            'image/jpeg',
                            'image/jpg',
                            'image/png',
                        ],
                        'mimeTypesMessage' => 'Por favor, sube una imagen válida (formato jpeg, jpg o png).',
                    ])
                ],
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
