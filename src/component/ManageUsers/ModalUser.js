import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroups } from '../../service/ApiService';
import { toast } from 'react-toastify';

const ModalUser = (props) => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [sex, setSex] = useState('');
    const [group, setGroup] = useState('');

    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = async () => {
        let response = await fetchGroups();
        if (response && response.EC === 0) {
            setUserGroups(response.DT);
        } else {
            toast.error(response.EM);
        }
    };

    return (
        <>
            <Modal className='modal-user' size="lg" show={true}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.title}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>メール(<span className='red'>*</span>):</label>
                            <input className='form-control' type='email' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>電話番号(<span className='red'>*</span>):</label>
                            <input className='form-control' type='text' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>ユーザー名 :</label>
                            <input className='form-control' type='text' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>パスワード(<span className='red'>*</span>) :</label>
                            <input className='form-control' type='password' />
                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>住所 :</label>
                            <input className='form-control' type='text' />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>性別 :</label>
                            <select className='form-select'>
                                <option defaultValue='男'>男</option>
                                <option value='女'>女</option>
                                <option value='その他'>その他</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>グループ :(<span className='red'>*</span>) :</label>
                            <select className='form-select'>
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" onClick={props.confirmDeleteUser}>
                        保存
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;