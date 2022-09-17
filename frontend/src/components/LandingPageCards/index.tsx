import Image from "next/image";
import classes from "./style.module.css";

const Card = ({ imgSrc, title, desc, onMouseOver, index }) => {
  return (
    <div
      className={`${classes.parent} flex-col gap-1 p-10 bg-theme-black`}
      onMouseOver={()=>onMouseOver(index)}
    >
      <Image
        className={classes.icon}
        src={imgSrc}
        alt={title}
        height="100%"
        width="100%"
        //   layout="fill"
        objectFit="contain"
      />
      <p className="text-white text-lg">{title}</p>
      <p>{desc}</p>
    </div>
  );
};

export default Card;
