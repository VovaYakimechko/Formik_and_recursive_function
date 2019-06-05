import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import "./TaskFormStyle.css";
function FindElementOnTree(element, IdRequiredItem) {
    if (element.id === IdRequiredItem) {
        return element;
    } else if (element.children != null) {
        let i;
        let result = null;
        for (i = 0; result == null && i < element.children.length; i++) {
            result = FindElementOnTree(element.children[i], IdRequiredItem);
        }
        return result;
    }
    return null;
}

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tree: []

        }
        fetch('http://localhost:3004/tree')
            .then(response => response.json())
            .then(data => {
                const tree = data
                this.setState({tree})
            })



    }
    render() {
        if (!this.state.tree[0]) return <div>Please wait...</div>;
        let element = this.state.tree[0];
        let result = FindElementOnTree(element, 2);
        console.log(result);
        return <div className="All-form">

            <Formik
                initialValues={{
                    Name: '',
                    Address1: '',
                    Address2: '',
                    City: '',
                    State: '',
                    ZipCode: '',

                }}
                validationSchema={Yup.object().shape({
                    Name: Yup.string()
                        .required('Name is required')
                        .max(100, 'Name must be less than 100 character')
                        .min(1, 'Name must be at least 1 characters'),
                    Address1: Yup.string()
                        .required('Address1 is required')
                        .max(100, 'Address1 must be less than 100 character')
                        .min(1, 'Address1 must be at least 1 characters'),
                    Address2: Yup.string()
                        .max(100, 'Address2 must be less than 100 character')
                        .notRequired(),
                    City: Yup.string()
                        .required('City is required')
                        .max(50, 'City must be less than 50 character')
                        .min(1, 'City must be at least 1 characters'),
                    State: Yup.string()
                        .required('State is required!'),

                    ZipCode: Yup
                        .string()
                        .required('ZipCode is required')
                        .max(5, 'ZipCode must be less than 6 character')
                        .min(5, 'ZipCode must be at least 4 characters'),


                })}
                onSubmit={fields => {
                    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                }}
                render={({errors, status, touched}) => (
                    <Form>
                        <div className="form-group">
                            <Field name="Name" type="text" placeholder="Name"
                                   className={'form-control' + (errors.Name && touched.Name ? ' is-invalid' : '')}/>
                            <ErrorMessage name="Name" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <Field name="Address1" type="text" placeholder="Address 1"
                                   className={'form-control' + (errors.Address1 && touched.Address1 ? ' is-invalid' : '')}/>
                            <ErrorMessage name="Address1" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">

                            <Field name="Address2" type="text" placeholder="Address 2"
                                   className={'form-control' + (errors.Address2 && touched.Address2 ? ' is-invalid' : '')}/>
                            <ErrorMessage name="Address2" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <Field name="City" type="text" placeholder="City"
                                   className={'form-control' + (errors.City && touched.City ? ' is-invalid' : '')}/>
                            <ErrorMessage name="City" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <select
                                name="State"
                            >
                                <option value="" label="Select a State"/>
                                <option value="5555" label="5555"/>
                                <option value="8888" label="8888"/>
                            </select>
                        </div>
                        <div className="form-group">
                            <Field name="ZipCode" type="input" placeholder="Zip Code"
                                   className={'form-control' + (errors.ZipCode && touched.ZipCode ? ' is-invalid' : '')}/>
                            <ErrorMessage name="ZipCode" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Ok</button>
                            <button type="reset" className="btn btn-secondary">Cancel</button>
                        </div>
                    </Form>
                )}
            />

        </div>
    }
}

