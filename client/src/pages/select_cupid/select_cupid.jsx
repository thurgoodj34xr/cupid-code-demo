import CupidTile from "../../componets/cupid_tile/cupid_tile";
import PhotoCircle from "../../componets/photo_circle/photo_circle";
import useGet from "../../hooks/useGet";
import classes from "./select_cupid.module.css";

function SelectCupid() {
  const { data: cupids, error } = useGet("/cupids/all");

  return (
    <section className={classes.main}>
      <p className="label left">Avaliable cupids</p>
      {cupids &&
        cupids.map((cupid, idx) => {
          return (
            <CupidTile
              key={idx}
              photoCircle={<PhotoCircle url={cupid.photoUrl} size="100px" />}
              name={`${cupid.firstName} ${cupid.lastName}`}
              distance="5 mi"
              link="Hire"
            />
          );
        })}
    </section>
  );
}

export default SelectCupid;
