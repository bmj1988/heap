import { useNavigate } from "react-router-dom"

const ShopDiv = ({ shop }) => {
    const navigate = useNavigate();

    // const clicker = () => {
    //     navigate(`/shops/${shop.id}`)
    // }

    return (
        <div>
            <fieldset>
                <legend>
                    {shop.name ? `${shop.name}` : `${shop.address}, ${shop.city},  ${shop.state}`}
                </legend>
                <div>
                    {shop.phone ? <p>{`Phone: ${shop.phone}`}</p> : null}
                    <p>{`Rating: ${shop.avgRating}`}</p>
                    <p>{`Open listings: ${shop.Listings.length}`}</p>
                </div>

            </fieldset>
        </div>
    )
}

export default ShopDiv
