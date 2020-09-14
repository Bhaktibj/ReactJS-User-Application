import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../containers/user.actions';
import { Table, Button } from 'reactstrap';

const HomePage = () => {
  const users = useSelector(state => state.users);
  console.log("************** users", users)
  const getuser = useSelector(state => state.getuser.detail);
  console.log("getuser***************", getuser)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  return (
    <div className="col-lg-8 offset-lg-2">
      <h3>Hi !</h3><p>You're logged in</p>
      <h4> User List</h4>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Detail</th>
          </tr>
        </thead>
        {users.items &&
          <tbody>
            {users.items.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>
                  <Link to={`/get/${user.id}`}>Detail</Link> 
                </td>
              </tr>
            ))
            }
          </tbody>
        }
      </Table>
      <Link to='/'>Logout</Link>
    </div>
  )
}

export {HomePage};