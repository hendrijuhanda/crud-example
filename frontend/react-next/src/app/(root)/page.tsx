"use client";

import { TodoComponent } from "./components/todo.component";
import ScreenWrapperComponent from "@/components/screen-wrapper.component";

export default function Page() {
  return (
    <div>
      <ScreenWrapperComponent>
        <TodoComponent />
      </ScreenWrapperComponent>
    </div>
  );
}
