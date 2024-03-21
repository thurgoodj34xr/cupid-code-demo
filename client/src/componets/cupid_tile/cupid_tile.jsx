import PhotoCircle from "../photo_circle/photo_circle";

function CupidTile({ cupid, link = "Fire", onClick }) {
  return (
    <section className="flex row space between bg-white p-20 br ycenter">
      <div className="flex row ycenter g-20 left">
        {<PhotoCircle url={cupid.user.photoUrl} size="100px" />}
        <div className="flex col">
          <h2>
            {cupid.user.firstName} {cupid.user.lastName}
          </h2>
          <p className="label">5 Mile</p>
        </div>
      </div>
      <div>
        <p className="pointer" onClick={onClick}>
          {link}
        </p>
      </div>
    </section>
  );
}

export default CupidTile;
