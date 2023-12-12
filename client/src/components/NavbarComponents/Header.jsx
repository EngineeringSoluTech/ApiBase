import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LoginIcon from '@mui/icons-material/Login';


function Header(props) {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor:"#fdd7e4" }}>
        <Tooltip TransitionComponent={Zoom} title="Explora productos fantasticos. Vamos ?">   
         <Button 
           startIcon={<ShoppingCartCheckoutIcon/>} 
           variant="outlined" 
           size="small" 
           href='/' 
           color='secondary'
           style={{marginLeft:5, transform: "scale(1.2)"}}
           >
           Productos
         </Button>      
        </Tooltip>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
         <Button
            endIcon={<LoginIcon/>} 
            variant="outlined" 
            size="small" 
            href='/' 
            color='secondary'
            style={{ transform: "scale(1.15)"}}
            >
           Login
         </Button>
      </Toolbar>
      {/* <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar> */}
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;