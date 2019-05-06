import React, {Component} from 'react';
import RouterApp from "../Router"
import {Provider} from "react-redux"
import store from '../Redux/index'
import {SnackbarProvider} from 'notistack';


////////////////////////////
import Workers from './Workers'

///////////////////////////
class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <SnackbarProvider maxSnack={3}>
                    <RouterApp/>
                </SnackbarProvider>
            </Provider>
        );
    }
}

export default App;
