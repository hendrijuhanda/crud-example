"use client";

import { Todo, useStoreTodo, useTodos } from "@/hooks/todo.hook";
import { publish, subscribe, unsubscribe } from "@/utils/event.util";
import { notification } from "@/utils/notification.util";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { RiAddLine, RiCalendarLine, RiCloseLine } from "@remixicon/react";
import { AxiosError } from "axios";
import { format } from "date-fns";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Input {
  value: string;
  isError: boolean;
  errorMessage: string;
}

interface TodoFormProps {
  mode: "add" | "edit";
  buttonIsLoading: boolean;
}

const TodoFormComponent = (props: TodoFormProps) => {
  const [inputs, setInputs] = useState<Record<string, Input>>({
    title: {
      value: "",
      isError: false,
      errorMessage: "",
    },
    description: {
      value: "",
      isError: false,
      errorMessage: "",
    },
  });

  const handleInputchange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target as
        | HTMLInputElement
        | HTMLTextAreaElement;

      setInputs((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], value },
      }));
    },
    [setInputs]
  );

  const validateForm = useCallback(() => {
    const valid: boolean = Boolean(inputs.title.value);
    const nextState: Record<string, Input> = {
      ...inputs,
      title: {
        ...inputs.title,
        isError: !inputs.title.value,
        errorMessage: !inputs.title.value ? "Title must be filled in!" : "",
      },
    };

    setInputs(nextState);

    return { valid, nextState };
  }, [JSON.stringify(inputs), setInputs]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { valid, nextState } = validateForm();

      if (valid) {
        const payload = {
          title: nextState.title.value,
          description: nextState.description.value,
        };

        publish("todo-form:submit", payload);
      }
    },
    [validateForm]
  );

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="mb-4">
        <div className="mb-2">
          <Input
            value={inputs.title.value}
            label="Title"
            size="sm"
            name="title"
            onChange={handleInputchange}
            isInvalid={inputs.title.isError}
            errorMessage={inputs.title.errorMessage}
          />
        </div>

        <div>
          <Textarea
            value={inputs.description.value}
            label="Description"
            size="sm"
            name="description"
            onChange={handleInputchange}
            isInvalid={inputs.description.isError}
            errorMessage={inputs.description.errorMessage}
          />
        </div>
      </div>

      <Button
        type="submit"
        size="sm"
        color="primary"
        isLoading={props.buttonIsLoading}
      >
        Submit
      </Button>
    </form>
  );
};

const AddTodoComponent = () => {
  const [isFormShown, setIsFormShown] = useState<boolean>(false);

  const { mutateAsync, isPending } = useStoreTodo();

  const handleSubmit = useCallback(
    (data: any) => {
      mutateAsync(data)
        .then(() => {
          setIsFormShown(false);

          notification.success("Item is successfully created!");

          publish("todo:stored");
        })
        .catch((e) => {
          if (e instanceof AxiosError) {
            notification.error(e.message);
          } else {
            notification.error(e);
          }
        });
    },
    [mutateAsync, setIsFormShown]
  );

  useEffect(() => {
    const todoFormSubmitListener = (event: CustomEvent) =>
      handleSubmit(event.detail);

    subscribe("todo-form:submit", todoFormSubmitListener as EventListener);

    return () => {
      unsubscribe("todo-form:submit", todoFormSubmitListener as EventListener);
    };
  }, [handleSubmit]);

  return (
    <div className="mb-2">
      {!isFormShown ? (
        <div className="flex justify-end mb-4">
          <Button
            size="sm"
            color="primary"
            onPress={() => setIsFormShown(true)}
          >
            <RiAddLine size=".875rem" /> Add New
          </Button>
        </div>
      ) : (
        <div>
          <Card>
            <CardHeader className="flex justify-between align-middle">
              <div>Add Item</div>

              <Button
                isIconOnly
                variant="light"
                className="text-default-400"
                size="sm"
                onPress={() => setIsFormShown(false)}
              >
                <RiCloseLine size="1rem" />
              </Button>
            </CardHeader>

            <Divider />

            <CardBody>
              <TodoFormComponent mode="add" buttonIsLoading={isPending} />
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export const TodoComponent = () => {
  const { data, isFetching, refetch } = useTodos({ page: 1, per_page: 9999 });

  const todos: Todo[] = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  const handleTodoStored = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const todoStoredListener = () => handleTodoStored();

    subscribe("todo:stored", todoStoredListener);

    return () => {
      unsubscribe("todo:stored", todoStoredListener);
    };
  }, []);

  return (
    <>
      <AddTodoComponent />

      {!todos.length && isFetching ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : (
        <Accordion
          variant="splitted"
          itemClasses={{
            base: "bg-white",
          }}
          className="px-0"
        >
          {todos.map((todo) => (
            <AccordionItem
              key={todo.id}
              aria-label={`todo-${todo.id}`}
              title={todo.title}
              subtitle={
                <div className="text-xs text-content4">
                  <span className="pr-1">
                    <RiCalendarLine className="inline" size=".75rem" />
                  </span>{" "}
                  {format(todo.created_at, "dd MMM yyyy - HH:mm")}
                </div>
              }
              indicator={({ isOpen }) =>
                !isOpen ? (
                  <RiAddLine />
                ) : (
                  <div className="rotate-45">
                    <RiAddLine />
                  </div>
                )
              }
            >
              {todo.description}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};
