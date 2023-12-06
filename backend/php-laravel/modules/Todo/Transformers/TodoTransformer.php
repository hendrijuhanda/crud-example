<?php

namespace Modules\Todo\Transformers;

use League\Fractal\TransformerAbstract;
use Modules\Todo\Entities\Contract\TodoInterface;

class TodoTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected array $defaultIncludes = [
        //
    ];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected array $availableIncludes = [
        //
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(TodoInterface $item)
    {
        return [
            'id' => $item->getId(),
            'title' => $item->getTitle(),
            'description' => $item->getDescription(),
            'created_at' => $item->getCreatedAt()->toISOString(),
            'updated_at' => $item->getUpdatedAt()->toISOString()
        ];
    }
}
