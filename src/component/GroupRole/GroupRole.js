import './GroupRole.scss';
import { useState, useEffect } from 'react';
import { fetchGroups } from '../../service/ApiService';
import { toast } from 'react-toastify';
import { fetchAllRoles, fetchRolesByGroup, assignRoleToGroup } from '../../service/ApiService';
import _ from 'lodash';

const GroupRole = (props) => {
    const [userGroups, setUserGroups] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");
    const [listRoles, setListRoles] = useState([]);
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

    useEffect(() => {
        getGroups();
        getAllRoles();
    }, []);

    const getGroups = async () => {
        let response = await fetchGroups();
        if (response && response.EC === 0) {
            setUserGroups(response.DT);
        } else {
            toast.error(response.EM);
        }
    };

    const getAllRoles = async () => {
        let data = await fetchAllRoles();
        if (data && +data.EC === 0) {
            setListRoles(data.DT);
        }
    };

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let object = {};
                object.url = role.url;
                object.id = role.id;
                object.description = role.description;
                object.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(item => item.url === object.url); // Xet xem role trong group co trong all role hay khong ?ham some tra ve true or false
                }
                result.push(object);
            });
        }
        return result;
    };

    const handleOnchangeSelect = async (value) => {
        setSelectGroup(value);
        if (value) {
            let data = await fetchRolesByGroup(value);
            if (data && +data.EC === 0) {
                let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
                setAssignRolesByGroup(result);
            }
        }
    };

    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value);   //https://stackoverflow.com/questions/35206125/how-can-i-find-and-update-values-in-an-array-of-objects
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned;
        }
        setAssignRolesByGroup(_assignRolesByGroup);

    };

    const buildDataToSave = () => {
        //data = {groupId:2 , groupRoles : {}, {}}
        let result = {};
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        result.groupId = selectGroup;
        let groupRolesFilter = _assignRolesByGroup.filter(item => item.isAssigned === true);
        let finalGroupRoles = groupRolesFilter.map(item => {
            let data = { groupId: +selectGroup, roleId: +item.id };
            return data;
        });
        result.groupRoles = finalGroupRoles;
        return result;
    };

    const handleSave = async () => {
        let data = buildDataToSave();
        let response = await assignRoleToGroup(data);
        if (response && response.EC === 0) {
            toast.success(response.EM);
        } else {
            toast.error(response.EM);
        }
    };

    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='header-container mt-3'>
                    <h4>グループ & 権限</h4>
                    <div className='assign-group-role'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>グループ選定(<span className='red'>*</span>) :</label>
                            <select
                                className={'form-select'}
                                onChange={(event) => handleOnchangeSelect(event.target.value)}
                            >
                                <option value=''>グールプ選んでください</option>
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <hr />
                        {selectGroup &&
                            <div className='roles'>
                                <h5>アサイン権限</h5>
                                {
                                    assignRolesByGroup && assignRolesByGroup.length > 0
                                    && assignRolesByGroup.map((item, index) => {
                                        return (
                                            <div className="form-check" key={`list-role-${index}`}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={item.id}
                                                    id={`list-role-${index}`}
                                                    checked={item.isAssigned}
                                                    onChange={(event) => handleSelectRole(event.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                    {item.url}
                                                </label>
                                            </div>
                                        );
                                    })
                                }
                                <div className='mt-3'>
                                    <button className='btn btn-warning' onClick={() => handleSave()}>保存</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupRole;