//////////////   React     ///////////////////////
import React, {Component} from 'react';
///////////// Material UI  //////////////////////
import Grid from '@material-ui/core/Grid';
//////////////    Router   /////////////////////
import {Router} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
//////////////   Links    //////////////////////
import beforeAuthLinks from "./Links/beforeAuth"
import afterAuthLinks from './Links/afterAuth'
//////////////   Routes  ///////////////////////
import AppRoutesAfter from "./Routes/afterAuth"
import AppRoutesBefore from "./Routes/beforeAuth"
////////////////////////////////////////////////
import MenuLinks from '../Components/Menu_Links'
import {createBrowserHistory} from 'history';
import {connect} from "react-redux";


const history = createBrowserHistory();

class RouterApp extends Component {
    render() {
        const authBool = true;         // req => server => res => redux-thunk => store => this.props.authBool.

        this.routes = [AppRoutesAfter, AppRoutesBefore];
        this.links = (authBool ? afterAuthLinks : beforeAuthLinks);

        this.routs = (authBool ? this.routes[0] : this.routes[1]).map(item => {
            return (
                <Route path={item.path} component={item.component} key={item.key}/>
            )
        });

        return (
            <Router history={history}>
                <Grid container>
                    <Grid item>
                        {this.porps.authorization.authBool && MenuLinks(this.links)}
                    </Grid>
                    <Grid item xs={12}>
                        <Switch>
                            {this.routs}
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        )
    }
}

const mapStateToProps = ({authorization}) => ({authorization});

export default connect(mapStateToProps)(RouterApp)