<?php

namespace App\Configs\Fractal;

use App\Helpers\ResponseFormatHelper;
use League\Fractal\Pagination\PaginatorInterface;
use League\Fractal\Serializer\DataArraySerializer;

class CustomDataArraySerializer extends DataArraySerializer
{
    /**
     * {@inheritDoc}
     */
    public function collection(?string $resourceKey, array $data): array
    {
        return ResponseFormatHelper::success($data);
    }

    /**
     * {@inheritDoc}
     */
    public function item(?string $resourceKey, array $data): array
    {
        return ResponseFormatHelper::success($data);
    }

    /**
     * {@inheritDoc}
     */
    public function null(): ?array
    {
        return ResponseFormatHelper::success([]);
    }

    /**
     * {@inheritDoc}
     */
    public function paginator(PaginatorInterface $paginator): array
    {
        $currentPage = $paginator->getCurrentPage();
        $lastPage = $paginator->getLastPage();

        $pagination = [
            'total' => $paginator->getTotal(),
            'count' => $paginator->getCount(),
            'per_page' => $paginator->getPerPage(),
            'current_page' => $currentPage,
            'total_pages' => $lastPage,
        ];

        return ['pagination' => $pagination];
    }
}
