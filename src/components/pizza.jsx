export default function Pizza(props) {
  const { name, description, imageSrc } = props;

  return (
    <div className="pizza">
      <h2>{name}</h2>
      <p>{description}</p>
      <img src={imageSrc ?? "https://picsum.photos/200"} alt="" />
    </div>
  );
}
