import { Input, Stack } from "@mantine/core";
import { useContext } from "react";
import AppContext from "../componets/app_context";

const Jobs = () => {
  const context = useContext(AppContext);
  const user = context.getUser();
  return (
    <Stack>
      <h2>Create Job</h2>
      <Input placeholder="Job Name" />
    </Stack>
  );
};
export default Jobs;
