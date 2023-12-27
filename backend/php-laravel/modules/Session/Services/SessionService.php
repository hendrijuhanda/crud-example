<?php

namespace Modules\Session\Services;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use Modules\Session\Entities\Contract\SessionInterface;
use Modules\Session\Repositories\Contract\SessionRepositoryInterface;
use Modules\Session\Services\Contract\SessionServiceInterface;

class SessionService implements SessionServiceInterface
{
    public string|null $token;
    private SessionRepositoryInterface $sessionRepository;

    public function __construct(SessionRepositoryInterface $sessionRepository)
    {
        $this->token = request()->bearerToken();
        $this->sessionRepository = $sessionRepository;
    }

    public function isTokenExist(): bool
    {
        return (bool) $this->token;
    }

    public function isTokenValid(): bool
    {
        $decrypted = Crypt::decryptString($this->token);

        try {
            $this->sessionRepository->show(json_decode($decrypted, true)['id']);

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function generateToken($callback = null): mixed
    {
        $input = [
            "key" => Str::random(64),
            "user_agent" => request()->userAgent()
        ];

        $stored = $this->sessionRepository->store($input);

        if ($callback) return $callback($stored);

        return $stored;
    }

    public function createTokenBySession(SessionInterface $session): string
    {
        return Crypt::encryptString(json_encode($session));
    }
}
