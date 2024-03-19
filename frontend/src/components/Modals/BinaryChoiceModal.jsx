import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useModal } from "../../context/Modal";

const BinaryChoiceModal = ({ text, topic, component, confirmFunc, goBackFunc, dontClose }) => {
    const { closeModal } = useModal();

    const confirm = () => {
        if (confirmFunc) confirmFunc();
        closeModal();
    }

    return (
        <div className="bcmMain textmark">
            {topic ? <h2>{topic}</h2> : null}
            {text ? <p>{text}</p> : null}
            {component}
            <div>
                <button onClick={() => closeModal()}><FaAngleDoubleLeft className="bcmGoBack" /></button>
                <button onClick={() => confirm()}><FaAngleDoubleRight className="bcmSubmit" /></button>
            </div>
        </div>
    )
}

export default BinaryChoiceModal;
