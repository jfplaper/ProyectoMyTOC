<?php

namespace App\Form;

use App\Entity\Event;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class EventType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'attr' => ['class' => 'form-control',  'autofocus' => true],
                'mapped' => true,
            ])
            ->add('text', TextType::class, [
                'attr' => ['class' => 'form-control mb-3'],
                'mapped' => true,
            ])
            ->add('date', null, [
                'widget' => 'single_text',
                'attr' => ['class' => 'form-control'],
                'mapped' => true,
            ])
            ->add('location', TextType::class, [
                'attr' => ['class' => 'form-control'],
                'mapped' => true,
            ])
            ->add('price', IntegerType::class, [
                'attr' => ['class' => 'form-control mb-3'],
                'mapped' => true,
                'required' => false,
            ])
            ->add('image', FileType::class, [
                'label' => 'Sube una imagen del evento (jpeg, jpg o png)',
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
            ->add('creator', EntityType::class, [
                'class' => User::class,
                'choice_label' => 'username',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Event::class,
        ]);
    }
}
