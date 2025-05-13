<?php

namespace App\Form;

use App\Entity\Comment;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CommentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('text', TextType::class, [
                'label' => 'Texto *',
                'attr' => ['class' => 'form-control mb-3', 'autofocus' => true, 'placeholder' => '(ejemplo: Pues ayer...)'],
                'mapped' => true,
            ])
            ->add('date', null, [
                'label' => 'Fecha *',
                'widget' => 'single_text',
                'attr' => ['class' => 'form-control mb-3'],
                'mapped' => true,
            ])
            ->add('visible', CheckboxType::class, [
                'label' => 'Visible',
                'attr' => ['class' => 'mx-1 mb-4'],
                'required' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Comment::class,
        ]);
    }
}
