<?php

namespace App\Form;

use App\Entity\Event;
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
                'label' => 'Título *',
                'attr' => ['class' => 'form-control mb-3',  'autofocus' => true, 'placeholder' => '(ejemplo: Reunión y charla)'],
                'mapped' => true,
            ])
            ->add('text', TextType::class, [
                'label' => 'Texto *',
                'attr' => ['class' => 'form-control mb-3', 'placeholder' => '(ejemplo: Os invitamos a compartir...)'],
                'mapped' => true,
            ])
            ->add('date', null, [
                'label' => 'Fecha *',
                'widget' => 'single_text',
                'attr' => ['class' => 'form-control mb-3'],
                'mapped' => true,
            ])
            ->add('location', TextType::class, [
                'label' => 'Localización',
                'attr' => ['class' => 'form-control mb-3', 'placeholder' => '(ejemplo: Facultad de Psicología, Granada)'],
                'mapped' => true,
                'required' => false
            ])
            ->add('price', IntegerType::class, [
                'label' => 'Precio (en €)',
                'attr' => ['class' => 'form-control mb-3', 'placeholder' => '(ejemplo: 10)'],
                'mapped' => true,
                'required' => false,
            ])
            ->add('image', FileType::class, [
                'label' => 'Sube una imagen del evento (jpeg, jpg o png)',
                // unmapped means that this field is not associated to any entity property
                'mapped' => false,
                'attr' => ['class' => 'px-1 mb-4'],
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
            'data_class' => Event::class,
        ]);
    }
}
