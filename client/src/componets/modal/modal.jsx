import classes from "./modal.module.css"
import { FaRegStar, FaStar } from "react-icons/fa";
import { useState } from "react";
import Button from "../button/button"

export default function Modal({ place, closeFunc }) {
    const [favorite, setFavorite] = useState(false);


    const firstCommaIndex = place.formattedAddress.indexOf(',');
    const address = place.formattedAddress.slice(0, firstCommaIndex) + " " + place.formattedAddress.slice(firstCommaIndex + 1).trim();

    const name = place.name;
    const title = place.displayName.text;
    const distance = place.distanceString;

    function handleButton() {

    }

    function handleFavorite() {
        setFavorite((old) => !old)
    }
    return (
        <div className={classes.modal} onClick={closeFunc}>
            <div className={classes.tile}>
                {
                    favorite ? <FaStar className={classes.star} onClick={handleFavorite} /> : <FaRegStar className={classes.star} onClick={handleFavorite} />
                }

                <h3>{title}</h3>
                <div className={classes.border}></div>
                <div className={classes.second}>
                    <p>Address</p>
                    <p>{address}</p>
                </div>
                <div className={classes.second}>
                    <p>Distance</p>
                    <p>{distance}</p>
                </div>
                {
                    !place.nationalPhoneNumber ? '' : <div className={classes.second}>
                        <p>Phone Number</p>
                        <p>{place.nationalPhoneNumber}</p>
                    </div>
                }
                {
                    !place.websiteUri ? '' : <div className={classes.second}>
                        <p>Url</p>
                        <p> <a href={place.websiteUri} target="_blank"> {title}'s website</a></p>
                    </div>
                }

                {
                    !Object.hasOwn(place, 'regularOpeningHours') || !Object.hasOwn(place.regularOpeningHours, 'weekdayDescriptions') ? '' : (
                        place.regularOpeningHours.weekdayDescriptions?.map((weekday, index) => (
                            <div className={classes.second}>
                                <p>{weekday.split(': ')[0]}</p>
                                <p>{weekday.split(': ')[1]}</p>
                            </div>
                        ))
                    )
                }




                <Button text='Close' onClickFunc={closeFunc}></Button>
            </div>
        </div>
    )
}
