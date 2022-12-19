import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {


    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>削除確認</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.dataModalDelete.username} を削除しますか ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        閉じる
                    </Button>
                    <Button variant="primary" onClick={props.confirmDeleteUser}>
                        削除
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDelete;