import React, { useEffect, useState } from "react";
import { fetchAllUsers, deleteUser } from '../../service/ApiService';
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import './Users.scss';

const Users = (props) => {

    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModalDelete, setDataModalDelete] = useState({});;

    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState('CREATE');
    const [dataModalCreateUpdate, setDataModalCreateUpdate] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async (page) => {

        let response = await fetchAllUsers(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setTotalPage(response.DT.totalPages);
            if (response.DT.totalPages > 0 && response.DT.users.length === 0) {
                setCurrentPage(+response.DT.totalPages);
                await fetchAllUsers(+response.DT.totalPages, currentLimit);
            }
            if (response.DT.totalPages > 0 && response.DT.users.length > 0) {
                setListUser(response.DT.users);
            }
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = async (user) => {
        setDataModalDelete(user);
        setIsShowModalDelete(true);
    };

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModalDelete({});
    };

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModalDelete);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    };

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
        setActionModalUser({}); // reset cac truong ve rong
        await fetchUsers();
    };

    const handleEditUser = (user) => {
        setActionModalUser('UPDATE');
        setDataModalCreateUpdate(user);
        setIsShowModalUser(true);
    };

    const handleRefresh = async () => {
        await fetchUsers();
    };
    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title mt-3">
                            <h3>ユーザー管理</h3>
                        </div>
                        <div className="actions my-3">
                            <button
                                className="refresh btn btn-success"
                                onClick={() => handleRefresh()}
                            >
                                <i className="fa fa-refresh">リフレッシュ</i>
                            </button>
                            <button className="btn btn-primary"
                                onClick={() => {
                                    setIsShowModalUser(true);
                                    setActionModalUser('CREATE');
                                }}
                            >
                                <i className="fa fa-plus-circle">ユーザー追加</i>
                            </button>
                        </div>
                    </div>
                    <div className="user-table">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">ユーザー名</th>
                                    <th scope="col">メール</th>
                                    <th scope="col">グループ</th>
                                    <th scope="col">アクション</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser && listUser.length > 0 ?
                                    <>
                                        {listUser.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className=" btn btn-info mx-3"
                                                            onClick={() => handleEditUser(item)}
                                                        >
                                                            <i className="fa fa-pencil">編集</i>
                                                        </button>
                                                        <button className=" btn btn-danger"
                                                            onClick={() => handleDeleteUser(item)}
                                                        >
                                                            <i className="fa fa-trash">削除</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </>
                                    :
                                    <><tr><td>ユーザーがありません</td></tr></>
                                }
                            </tbody>
                        </table>
                    </div>

                    {totalPage > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPage}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                                forcePage={+currentPage - 1}
                            />
                        </div>
                    }
                </div>
            </div>

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModalDelete={dataModalDelete}
            />

            <ModalUser
                onHide={onHideModalUser}
                isShowModalUser={isShowModalUser}
                action={actionModalUser}
                dataModalCreateUpdate={dataModalCreateUpdate}
            />
        </>
    );
};

export default Users;