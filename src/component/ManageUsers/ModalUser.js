import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroups, createNewUser, updateCurrentUser } from '../../service/ApiService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {

    const { action, dataModalCreateUpdate } = props;
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    };
    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    };
    const [userData, setUserData] = useState(defaultUserData);
    const [vailidInputs, setValidInputs] = useState(validInputsDefault);

    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, []);

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalCreateUpdate, group: dataModalCreateUpdate.Group ? dataModalCreateUpdate.Group.id : '' });
        }
    }, [dataModalCreateUpdate]);

    useEffect(() => {           // add user lan 2 bi loi truong group rong~
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id });
            }

        }
    }, [action]);

    const getGroups = async () => {
        let response = await fetchGroups();
        if (response && response.EC === 0) {
            setUserGroups(response.DT);
            if (response.DT && response.DT.length > 0) {
                let groups = response.DT;
                setUserData({ ...userData, group: groups[0].id });
            }
        } else {
            toast.error(response.EM);
        }
    };

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData); //copy lai toan bo cac state cua useRdATA
        _userData[name] = value;
        setUserData(_userData);
    };

    const checkValidateInputs = () => {
        if (action === 'UPDATE') {
            return true;
        }
        setValidInputs(validInputsDefault);
        let arr = ['email', 'phone', 'username', 'password', 'group'];
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);
                toast.error(`${arr[i]} フィルードは必須です`);
                check = false;
                break;
            }
        }

        return check;
    };

    const handleConfirmUser = async () => {
        let check = checkValidateInputs();
        if (check === true) {

            let response = action === 'CREATE' ?
                await createNewUser({ ...userData, groupId: userData['group'] }) :
                await updateCurrentUser({ ...userData, groupId: userData['group'] });
            if (response.EC === 0) {
                props.onHide();
                action === 'CREATE' ? toast.success('追加は成功です') : toast.success('編集は成功です');
                setUserData({ ...defaultUserData, group: userGroups[0].id });
            }
            if (response.EC !== 0) {
                toast.error(response.EM);
                let _validInputs = _.cloneDeep(validInputsDefault); // boi do truong bi sai khi save nguoi dung
                _validInputs[response.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    };

    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    };
    return (
        <>
            <Modal className='modal-user' size="lg" show={props.isShowModalUser} onHide={() => handleCloseModalUser()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'CREATE' ? 'ユーザー作成' : 'ユーザー編集'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>メール(<span className='red'>*</span>):</label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={vailidInputs.email ? 'form-control' : 'form-control is-invalid'}
                                type='email'
                                value={userData.email}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'email')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>電話番号(<span className='red'>*</span>):</label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={vailidInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                type='text' value={userData.phone}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'phone')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>ユーザー名(<span className='red'>*</span>) :</label>
                            <input
                                className={vailidInputs.username ? 'form-control' : 'form-control is-invalid'}
                                type='text' value={userData.username}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'username')}
                            />
                        </div>
                        {
                            action === 'CREATE' &&

                            <div className='col-12 col-sm-6 form-group'>
                                <label>パスワード(<span className='red'>*</span>) :</label>
                                <input
                                    className={vailidInputs.password ? 'form-control' : 'form-control is-invalid'}
                                    type='password' value={userData.password}
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'password')}
                                />
                            </div>
                        }
                        <div className='col-12 col-sm-12 form-group'>
                            <label>住所 :</label>
                            <input
                                className='form-control'
                                type='text'
                                value={userData.address}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'address')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>性別 :</label>
                            <select
                                className='form-select'
                                placeholder='性別選んでください'
                                onChange={(event) => handleOnchangeInput(event.target.value, 'sex')}
                                value={userData.sex}
                            >
                                <option>性別選んでください</option>
                                <option value='男'>男</option>
                                <option value='女'>女</option>
                                <option value='その他'>その他</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>グループ :(<span className='red'>*</span>) :</label>
                            <select
                                className={vailidInputs.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'group')}
                                value={userData.group}
                            >
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
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>閉じる</Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? '保存' : '編集'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;