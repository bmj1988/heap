import { FaImage } from "react-icons/fa";
import { useModal } from "../../../context/Modal";
import PreviewImageModal from "../../Modals/PreviewImageModal";
import '../listing.css'

const ListingPageImageDiv = ({ images, noEnhance }) => {
    const { setModalContent, closeModal } = useModal();
    const preview = (url) => {
        if (noEnhance) return
        setModalContent(<PreviewImageModal pic={url} close={closeModal} />)
    }

    return (
        <div className="elmPic">
            {images && images.length > 0 ? <img src={images[0]['url']} className={noEnhance ? "eldImg" : "eldImg cursor-pointer"} onClick={() => preview(images[0]['url'])} alt={'Current image'} /> : <FaImage className="defaultImg" />}
            <div className="slpDetails">
                {images && images.length > 1 && images.map((otherImage) => {
                    if (images.indexOf(otherImage) === 0) return
                    return (<img src={otherImage.url} key={otherImage.url} onClick={() => preview(otherImage.url)} className={noEnhance ? "smallerImage" : "smallerImage cursor-pointer"} alt={'Extra images'} />)
                })}
            </div>
        </div>
    )
}

export default ListingPageImageDiv;
