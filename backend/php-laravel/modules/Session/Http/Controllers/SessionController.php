<?php

namespace Modules\Session\Http\Controllers;

use App\Helpers\ResponseFormatHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Modules\Session\Services\Contract\SessionServiceInterface;
use Modules\Todo\Repositories\Contract\TodoRepositoryInterface;

class SessionController extends Controller
{
    private SessionServiceInterface $sessionService;
    private TodoRepositoryInterface $todoRepository;

    public function __construct(SessionServiceInterface $sessionService, TodoRepositoryInterface $todoRepository)
    {
        $this->sessionService = $sessionService;
        $this->todoRepository = $todoRepository;
    }

    /**
     * Handle session possibilities.
     * @return JsonResponse
     */
    public function handle(): JsonResponse
    {

        // Token not exist
        if (!$this->sessionService->isTokenExist()) {

            // Generate new one
            $generated = $this->sessionService->generateToken(

                // Callback func; seed db with relation to session
                function ($session) {
                    $json = file_get_contents(base_path('seed.json'));

                    $array = json_decode($json, true);

                    foreach ($array['todos'] as $todo) {
                        $this->todoRepository->store($todo, $session->getID());
                    }

                    return $session;
                }
            );

            $res = [
                'token' => $this->sessionService->createTokenBySession($generated)
            ];

            return response()->json(ResponseFormatHelper::success($res), Response::HTTP_CREATED);
        } 
        
        // If token valid; just response OK
        else if ($this->sessionService->isTokenValid()) {
            return response()->json(ResponseFormatHelper::success(['ok']), Response::HTTP_OK);
        } 
        
        // If not; not acceptable
        else {
            return response()->json(ResponseFormatHelper::error('', ['Invalid token']), Response::HTTP_NOT_ACCEPTABLE);
        }
    }
}
