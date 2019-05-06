import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import FilterBar from '../TopMenu';
import Message from './message';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state/index';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
        width: '100%',
    },
    avatar: {
        width: 40,
        height: 40,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class Workers extends React.Component {
    state = {
        name: ``,
        workers: [
            {
                avatar: `https://bipbap.ru/wp-content/uploads/2018/02/1378847521_1806552374.jpg`,
                firstName: `Илья`,
                lastName: `Кобалия`,
                position: `Front-end`,
                level: `Junior`,
                salary: 10000,
                key: `1`
            },
            {
                avatar: `https://bipbap.ru/wp-content/uploads/2018/02/1378847521_1806552374.jpg`,
                firstName: `Артур`,
                lastName: `Воробьев`,
                position: `Web-designer`,
                level: `Junior`,
                salary: 9000,
                key: `2`
            },
            {
                avatar: `https://bipbap.ru/wp-content/uploads/2018/02/1378847521_1806552374.jpg`,
                firstName: `Валерий`,
                lastName: `Гончаренко`,
                position: `Full-stack`,
                level: `Middle`,
                salary: 14000,
                key: `3`
            },
            {
                avatar: `https://bipbap.ru/wp-content/uploads/2018/02/1378847521_1806552374.jpg`,
                firstName: `Генадий`,
                lastName: `Петров`,
                position: `Front-end`,
                level: `Senior`,
                salary: 40000,
                key: `4`
            },
        ]
    };

    getWorkers = () => {
        if (this.state.name.length === 0) {
            return this.state.workers
        }
        else {
            let workers = this.state.workers;
            return workers.filter(item => item.firstName.includes(this.state.name) || item.lastName.includes(this.state.name) || item.position.includes(this.state.name))
        }
    };
    maxSalary = () => {
        let newArr = this.state.workers.sort((a, b) => b.salary - a.salary);
        this.setState({workers: newArr});
    };
    minSalary = () => {
        let newArr = this.state.workers.sort((a, b) => a.salary - b.salary);
        this.setState({workers: newArr});
    };
    filterName = () => {
        let newArr = this.state.workers.sort((a, b) => {
            let nameA = a.firstName.toLowerCase(), nameB = b.firstName.toLowerCase();
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;
        });
        this.setState({workers: newArr});
    };


    render() {
        const {classes} = this.props;
        return (
            <>
                <FilterBar action={(firstName) => this.setState({name: firstName})}/>
                <div className={`workersContainr`}>
                    {this.getWorkers().map((item, index) =>
                        <ExpansionPanel key={item.key}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Grid item lg={1} style={{
                                        display: `flex`,
                                        flexDirection: `row`,
                                        alignItems: `center`,
                                        justifyContent: `space-around`
                                    }}>
                                        <Avatar alt="Remy Sharp"
                                                src="https://bipbap.ru/wp-content/uploads/2018/02/1378847521_1806552374.jpg"
                                                className={classes.avatar}/>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography
                                            className={classes.heading}>{item.firstName} {item.lastName}</Typography>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Typography className={classes.heading}>{item.position} разработчик</Typography>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Typography className={classes.heading}>{item.level}</Typography>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Typography className={classes.heading}>{item.salary} грн</Typography>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </ExpansionPanelDetails>
                            <Divider/>
                            <ExpansionPanelActions>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Message/>
                                    <Button onClick={() => {
                                        let newArr = this.state.workers;
                                        delete newArr[index];
                                        this.setState({workers: newArr});
                                    }} variant="outlined">
                                        <Typography>Уволить</Typography>
                                    </Button>
                                </Grid>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    )}
                </div>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {popupState => (
                        <React.Fragment>
                            <Button variant="contained" {...bindTrigger(popupState)}>
                                Фильтровать
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={popupState.close}>
                                    <div onClick={this.maxSalary}>Максимальная зарплата
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={popupState.close}>
                                    <div onClick={this.minSalary}>Минимальная зарплата
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={popupState.close}>
                                    <div onClick={this.filterName}>По алфовиту
                                    </div>
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </>
        )
    }
}

Workers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workers);