import { useState } from 'react';
import '../../../main.css'
import { FaImage } from 'react-icons/fa';

const ListingImageDiv = ({ image, setImage, uploadImageUrl }) => {
    const [showUpload, setShowUpload] = useState(false);

    const updateImage = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        }
        uploadImageUrl(file);
        setShowUpload(false);
    };

    return (
        <div className='lidMain'>
            <div className={showUpload ? "elmPic tooltipDiv textmark" : "elmPic tooltipDiv textmark cursor-pointer"} onClick={() => setShowUpload(true)}>
                <div>
                    {image ? <img src={image} className="eldImg" alt={'Current image'} /> : <FaImage className="eldImgLogo" />}
                    <span className='tooltipText elmTooltip'>{image ? "Change picture" : "Upload a picture"}</span>
                </div>
            </div>
            {showUpload && <div className='elmFileInput'>
                <input
                    className='textmark'
                    type='file'
                    id='file-upload'
                    name="img_url"
                    onChange={updateImage}
                    accept='.jpg, .jpeg, .png, .gif'
                />

                {/* {!showUpload && (
                    <div className='iubForm'>
                        <img
                            src={previewUrl}
                            alt="preview"
                        />
                        <button>Accept Picture</button>
                    </div>
                )} */}
            </div>}
        </div>
    )
}

export default ListingImageDiv;
