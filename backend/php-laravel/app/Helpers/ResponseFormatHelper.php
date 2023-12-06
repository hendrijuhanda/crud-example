<?php

namespace App\Helpers;

class ResponseFormatHelper
{
    /**
     *
     */
    private static function base(string $message, mixed $data = null): array
    {
        $request = request();

        return [
            'service' => $request->route()?->getName(),
            'message' => $message,
            'data' => $data
        ];
    }

    /**
     *
     */
    public static function success(mixed $data = null): array
    {
        $base = self::base('', $data);

        return [
            'status' => true,
            'service' => $base['service'],
            'data' => $base['data']
        ];
    }

    /**
     *
     */
    public static function error(string $message, mixed $data = null): array
    {
        $base = self::base($message, $data);

        return [
            'status' => false,
            'service' => $base['service'],
            'message' => $base['message'],
            'data' => $base['data']
        ];
    }
}
