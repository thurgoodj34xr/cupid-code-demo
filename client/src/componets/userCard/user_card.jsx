// UserCard.jsx
import React from 'react'; // Import React if not already imported
import PhotoCircle from "../../componets/photo_circle/photo_circle";
import classes from "./user_card.module.css";
import TerminateCupid from "../../hooks/terminateCupid";

export default function UserCard({ user, actionPhrase, onActionClick }) {
    const handleActionClick = async () => {
        if (user.role === 'CUPID')
            try {
                await onActionClick(user);
            } catch (error) {
                // Handle errors
                console.error('Error handling action:', error);
            }
    };

    return (
        <div className={`flex row between bg-white p-20 br ycenter ${classes.userCard}`}>
            <div className="flex row g-20">
                <PhotoCircle url={user.photoUrl} />
                <div className="flex col g-10 left">
                    <p>
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="label">Email: {user.email}</p>
                </div>
            </div>
            <p className="pointer" onClick={handleActionClick}>{actionPhrase}</p>
        </div>
    );
}
