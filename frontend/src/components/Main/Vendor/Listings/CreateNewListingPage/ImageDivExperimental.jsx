import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../../../../../context/Modal";
import '../../../main.css'
import PreviewImageModal from "../../../../Modals/PreviewImageModal";
import { FaTimes } from "react-icons/fa";

const NewListingFormImageDiv = ({ images, setImages, previewImages, setPreviewImages, deletedImages, setDeletedImages, originalImages }) => {
    const [showUpload, setShowUpload] = useState(true);
    const { closeModal, setModalContent } = useModal();

    useEffect(() => {
        images.length > 2 ? setShowUpload(false) : setShowUpload(true)
    }, [images, setShowUpload])

    const updateImage = async (e) => {
        e.preventDefault();
        if (e.target.files.length > 3) {
            alert('You may only upload 3 files per listing')
            e.target.value = []
        }
        else {
            const files = Object.values(e.target.files)
            if (files.length + previewImages.length > 3) {
                e.target.value = null
                return alert('You may only upload 3 files per listing')}

            let fileArray = []
            for (let file of files) {
                fileArray.push(URL.createObjectURL(file))
            }
            setPreviewImages(fileArray.concat(previewImages))
            setImages(files);
        }
    };

    const deleteAllPictures = (e) => {
        e.preventDefault();
        setPreviewImages([])
        setImages([])
    }

    const deleteImage = (e, index) => {
        e.preventDefault();
        if (setDeletedImages && originalImages.includes(previewImages[index])) {
            setDeletedImages(deletedImages.concat([previewImages[index]]))
        }
        if (index === 0) {
            setPreviewImages(previewImages.slice(1))
            setImages(images.slice(1))
        }
        else {
            setPreviewImages([...previewImages.slice(0, index), ...previewImages.slice(index + 1)])
            setImages([...images.slice(0, index), ...images.slice(index + 1)])
        }
    }

    const preview = (e, index) => {
        e.preventDefault();
        setModalContent(<PreviewImageModal pic={previewImages[index]} close={closeModal} />)
    }

    return (
        <div className="ideMain">
            <div className="ideTextDiv textmark">
                <p className="boldFont">Images:</p>
                <div style={{ display: 'flex' }}>
                    {previewImages.length > 0 && previewImages.map((previewImage) => {
                        const idx = previewImages.indexOf(previewImage)
                        return (<div className="generatedIde" key={idx}>
                            <Link className="previewImageLink" onClick={(e) => preview(e, idx)}>{`Image ${idx + 1}`}</Link>
                            <FaTimes className="ideDelete cursor-pointer" onClick={(e) => deleteImage(e, idx)} />
                        </div>)
                    })}
                </div>
            </div>
            {showUpload && <div className='elmFileInput'>
                <input
                    className='textmark'
                    type='file'
                    id='file-upload'
                    multiple
                    name="img_url"
                    onChange={updateImage}
                    accept='.jpg, .jpeg, .png, .gif'
                />
            </div>}
            {!showUpload && <div className="ideExplainer">
                <p>Listings are limited to 3 pictures</p>
                <button className="ideDeleteAll textmark" onClick={(e) => deleteAllPictures(e)}>Delete all pictures</button>
            </div>}
        </div>
    )
}

export default NewListingFormImageDiv;
