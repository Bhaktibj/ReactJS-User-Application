import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from '../containers/alert.actions';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    deleteUser,
    getUser,
    updateUser,
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));
        userService.login(email, password)
            .then(
                user => {
                    dispatch(success())
                    dispatch(alertActions.success("User login successfully"));
                    history.push('/home');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error('Please enter correct credentials'));
                }

            );
    };

function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
};

function logout() {
    userService.logout();
    history.push('/');
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success(`${user.message}`));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
        userService.getAll()
            .then(
                users => {
                    dispatch(success(users));
                    dispatch(alertActions.success(`${users.message}`));
                    history.push('/home')
                    dispatch(alertActions.clear());
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error));
                }
            );
    }

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function deleteUser(id) {
    return dispatch => {
        dispatch(request(id));
        const deleteConfirm = window.confirm("Do you really want to Delete?");
        if (deleteConfirm == true) {
            userService.deleteUser(id)
                .then(
                    user => {
                        dispatch(success(user));
                        dispatch(alertActions.success(`${user.message}`));
                        history.push('/home')
                    },
                    error => {
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error));
                    });
        };
    };
        function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
        function success(id) { return { type: userConstants.DELETE_SUCCESS, id} }
      function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
function getUser(id) {
    return dispatch => {
        dispatch(request(id));
        userService.getById(id)
            .then(
                user => {
                    dispatch(success(user.data));
                    history.push(`/get/${id}`)
                    dispatch(alertActions.success(`${user.message}`));
                    dispatch(alertActions.clear())
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                }
            )
        };


    function request(id) { return { type: userConstants.GET_REQUEST, id } }
    function success(user) { return { type: userConstants.GET_SUCCESS,value: user} }
    function failure(id, error) { return { type: userConstants.GET_FAILURE, id, error } }
}
function updateUser(id, user) {
    return dispatch => {
        dispatch(request(id))
        userService.updateUser(id, user)
            .then(
            user => {
                console.log("Updated successfully", user)
                dispatch(success(id));
                dispatch(alertActions.success( `${user.message}`));
                history.push(`/`);
            },
            error => {
                console.log("Error", error)
                dispatch(failure());
                dispatch(alertActions.error(error))
            }
            )
        };
    function request(id, user) { return { type: userConstants.UPDATE_REQUEST, id, user } }
    function success(id, user) { return { type: userConstants.UPDATE_SUCCESS, id, user } }
    function failure(id, error) { return { type: userConstants.UPDATE_FAILURE, id, error } }
}