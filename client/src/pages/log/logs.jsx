import { useEffect, useState } from "react";
import useContext from "../../hooks/context";
import classes from "./logs.module.css";

function Logs() {
  const [logs, setLogs] = useState([]);
  const socket = useContext().Socket();

  useEffect(() => {
    const callback = (log) => {
      setLogs((curr) => curr.concat(log));
    };
    socket.on("log", callback);
    return () => {
      socket.off("log", callback);
    };
  }, []);

  return (
    <section
      className={`${classes.container} flex col g-20 left overflowy bg-white br p-20`}
    >
      {logs &&
        logs.map((log, idx) => {
          return <div key={idx}>{log}</div>;
        })}
    </section>
  );
}

export default Logs;
