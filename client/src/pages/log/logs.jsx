import { useEffect, useState } from "react";
import useContext from "../../hooks/context";
import classes from "./logs.module.css";
import PhotoCircle from "../../componets/photo_circle/photo_circle";
import Modal from "../../componets/modal/modal";

function Logs() {
  const [logs, setLogs] = useState([]);
  const socket = useContext().Socket();
  const [modal, setModal] = useState();
  const [connected, setConnected] = useState([]);

  useEffect(() => {
    console.log(logs);
  }, [logs]);

  useEffect(() => {
    const callback = (log) => {
      setLogs((curr) => curr.concat(log));
    };
    socket.on("log", callback);
    return () => {
      socket.off("log", callback);
    };
  }, []);

  useEffect(() => {
    const callback = (ct) => {
      setConnected(ct);
    };
    socket.on("count", callback);
    socket.emit("getCount");
    return () => {
      socket.off("count", callback);
    };
  }, []);

  return (
    <>
      {modal && (
        <Modal
          log={modal}
          closeFunc={() => {
            setModal(null);
          }}
        />
      )}
      <p className="label">Currently Connected Users: {connected.length}</p>
      <div className="flex row g-20 w-100 overflowx">
        {connected.map((u) => {
          return (
            <div className="bg-white br p-20">
              {u.firstName} {u.lastName}
            </div>
          );
        })}
      </div>
      <section
        className={`${classes.container} flex col g-20 left overflowy p-20 w-100`}
      >
        {logs &&
          logs.map((log, idx) => {
            return (
              <>
                <div
                  key={idx}
                  className="flex row g-20 ycenter bg-white p-20 br between"
                >
                  <div className="flex row g-10 ycenter">
                    {log.user && (
                      <>
                        <PhotoCircle url={log.user.photoUrl} size="60px" />
                        <p>
                          {log.user.firstName} {log.user.lastName}
                        </p>
                      </>
                    )}
                    <p
                      className={`${classes.message} ${
                        log.type == "error" ? "red" : ""
                      }`}
                    >
                      {log.message}
                    </p>
                  </div>
                  <div>
                    <p className="pointer" onClick={() => setModal(log)}>
                      view
                    </p>
                  </div>
                </div>
              </>
            );
          })}
      </section>
    </>
  );
}

export default Logs;
