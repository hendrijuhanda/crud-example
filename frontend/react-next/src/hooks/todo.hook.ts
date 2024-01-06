import { apiClient } from "@/utils/api.util";
import { queryTransformer } from "@/utils/query.util";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useCallback } from "react";

export interface Todo {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const fetchTodos = (params: any) => apiClient.get("todo", { params });

const fetchTodoById = (id: number) => apiClient.get(`todo/${id}`);

const storeTodo = (payload: any) => apiClient.post("todo", payload);

const updateTodo = (payload: any) => apiClient.put("todo", payload);

const deleteTodo = (id: number) => apiClient.delete(`todo/${id}`);

export const useTodos = (params: any) =>
  useQuery({
    queryKey: ["todos", params],
    queryFn: () => fetchTodos(params),
    select: useCallback((data: AxiosResponse) => queryTransformer(data), []),
  });

export const useTodoById = (id: number) =>
  useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodoById(id),
    select: useCallback((data: AxiosResponse) => queryTransformer(data), []),
  });

export const useStoreTodo = () =>
  useMutation({
    mutationKey: ["todo", "store"],
    mutationFn: (payload: any) => storeTodo(payload),
  });

export const useUpdateTodo = (payload: any) =>
  useQuery({
    queryKey: ["todo", "update", payload],
    queryFn: () => updateTodo(payload),
    select: useCallback((data: AxiosResponse) => queryTransformer(data), []),
  });

export const useDeleteTodo = (id: number) =>
  useQuery({
    queryKey: ["todo", "delete", id],
    queryFn: () => deleteTodo(id),
    select: useCallback((data: AxiosResponse) => queryTransformer(data), []),
  });
