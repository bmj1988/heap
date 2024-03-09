import ShopDiv from "./SingleShop"

const ShopsWidget = ({shops}) => {
    return (
        <div>
            {shops.map((shop) => {
                return (<ShopDiv shop={shop} key={shop.id}/>)
            })}
        </div>
    )
}

export default ShopsWidget;
