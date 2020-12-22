import { useRouter } from "next/router";
import React, { ReactElement } from "react";

interface Props {}

function TaskPage({}: Props): ReactElement {
  const Router = useRouter();
  const { query } = Router;
  console.log("🚀 ~ file: [taks].tsx ~ line 9 ~ TaskPage ~ query", query);
  return (
    <div>
      <h1>Here is My New Task with {query.task} </h1>
    </div>
  );
}

export default TaskPage;
