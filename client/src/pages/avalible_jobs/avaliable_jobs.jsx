import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import AppContext from "../../componets/app_context";
import JobTile from "../../componets/job_tile";
import Api from "../../hooks/api";
import useContext from "../../hooks/context";
import AvaliableJobTile from "../../componets/avaliable_job_tile";
import { useSelector } from "react-redux";
import { getAuth as auth } from "../../store/auth_slice";
import { useApi } from "../../hooks/useApi";

function AvaliableJobs() {
  const queryClient = useQueryClient();
  const socket = useContext().Socket();
  const { user } = useSelector(auth);
  const api = useApi();

  const { data: currentJob } = useQuery({
    queryFn: async () => {
      try {
        return await api.get(`/jobs/current/${user.cupid.id}`);
      } catch (error) {
        console.log(error);
      }
      console.log(resp);
    },
    queryKey: ["currentJob"],
  });

  const { mutateAsync: completeJob } = useMutation({
    mutationFn: async (jobId) => {
      await api.post("/jobs/finish", { id: jobId.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["currentJob"]);
    },
  });
  const { mutateAsync: render } = useMutation({
    mutationFn: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries(["currentJob"]);
    },
  });

  useEffect(() => {
    const callback = () => {
      render();
    };
    socket.on("jobStatus", callback);
    socket.emit("jobStatus");
    return () => {
      socket.off("jobStatus", callback);
    };
  }, []);

  const { data: avaliableJobs } = useQuery({
    queryFn: async () => {
      try {
        return await api.get(`/jobs/avaliable/${user.cupid.id}`);
      } catch (error) {
        console.log(error);
      }
    },
    queryKey: ["avaliableJobs"],
  });

  const { mutateAsync: startJob } = useMutation({
    mutationFn: async (jobId) => {
      await api.post("/jobs/start", { id: jobId.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["currentJob"]);
    },
  });

  return (
    <section className="w-full overflow-y-auto">
      <p className="label text-left">Current jobs</p>
      {currentJob?.map((job) => (
        <JobTile
          key={job.id}
          takeJob={completeJob}
          text="Complete"
          job={job}
        ></JobTile>
      ))}
      <p className="label text-left">Avaliable job</p>
      <div className="flex flex-col gap-6 overflow-y-auto">
        {avaliableJobs?.map((job) => (
          <JobTile
            key={job.id}
            takeJob={startJob}
            text="Start"
            job={job}
          ></JobTile>
        ))}
      </div>
    </section>
  );
}

export default AvaliableJobs;
