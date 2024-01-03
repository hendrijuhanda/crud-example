"use client";

import { Todo, useStoreTodo, useTodos } from "@/hooks/todo.hook";
import { publish, subscribe, unsubscribe } from "@/utils/event.util";
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
import { format } from "date-fns";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

interface Input {
  value: string;
  isError: boolean;
  errorMessage: string;
}

const AddTodoComponent = () => {
  const [isFormShown, setIsFormShown] = useState<boolean>(false);

  useEffect(() => {
    const todoCloseFormListener = () => setIsFormShown(false);

    subscribe("todo-close-form", todoCloseFormListener);

    return () => {
      unsubscribe("todo-close-form", todoCloseFormListener);
    };
  }, []);

  return (
    <div className="mb-4">
      {!isFormShown ? (
        <div className="flex justify-end">
          <Button
            size="sm"
            color="primary"
            onPress={() => setIsFormShown(true)}
          >
            <RiAddLine size=".875rem" /> Add New
          </Button>
        </div>
      ) : (
        <div className="pb-4">
          <AddTodoFormComponent />
        </div>
      )}
    </div>
  );
};

const AddTodoFormComponent = () => {
  const { mutateAsync } = useStoreTodo();

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

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setInputs({
        ...inputs,
        title: {
          ...inputs["title"],
          isError: !inputs["title"].value,
          errorMessage: !inputs["title"].value ? "This field is required!" : "",
        },
      });

      if (Object.keys(inputs).some((key) => inputs[key].isError)) return;

      const payload = {
        title: inputs.title.value,
        description: inputs.description.value,
      };

      mutateAsync(payload).then(() => {
        publish("todo-stored");
        publish("todo-close-form");
      });
    },
    [inputs]
  );

  return (
    <Card>
      <CardHeader className="flex justify-between align-middle">
        <div>Add Item</div>

        <Button
          isIconOnly
          variant="light"
          className="text-default-400"
          size="sm"
          onPress={() => publish("todo-close-form")}
        >
          <RiCloseLine size="1rem" />
        </Button>
      </CardHeader>

      <Divider />

      <CardBody>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="mb-4">
            <div className="mb-2">
              <Input
                value={inputs.title.value}
                label="Title"
                size="sm"
                onChange={(event) =>
                  setInputs({
                    ...inputs,
                    title: { ...inputs.title, value: event.target.value },
                  })
                }
                isInvalid={inputs.title.isError}
                errorMessage={inputs.title.errorMessage}
              />
            </div>

            <div>
              <Textarea
                value={inputs.description.value}
                label="Description"
                size="sm"
                onChange={(event) =>
                  setInputs({
                    ...inputs,
                    description: {
                      ...inputs.description,
                      value: event.target.value,
                    },
                  })
                }
                isInvalid={inputs.description.isError}
                errorMessage={inputs.description.errorMessage}
              />
            </div>
          </div>

          <Button type="submit" size="sm" color="primary">
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export const TodoComponent = ({}) => {
  const { data, isFetching, refetch } = useTodos({ page: 1, per_page: 9999 });

  const todos: Todo[] = useMemo(() => {
    return data?.data || [];
  }, [data]);

  useEffect(() => {
    const todoStoredListener = () => refetch();

    subscribe("todo-stored", todoStoredListener);

    return () => {
      unsubscribe("todo-stored", todoStoredListener);
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
          {todos.map((todo, index) => (
            <AccordionItem
              key={index}
              aria-label={`todo-${index + 1}`}
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
