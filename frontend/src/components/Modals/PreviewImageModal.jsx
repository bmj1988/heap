const PreviewImageModal = ({ pic, close }) => {


    return (
        <div className="previewImageMain">
            <img className="previewImage" src={pic} />
        </div>
    )
}
export default PreviewImageModal;
