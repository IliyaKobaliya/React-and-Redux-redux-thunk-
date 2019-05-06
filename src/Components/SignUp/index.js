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
// import {API_HOST} from "../../config";

import TermsConditions from './terms_conditions'

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
});

class SignUp extends React.Component {
    state = {
        userData: {
            email: ``,
            password: ``,
            firstName: ``,
            lastName: ``
        },
        showPassword: false,
        showRepeatPassword: false,
        repeatPassword: ``   // test password
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
    handleClickShowRepeatPassword = () => {
        this.setState(state => ({showRepeatPassword: !state.showRepeatPassword}));
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={`signContainer`}>
                <Grid item xs={8} sm={8} md={6} lg={5}>
                    <Card style={{marginTop: `-5vh`}} className={classes.card}>
                        <Grid container style={{height: `70vh`, padding: `25px`}}
                              direction="column"
                              justify="space-between"
                              alignItems="center"
                        >

                            <Typography variant="h5" component="h2">Создание учетной записи</Typography>
                            <FormControl style={{width: `90%`}}>
                                <InputLabel htmlFor="adornment-firstName">Имя</InputLabel>
                                <Input
                                    name='firstName'
                                    color={`inherit`}
                                    id="adornment-firstName"
                                    onChange={this.inputChange}
                                />
                            </FormControl>
                            <FormControl style={{width: `90%`}}>
                                <InputLabel htmlFor="adornment-lastName">Фамилия</InputLabel>
                                <Input
                                    name='lastName'
                                    color={`inherit`}
                                    id="adornment-lastName"
                                    onChange={this.inputChange}
                                />
                            </FormControl>
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

                            <FormControl style={{width: `90%`}}>
                                <InputLabel htmlFor="adornment-repeatPassword">Повторите пароль</InputLabel>
                                <Input
                                    name='repeatPassword'
                                    color={`inherit`}
                                    id="adornment-repeatPassword"
                                    type={this.state.showRepeatPassword ? 'text' : 'password'}
                                    onChange={(event) => {
                                        this.setState({
                                            repeatPassword: event.target.value
                                        })
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle repeatPassword visibility"
                                                onClick={this.handleClickShowRepeatPassword}
                                            >
                                                {this.state.showRepeatPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl style={{width: `90%`, textAlign: `Center`}}><TermsConditions/></FormControl>

                            <Button variant="outlined" color="inherit" className={classes.button}
                                    onClick={this.getForm}>
                                <Typography variant="button">
                                    Создать
                                </Typography>
                            </Button>
                            <Typography variant="body2" gutterBottom> Уже есть учетная запись ? <Link
                                to="/SignIn">Войти</Link></Typography>
                        </Grid>
                    </Card>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(SignUp);