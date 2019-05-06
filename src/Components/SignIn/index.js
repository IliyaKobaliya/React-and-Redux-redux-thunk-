import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import {API_HOST} from "../../Config/URL";

// import PasswordDialog from './password'
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
    typography: {
        useNextVariants: true,
    },
});


class SignIn extends React.Component {
    state = {
        userData: {
            email: ``,
            password: ``
        },
        showPassword: false,

    };
    inputChange = event => {
        this.setState({
            userData: {
                ...this.state.userData,
                [event.target.name]: event.target.value
            }
        });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    getForm = (e) => {
        e.preventDefault();
        let validationLogin = /^\w+@\w+\.\w{2,4}$/i,
            email = this.state.userData.email,
            password = this.state.userData.password;
        if (email.length === 0 && password.length === 0) {
            this.props.enqueueSnackbar(`Введите логин и пароль`, {variant: `error`})
        }
        else if (!validationLogin.test(email)) {
            this.props.enqueueSnackbar('Введен некорректный Email!', {variant: `warning`});
        }
        else if (email.length === 0 || password.length === 0) {
            this.props.enqueueSnackbar((email.length === 0) ? `Email не введен` : `Пароль не введен`, {variant: `warning`});
        }
        else {
            axios.post(`${API_HOST}signIn`, this.state.userData)
                .then(({data}) => {
                        localStorage.setItem("token", data.token);
                        this.props.testAuthorization(data.email, data.token, data.firstName, data.lastName);
                        this.props.enqueueSnackbar(`Добро пожаловать на сайт, ${data.firstName} ${data.lastName}!`);
                    }
                )
                .then(() => {
                    this.props.history.push(`/Home`);
                })
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={`signContainer`}>
                <Grid item xs={6} md={4}>
                    <Card style={{marginTop: `-15vh`}} className={classes.card}>
                        <Grid container style={{height: `45vh`, padding: `25px`}}
                              direction="column"
                              justify="space-between"
                              alignItems="center"
                        >
                            <Typography variant="h5" component="h2">Вход в учетную запись</Typography>
                            <FormControl style={{width: `90%`}}>
                                <InputLabel htmlFor="adornment-email">Email</InputLabel>
                                <Input
                                    name='email'
                                    color={`inherit`}
                                    id="adornment-email"
                                    onChange={this.inputChange}
                                />
                            </FormControl>
                            <FormControl style={{width: `90%`}}>
                                <InputLabel htmlFor="adornment-password">Пароль</InputLabel>
                                <Input
                                    name='password'
                                    color={`inherit`}
                                    id="adornment-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    onChange={this.inputChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {/*<PasswordDialog/>*/}
                            <Button variant="outlined" color="inherit" className={classes.button}
                                    onClick={this.getForm}>
                                <Typography variant="button">
                                    Войти
                                </Typography>
                            </Button>
                            <Typography variant="body2" gutterBottom>Нет учетной записи ? <Link
                                to="/SignUp">Создать</Link></Typography>
                        </Grid>
                    </Card>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(SignIn)