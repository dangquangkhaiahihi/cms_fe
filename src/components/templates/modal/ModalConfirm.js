import React from "react";
import { Button, Modal, ModalBody, ModalTitle } from "react-bootstrap";

export default function ModalDetail({isShow, title, handleClose, children}){

    return (
        <Modal show={isShow} onHide={handleClose} size="lg">
            <Modal.Header style={{backgroundColor: "#4169E1"}}>
                <ModalTitle >
                    <h3 style={{color: "white", fontSize: "20px"}}>{title}</h3>
                </ModalTitle>
                <button type="button" aria-label="Close"
                    style={{backgroundColor: "transparent", color: "white", fontSize: "20px", borderStyle: "none"}}
                    onClick={handleClose}>x</button>
            </Modal.Header>
            <ModalBody>
                {children}
            </ModalBody>
            <Modal.Footer className="py-1">
            <Button variant="danger" onClick={() => handleClose(false)}>Đóng</Button>
                <Button variant="primary" onClick={() => handleClose(true)}>Xác nhận</Button>
            </Modal.Footer>
        </Modal>
    )
}