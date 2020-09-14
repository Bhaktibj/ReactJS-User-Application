import React, { useEffect, userSelector } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../containers/user.actions';
import { Table, Button } from 'reactstrap';

const GetUser = ({ match }) => {
    const { id } = match.params
    const user = useSelector(state => state.getuser.detail)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getUser(id))
    }, [id]);
    function handleDeleteUser(id) {
        dispatch(userActions.deleteUser(id))
    }
    return (
        <div>
            <p>Hi !<b>{user.first_name}</b></p>
            <div className="col-lg-8 offset-lg-2">
                <h4> User Details</h4>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone_number}</td>
                            <td><span><Link to={`/update/${user.id}`}>Update</Link> </span></td>
                            <td><Button onClick={() => handleDeleteUser(user.id)} color="primary">Delete</Button> </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Link to='/home'>Home</Link>
        </div>

    )
}
export{ GetUser };
