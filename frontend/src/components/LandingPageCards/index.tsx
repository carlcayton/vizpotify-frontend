import Image from "next/image";
import classes from "./style.module.css";

const Card = ({ imgSrc, title, desc, onMouseOver, index }) => {
  return (
    <div
      className={`${classes.parent} flex flex-col flex-[1_1_0%] items-start gap-3 relative p-6 bg-theme-black rounded-2xl hover:shadow-lg transition ease-in-out hover:-translate-y-2 `}
      onMouseOver={() => onMouseOver(index)}
    >
      <Image
        className={`${classes.icon}`}
        src={imgSrc}
        alt={title}
        // height="50%"
        // width="50%"
        height={title === "Share" ? "50%" : "50%"}
        width={title === "Share" ? "40%" : "50%"}
        
        objectFit="contain"
      />
      <p className="text-white text-lg font-semibold">{title}</p>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  );
};

export default Card;
