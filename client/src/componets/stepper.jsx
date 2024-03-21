import { Button, Modal, Select, Stack, Stepper, Textarea } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import useAI from "../hooks/useAI";
import useGet from "../hooks/useGet";
import AppContext from "./app_context";
import Api from "../hooks/api";
import { useDisclosure } from "@mantine/hooks";

function ProgressBar({ loading }) {
  const { data: cupids } = useGet("/cupids/all");
  let cupidData = cupids?.map(
    (cupid) => cupid.cupid.id + " " + cupid.firstName + " " + cupid.lastName
  );
  const [searchValue, setSearchValue] = useState(null);
  const context = useContext(AppContext);
  const { createJob, script } = useAI();
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const [load, setLoad] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [job, setJob] = useState("");
  const [error, setError] = useState(null);
  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const AiCreateScript = async () => {
    setLoad({});
    const resp = await script(query);
    const lines = resp.split("\n");
    setTranscript(resp);
    nextStep();
    setLoad({});
  };

  const AiCreateJob = async () => {
    setLoad({});

    const resp = await createJob(transcript);
    setJob(resp);
    nextStep();
    setLoad({});
  };

  const handleSubmit = async () => {
    if (!searchValue) {
      setError("Please select a cupid");
      return;
    }
    const values = JSON.parse(job);
    const cupidId = parseInt(searchValue.split(" ")[0]);
    await Api.PostWithAuth(
      "/jobs/create",
      {
        ...values,
        userId: context.getUser().id,
        cupidId,
      },
      context
    );
    nextStep();
  };

  useEffect(() => {
    if (load) {
      loading();
    }
  }, [load]);

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="First step" description="Generate transcript">
          <Textarea
            name="description"
            placeholder="Enter Date Description"
            rows={2}
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
          <Button onClick={AiCreateScript}>Generate Transcript</Button>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Generate Job">
          {transcript && (
            <>
              <Textarea
                name="transcript"
                autosize
                placeholder="Enter transcript"
                value={transcript}
                onChange={(event) => setTranscript(event.currentTarget.value)}
              />
              <Button onClick={AiCreateJob}>Generate Job</Button>
            </>
          )}
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Publish to DB">
          {job && (
            <Stack gap="md">
              {error && <p className="text-red-500">{error}</p>}
              <Select
                placeholder="select"
                label="Select Cupid"
                data={cupidData}
                onSearchChange={setSearchValue}
              />
              <Textarea
                autosize
                name="transcript"
                placeholder="Enter transcript"
                value={job}
                onChange={(event) => setJob(event.currentTarget.value)}
              />
              <Button onClick={handleSubmit}>Publish to DB</Button>
            </Stack>
          )}
        </Stepper.Step>
        <Stepper.Completed>
          <p>Sucessfully Created the Job!!!</p>
        </Stepper.Completed>
      </Stepper>
    </>
  );
}

export default ProgressBar;
