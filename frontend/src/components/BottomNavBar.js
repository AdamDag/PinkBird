import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ExploreIcon from '@mui/icons-material/Explore';
import InfoIcon from '@mui/icons-material/Info';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const styles = {
  root: {
    color: "green",
    "&$selected": {
      color: "red"
    }
  },
  selected: {}
};

function BottomNavBar() {  
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className = "bottom-nav-bar">
        <BottomNavigation value={value} onChange={handleChange}>
            <BottomNavigationAction
                href="/Scan"
                label="Scan"
                value="Scan"
                icon={<DocumentScannerIcon />}
            />
            <BottomNavigationAction
                href="/Explore"
                label="Explore"
                value="Explore"
                icon={<ExploreIcon />}
            />
            <BottomNavigationAction
                href="/ReadMore"
                label="Read More"
                value="Read More"
                icon={<InfoIcon />}
            />
            <BottomNavigationAction
                href="/AboutUs"
                label="About Us"
                value="About Us"
                icon={<Diversity3Icon />}
            />
        </BottomNavigation>
    </div>
  );
}

export default BottomNavBar;