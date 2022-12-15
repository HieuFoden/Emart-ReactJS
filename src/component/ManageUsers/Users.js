import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers } from '../../service/ApiService';
import ReactPaginate from "react-paginate";

const Users = (props) => {
    let navigate = useNavigate();

    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        let response = await fetchAllUsers();
        if (response && response.EC === 0) {
            setListUser(response.DT);
        }
    };

    const handlePageClick = (event) => {

    };

    return (
        <div className="container">
            <div className="manage-users-container">
                <div className="user-header">
                    <div className="title">
                        <h3>ユーザー　一覧</h3>
                    </div>
                    <div className="actions">
                        <button className="btn btn-success">リフレッシュ</button>
                        <button className="btn btn-primary">ユーザー追加</button>
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
                            </tr>
                        </thead>
                        <tbody>
                            {listUser && listUser.length > 0 ?
                                <>
                                    {listUser.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                            </tr>
                                        );
                                    })}
                                </>
                                :
                                <><span>ユーザーがありません</span></>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="user-footer">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={50}
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
                    />
                </div>
            </div>
        </div>
    );
};

export default Users;