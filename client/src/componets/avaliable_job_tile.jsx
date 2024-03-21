import { Avatar, Button, Card, Group, Stack, Text } from "@mantine/core";
function AvaliableJobTile(job) {
  return (
    <Card shadow="xs" padding="md" className="mb-4" key={idx}>
      <Group justify="space-between">
        {/* Profile PIc */}
        <Group>
          <Avatar src={job.user.photoUrl} size="xl" />
          <Stack className="text-left max-w-lg" gap={0}>
            {/* UserName */}
            <Text size="lg" weight={700} className="mb-2" truncate="end">
              {job.user.firstName} {job.user.lastName}
            </Text>
            {/* Job Name */}
            <Text size="lg" weight={700} className="mb-2" truncate="end">
              {job.name}
            </Text>
            {/* Job Details */}
            <Text size="sm" className="mb-2" truncate="end">
              {job.details}
            </Text>
          </Stack>
        </Group>
        {/* Button */}
        <Button
          size="sm"
          color="blue"
          onClick={async () => await finishMutation(job)}
        >
          Finish
        </Button>
      </Group>
    </Card>
  );
}
export default AvaliableJobTile;
