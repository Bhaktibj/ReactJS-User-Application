import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../containers/user.actions';

function RegisterPage() {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: ''
    })
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();


    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.first_name && user.last_name && user.email && user.phone_number && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="first_name" value={user.first_name} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.first_name &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="last_name" value={user.last_name} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                    {submitted && !user.last_name &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="phone" name="phone_number" value={user.phone_number} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.phone_number &&
                        <div className="invalid-feedback">Phone Number is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };