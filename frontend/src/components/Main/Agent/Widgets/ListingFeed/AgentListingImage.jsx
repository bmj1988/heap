import { FaImages } from "react-icons/fa";

const AgentListingImage = ({ image, enlarge }) => {



    return (
        <div>
            {
                image ? <div id="pic" onClick={() => enlarge(image)}>
                    < img src={image} />
                </div > : <FaImages className="afsl-image" />
            }
        </div>
    )
}

export default AgentListingImage;
