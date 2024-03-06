import ShopDiv from "./SingleShop"

const ShopsWidget = (shops) => {
    return (
        <div>
            {shops.map((shop) => {
                return (<ShopDiv shop={shop} />)
            })}
        </div>
    )
}

export default ShopsWidget;
