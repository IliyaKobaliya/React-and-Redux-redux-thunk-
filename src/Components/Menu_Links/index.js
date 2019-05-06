import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

function MenuLinks(links) {
    return (
        <WithState>
            {({anchorEl, updateAnchorEl}) => {
                const open = Boolean(anchorEl);
                const handleClose = () => {
                    updateAnchorEl(null);
                };
                return (
                    <React.Fragment>
                        <Button
                            variant="contained"
                            style={{
                                position: `fixed`,
                                right: `40px`,
                                top: `20px`,
                                color: `#757575`,
                                borderRadius: `50%`,
                                width: `50px`,
                                height: `50px`,
                                minWidth: `30px`
                            }}
                            aria-owns={open ? 'render-props-menu' : undefined}
                            aria-haspopup="true"
                            onClick={event => {
                                updateAnchorEl(event.currentTarget);
                            }}
                        >
                            <MenuIcon/>
                        </Button>
                        <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                            {links.map(item =>
                                <MenuItem key={item.key} onClick={handleClose}><Link to={item.path}>
                                    <Typography variant={`subtitle1`}>{item.title}</Typography>
                                </Link></MenuItem>
                            )}
                        </Menu>
                    </React.Fragment>
                );
            }}
        </WithState>
    );
}

export default MenuLinks;