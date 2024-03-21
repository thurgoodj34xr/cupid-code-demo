import { Avatar, Button, Card, Group, Stack, Text } from "@mantine/core";
function JobTile({ job, text, takeJob }) {
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
        <Button onClick={takeJob}>{text}</Button>
      </Group>
    </Card>
  );
}
export default JobTile;
