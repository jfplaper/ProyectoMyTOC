<?php

namespace App\Form;

use App\Entity\Toc;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class TocType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Nombre *',
                'attr' => ['class' => 'form-control mb-3',  'autofocus' => true, 'placeholder' => '(ejemplo: Limpieza)'],
                'mapped' => true,
            ])
            ->add('description', TextType::class, [
                'label' => 'Descripción *',
                'attr' => ['class' => 'form-control mb-3', 'placeholder' => '(ejemplo: Este TOC consiste en...)'],
                'mapped' => true,
            ])
            ->add('image', FileType::class, [
                'label' => 'Sube una imagen del TOC (jpeg, jpg o png)',
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
            'data_class' => Toc::class,
        ]);
    }
}
