import { useEffect, useState, forwardRef, useImperativeHandle } from "react";   //https://stackoverflow.com/questions/37949981/call-child-method-from-parent
import { toast } from "react-toastify";
import { fetchAllRoles, deleteRole } from '../../service/ApiService';

const TableRole = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState([]);

    useEffect(() => {
        getAllRoles();
    }, []);

    useImperativeHandle(ref, () => ({
        fetchListRolesAgain() {
            getAllRoles();
        }
    }));

    const getAllRoles = async () => {
        let data = await fetchAllRoles();
        if (data && +data.EC === 0) {
            setListRoles(data.DT);
        }
    };

    const handleDeleteRole = async (role) => {
        let data = await deleteRole(role);
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            await getAllRoles();
        }
    };

    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">URL</th>
                        <th scope="col">デスクリプション</th>
                        <th scope="col">アクション</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ?
                        <>
                            {listRoles.map((item, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>
                                        <td>

                                            <button className=" btn btn-danger"
                                                onClick={() => handleDeleteRole(item)}
                                            >
                                                <i className="fa fa-trash">削除</i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </>
                        :
                        <><tr><td colSpan={4}>権限がありません</td></tr></>
                    }
                </tbody>
            </table>
        </>
    );
});

export default TableRole