interface CardProps {
  imgData: string | null;
}

const Card = ({imgData}: CardProps) => {
  return (
    <div>{imgData}</div>
  )
}

export default Card