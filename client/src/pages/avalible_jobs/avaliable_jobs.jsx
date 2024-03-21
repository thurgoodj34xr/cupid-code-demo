import { useContext, useEffect, useState } from "react";
import { Avatar, Button, Card, Group, Stack, Text } from "@mantine/core";
import useGet from "../../hooks/useGet";
import AppContext from "../../componets/app_context";
import Api from "../../hooks/api";

function AvaliableJobs() {
  const context = useContext(AppContext);
  const user = context.getUser();
  const { data: jobs } = useGet(`/jobs/cupidJobs/${user.cupid?.id}`, context);
  const [updatedJobs, setUpdatedJobs] = useState();
  useEffect(() => {
    const get = async () => {
      const updatedUsers = await Promise.all(
        jobs.map(async (job) => {
          const { user } = await Api.GetWithAuth(
            `/users/${job.userId}`,
            context
          );
          return {
            ...job,
            user,
          };
        })
      );
      setUpdatedJobs(updatedUsers);
    };

    if (jobs) {
      get();
    }
  }, [jobs]);

  return (
    <section className="w-full">
      {updatedJobs?.map((job) => (
        <Card shadow="xs" padding="md" className="mb-4" key={job.id}>
          <Group justify="space-between" align="center">
            <Group>
              <Avatar src={job.user.photoUrl} size="xl" />
              <Stack className="text-left" gap={0}>
                <Text size="lg" weight={700} className="mb-2">
                  {job.user.firstName} {job.user.lastName}
                </Text>
                <Text size="lg" weight={700} className="mb-2">
                  {job.name}
                </Text>
                <Text size="sm" className="mb-2">
                  {job.details}
                </Text>
              </Stack>
            </Group>
            <Button size="sm" color="blue">
              Take Job
            </Button>
          </Group>
        </Card>
      ))}
    </section>
  );
}

export default AvaliableJobs;
