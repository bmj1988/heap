import { FaRegWindowClose } from "react-icons/fa"

const PreviewImageModal = ({ pic, close }) => {


    return (
        <div className="previewImageMain">
            <img className="previewImage" src={pic} />
            <div className="previewImageButtonDiv">
                <FaRegWindowClose className="previewImageClose" onClick={() => close()} />
            </div>
        </div>
    )
}
export default PreviewImageModal;
