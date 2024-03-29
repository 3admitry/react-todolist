import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {loginTC} from './auth-reducer';
import {Navigate} from 'react-router-dom';
import style from './Login.module.scss'
import {Link} from '@mui/material';

export const Login = () => {
    const dispatch = useAppDispatch()
    const isUserLogged = useAppSelector(state => state.auth.isLoggedIn)
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });

    const handleFillForm = (event: React.SyntheticEvent) => {
        event.preventDefault();
        formik.setFieldValue('email', 'web.refaq@gmail.com');
        formik.setFieldValue('password', 'password');
    }

    if (isUserLogged) {
        return <Navigate to="/"/>
    }

    return <Grid container justifyContent={'center'} className={style.loginForm}>
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <div className={style.intoText}>
                    <p>To log in get registered <Link href='https://social-network.samuraijs.com/' target={'_blank'}
                                                      rel="noreferrer">here</Link>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: web.refaq@gmail.com | Password: password</p>
                    <p>or just click <Link href="#" onClick={handleFillForm}>fill form</Link></p>
                </div>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ?
                        <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    <TextField type="password" label="Password"
                               margin="normal"
                               {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ?
                        <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                    <FormControlLabel label={'Remember me'} control={<Checkbox
                        checked={formik.values.rememberMe}
                        {...formik.getFieldProps('rememberMe')}
                    />}/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
        </form>
    </Grid>
}
