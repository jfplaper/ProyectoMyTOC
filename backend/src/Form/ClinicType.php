<?php

namespace App\Form;

use App\Entity\Clinic;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints as Assert;

class ClinicType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Nombre *',
                'attr' => ['class' => 'form-control mb-3', 'autofocus' => true, 'placeholder' => '(ejemplo: Clínica Granada-TOC)'],
            ])
            ->add('description', TextType::class, [
                'label' => 'Descripción *',
                'attr' => ['class' => 'form-control mb-3', 'placeholder' => '(ejemplo: Somos especialistas en...)'],
            ])
            ->add('location', TextType::class, [
                'label' => 'Localización *',
                'attr' => ['class' => 'form-control mb-3', 'placeholder' => '(ejemplo: C/ Albondón, 12, 18003 - Granada)'],
            ])
            ->add('email', EmailType::class, [
                'mapped' => true,
                'attr' => ['class' => 'form-control mb-3', 'placeholder' => '(ejemplo: clinicagrtoc@gmail.com)'],
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
                'label' => 'Teléfono',
                'attr' => ['class' => 'form-control mb-3', 'placeholder' => '(ejemplo: 600111222)'],
                'required' => false,
            ])
            ->add('url', TextType::class, [
                'label' => 'URL (sitio web)',
                'attr' => ['class' => 'form-control mb-3', 'placeholder' => '(ejemplo: https://www.clinicagrtoc.com/)'],
                'required' => false,
            ])
            ->add('image', FileType::class, [
                'label' => 'Sube una imagen de la clínica (jpeg, jpg o png)',
                // unmapped means that this field is not associated to any entity property
                'mapped' => false,
                'attr' => ['class' => 'px-1'],
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
            'data_class' => Clinic::class,
        ]);
    }
}
