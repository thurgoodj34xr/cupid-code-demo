import { Avatar, Button, Card, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
function JobTile({ job, text, takeJob }) {
  console.log(job);
  const [opened, { open, close }] = useDisclosure(false);
  /*
    job.user.photoUrl
    job.pictureUrl
    job.user.firstName
    job.user.lastName
    job.name
    job.details
    job.total
    job.payout

  */
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Details"
        className="absolute left-0 bottom-0 top-0"
      >
        <Stack direction="column" align="center" spacing="md">
          <Avatar
            src={job.user.photoUrl}
            radius="xl"
            alt={`${job.user.firstName} ${job.user.lastName}`}
            className="flex-none"
            size={"70px"}
          />
          <div className="flex flex-row w-full between max-w-64">
            <Text size="xl" weight={700}>
              User
            </Text>
            <Text size="xl" weight={700}>
              {job.user.firstName} {job.user.lastName}
            </Text>
          </div>
          <div className="flex flex-row w-full between max-w-64">
            <Text size="xl" weight={700}>
              Location
            </Text>
            <Text size="xl" weight={700}>
              {job.name}
            </Text>
          </div>
          <div className="flex flex-row w-full between max-w-64">
            <Text size="xl" weight={700}>
              Payout
            </Text>
            <Text size="xl" weight={700}>
              ${job.cupidPayout}
            </Text>
          </div>
          <Text size="xl" weight={700} className="max-w-64 text-center">
            {job.details}
          </Text>
        </Stack>
      </Modal>
      <Card shadow="xs" padding="md" radius="md" margin="md">
        <Group direction="row" align="center" spacing="md" className="flex">
          <Avatar
            src={job.user.photoUrl}
            radius="xl"
            alt={`${job.user.firstName} ${job.user.lastName}`}
            className="flex-none"
            size={"70px"}
          />
          <Stack
            direction="column"
            align="left"
            spacing=""
            className="text-left w-1/4 flex-1"
            style={{ gap: "0px !important" }}
          >
            <Text size="xl" weight={700}>
              {job.user.firstName} {job.user.lastName}
            </Text>
            <Text size="xl" weight={700} truncate="end">
              {job.details}
            </Text>
          </Stack>
          <Stack direction="column" align="left" className="text-left p-7">
            <Text size="xl" weight={700} truncate="end">
              ${job.cupidPayout}
            </Text>
          </Stack>
          <Stack>
            <Button onClick={open}>View </Button>
            <Button onClick={() => takeJob(job)}>{text}</Button>
          </Stack>
        </Group>
      </Card>
    </>
  );
}
export default JobTile;
