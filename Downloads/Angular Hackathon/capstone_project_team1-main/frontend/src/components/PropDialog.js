import { Button, Modal } from "react-bootstrap";

export function PropDialog(props) {
    const { show, handleClose, handleDo, message } = props;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleDo}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}