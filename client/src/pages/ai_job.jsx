import { LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";
import AppContext from "../componets/app_context";
import ProgressBar from "../componets/stepper";

const AiJob = () => {
  const [visible, { toggle }] = useDisclosure(false);

  const context = useContext(AppContext);
  const user = context.getUser();

  return (
    <>
      <ProgressBar loading={toggle} />
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </>
  );
};

export default AiJob;
