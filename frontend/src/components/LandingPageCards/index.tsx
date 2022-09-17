import Image from "next/image"

const Card = ({imgSrc, title,desc})=>{
   return(
      <div className="flex flex-row">
         <Image
         src={imgSrc}
         alt={title}
         />
         <p>{title}</p>
         <p>{desc}</p>
      </div>
   )
}

export default Card