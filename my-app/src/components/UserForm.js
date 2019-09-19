import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status])

    return (
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="Name" />

                {touched.name && errors.name &&(<p>{errors.name}</p>)}

                <Field type="text" name="email" placeholder="Email" />

                {touched.email && errors.email &&(<p>{errors.email}</p>)}

                <Field type="text" name="password" placeholder="Password" />

                {touched.password && errors.password &&(<p>{errors.password}</p>)}

                <Field type="checkbox" name="terms" />

                <button>Submit</button>

            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required")
    }),

    handleSubmit(values, { setStatus }) {
        axios
        .post('https://reqres.in/api/users', values)
        .then(res => {
            setStatus(res.data);
        })
        .catch(err => console.log(err.res));
    }

})(UserForm);
console.log("This is the DATA", FormikUserForm);

export default FormikUserForm;