<?php

namespace App\Exceptions;

use App\Helpers\ResponseFormatHelper;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (Throwable $e) {
            if (Request::wantsJson()) {
                $data = null;
                $status = null;

                if ($e instanceof ValidationException) {
                    $data = $e->errors();
                    $status = $e->status;
                }

                if ($e instanceof HttpException) {
                    $status = $e->getStatusCode();
                }

                if (!$status) {
                    $status = Response::HTTP_INTERNAL_SERVER_ERROR;
                }

                $format = ResponseFormatHelper::error($e->getMessage(), $data);

                return response()->json($format, $status);
            }
        });
    }
}
