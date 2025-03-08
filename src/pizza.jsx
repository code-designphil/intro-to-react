export default function Pizza(props) {
    const { name, ingredients, price } = props;
    return (
        <div className="pizza" >
            <h2>{name}</h2>
            <p>{ingredients}</p>
            <p>{price}</p>
        </div>
    );
}