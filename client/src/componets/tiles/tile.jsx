import { useState } from "react";
import classes from "./tile.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import Button from "../button/button";
import Modal from "../modal/modal";
import { collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from '../../config/firebase-config';
import { globalID } from "../../App";
import { getAuth } from "firebase/auth";

export default function Tile({ place, select = false, tileId, onDelete }) {
    const [favorite, setFavorite] = useState(select);
    const [modal, setModal] = useState(false)

    const firstCommaIndex = place.formattedAddress.indexOf(',');
    const address = place.formattedAddress.slice(0, firstCommaIndex) + " " + place.formattedAddress.slice(firstCommaIndex + 1).trim();

    const name = place.name;
    const title = place.displayName.text;
    const distance = place.distanceString;
    function handleButton() {
        setModal(true)
    }

    async function handleFavorite() {
        try {
            const docRef = await addDoc(collection(db, "favorites"), {
                user_id: getAuth().currentUser.uid,
                place: place,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setFavorite((old) => !old)
    }

    async function unhandleFavorite() {
        const docRef = doc(db, 'favorites', tileId)
        deleteDoc(docRef).then(onDelete(tileId)).catch(e => {

        })
    }
    return (
        <>
            {modal ? <Modal place={place} closeFunc={() => setModal(false)}></Modal> : ''}
            <div className={classes.tile}>
                {
                    favorite ? <FaStar className={classes.star} onClick={unhandleFavorite} /> : <FaRegStar className={classes.star} onClick={handleFavorite} />
                }

                <h3>{title}</h3>
                <div className={classes.border}></div>
                <div className={classes.second}>
                    <p>{address}</p>
                    <p>{distance}</p>
                </div>
                <Button text='More Details' onClickFunc={handleButton}></Button>
            </div>
        </>
    );
}