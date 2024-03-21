import {
  Button,
  CopyButton,
  Input,
  LoadingOverlay,
  Modal,
  Space,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import AppContext from "../componets/app_context";
import Api from "../hooks/api";

const Jobs = () => {
  const [modal, setModal] = useState();
  const [opened, { open, close }] = useDisclosure(false);
  const [visible, { toggle }] = useDisclosure(false);

  const context = useContext(AppContext);
  const user = context.getUser();
  const form = useForm({
    initialValues: {
      userId: user.id,
      name: "",
      details: "",
      longitude: "",
      latitude: "",
      cupidPayout: "",
      total: "",
    },
    validate: {
      name: (value) => (value.length < 3 ? "Name is too short" : null),
    },
  });
  const handleSubmit = async (values) => {
    const resp = await Api.PostWithAuth("/jobs/create", { ...values }, context);
    console.log(resp);
  };

  useEffect(() => {
    if (modal) {
      toggle();
    }
  }, [modal]);

  return (
    <>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Modal
        className="fixed left-0"
        centered
        opened={opened}
        onClose={close}
        title={modal?.title}
        children={[
          <div className="bg-white">
            {modal?.content && (
              <CopyButton value={modal.content.toString()}>
                {({ copied, copy }) => (
                  <Button color={copied ? "teal" : "blue"} onClick={copy}>
                    {copied ? "Copied content" : "Copy content"}
                  </Button>
                )}
              </CopyButton>
            )}
            <div className="w-full flex flex-col items-center"></div>
            {modal?.content &&
              modal.content.map((line, index) => {
                return (
                  <>
                    <p key={index}>{line}</p>
                    <Space h={15} />
                  </>
                );
              })}
          </div>,
        ]}
      ></Modal>
      <div className="overflow-y-auto w-full">
        <Stack className="w-full" gap="md">
          <h2> Manuel Create Job</h2>
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="flex flex-col gap-3"
          >
            <Input
              name="userId"
              placeholder="User Id"
              required
              {...form.getInputProps("userId")}
            />
            <Input
              name="cupidId"
              placeholder="Cuipd Id"
              required
              {...form.getInputProps("cupidId")}
            />
            <Input
              name="name"
              placeholder="Job Name"
              required
              {...form.getInputProps("name")}
            />
            <Input
              name="details"
              placeholder="Job Details"
              required
              {...form.getInputProps("details")}
            />
            <Input
              name="longitude"
              placeholder="Longitude"
              required
              {...form.getInputProps("longitude")}
            />
            <Input
              name="latitude"
              placeholder="Latitude"
              required
              {...form.getInputProps("latitude")}
            />
            <Input
              name="cupidPayout"
              placeholder="Cupid Payout"
              required
              {...form.getInputProps("cupidPayout")}
            />
            <Input
              name="total"
              placeholder="Total"
              required
              {...form.getInputProps("total")}
            />
            <Button type="submit">Create Job</Button>
          </form>
        </Stack>
      </div>
    </>
  );
};

export default Jobs;
