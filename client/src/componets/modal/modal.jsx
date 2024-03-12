import classes from "./modal.module.css";
import { FaDiscourse, FaDoorClosed, FaRegStar, FaStar } from "react-icons/fa";
import { useState } from "react";
import Button from "../button/button";
import PhotoCircle from "../photo_circle/photo_circle";

export default function Modal({ log, closeFunc }) {
  return (
    <div className={`${classes.modal} flex centerx centery`}>
      <div
        className="bg-white w-fit p-20 br flex col g-20"
        style={{ width: "350px" }}
      >
        <PhotoCircle url={log.user.photoUrl} />
        {/* Name */}
        <div className="flex row between">
          <p>Name</p>
          <p>
            {log.user.firstName} {log.user.lastName}
          </p>
        </div>
        {/* Email */}
        <div className="flex row between">
          <p>Email</p>
          <p>{log.user.email}</p>
        </div>
        {/* FileName */}
        <div className="flex row between">
          <p>Filename</p>
          <p>{log.file}</p>
        </div>
        {/* Error Type */}
        <div className="flex row between">
          <p>Type</p>
          <p>{log.type}</p>
        </div>
        <hr />
        <div>
          <p className="left">{log.message}</p>
        </div>
        <Button text="Close" onClickFunc={closeFunc} />
      </div>
    </div>
  );
}
