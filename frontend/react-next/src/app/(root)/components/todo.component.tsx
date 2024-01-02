"use client";

import { Todo, useTodos } from "@/hooks/todo.hook";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { RiAddLine, RiCalendarLine, RiCloseLine } from "@remixicon/react";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

const AddTodoComponent = () => {
  const [isFormShown, setIsFormShown] = useState(false);

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
          <AddTodoFormComponent setIsFormShown={setIsFormShown} />
        </div>
      )}
    </div>
  );
};

const AddTodoFormComponent = ({
  setIsFormShown,
}: {
  setIsFormShown: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
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
        <form>
          <div className="mb-4">
            <div className="mb-2">
              <Input label="Title" size="sm" />
            </div>

            <div>
              <Textarea label="Description" size="sm" />
            </div>
          </div>

          <Button size="sm" color="primary">
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export const TodoComponent = ({}) => {
  const { data, isFetching } = useTodos({ page: 1, per_page: 5 });

  const todos: Todo[] = useMemo(() => {
    return data?.data || [];
  }, [data]);

  return (
    <>
      <AddTodoComponent />

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
    </>
  );
};
