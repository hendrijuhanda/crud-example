<?php

namespace Modules\Todo\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Modules\Todo\Http\Requests\TodoStoreRequest;
use Modules\Todo\Http\Requests\TodoUpdateRequest;
use Modules\Todo\Repositories\Contract\TodoRepositoryInterface;
use Modules\Todo\Transformers\TodoTransformer;

class TodoController extends Controller
{
    private TodoRepositoryInterface $todoRepository;

    public function __construct(TodoRepositoryInterface $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }

    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $data = fractal($this->todoRepository->paginated(), TodoTransformer::class);

        return response()->json($data, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     * @param TodoStoreRequest $request
     * @return JsonResponse
     */
    public function store(TodoStoreRequest $request): JsonResponse
    {
        $data = fractal($this->todoRepository->store($request->all()), TodoTransformer::class);

        return response()->json($data, Response::HTTP_CREATED);
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $data = fractal($this->todoRepository->show($id), TodoTransformer::class);

        return response()->json($data, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     * @param TodoUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(TodoUpdateRequest $request, $id): JsonResponse
    {
        $data = fractal($this->todoRepository->update($request->all(), $id), TodoTransformer::class);

        return response()->json($data, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        return response()->json(['deleted' => $this->todoRepository->delete($id)], Response::HTTP_OK);
    }
}
