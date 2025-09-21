import React, { Component, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Grommet,
  Text,
  Grid
} from 'grommet';
import { Home as HomeIcon, User, Calendar, History, Configure, Logout } from 'grommet-icons';

import './App.css';

const theme = {
  global: {
    colors: {
      brand: {
        dark: '#667eea',
        light: '#764ba2'
      },
      focus: '#4A90E2',
      text: {
        dark: '#2c3e50',
        light: '#ffffff'
      },
      background: {
        light: '#f8f9fa',
        dark: '#2c3e50'
      }
    },
    font: {
      family: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      weight: 400
    },
    elevation: {
      light: {
        small: '0 2px 4px rgba(0,0,0,0.1)',
        medium: '0 4px 8px rgba(0,0,0,0.12)',
        large: '0 8px 16px rgba(0,0,0,0.15)'
      }
    }
  },
  button: {
    border: {
      radius: '8px'
    },
    primary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }
  }
};

const SidebarButton = ({ label, icon, ...rest }) => (
  <Button plain {...rest}>
    {({ hover }) => (
      <Box
        background={hover ? "rgba(255, 255, 255, 0.1)" : undefined}
        pad={{ horizontal: "large", vertical: "medium" }}
        direction="row"
        align="center"
        gap="medium"
        className="sidebar-button"
        round="small"
      >
        {icon}
        <Text size="medium" weight="500" color="white">{label}</Text>
      </Box>
    )}
  </Button>
);

const SidebarButtons = () => {
  const [active, setActive] = useState();
  
  const menuItems = [
    { label: "View Medical History", icon: <History color="white" />, action: "history" },
    { label: "View Appointments", icon: <Calendar color="white" />, action: "appointments" },
    { label: "Schedule Appointment", icon: <User color="white" />, action: "schedule" },
    { label: "Settings", icon: <Configure color="white" />, action: "settings" },
    { label: "Sign Out", icon: <Logout color="white" />, action: "signout" }
  ];

  return (
    <Grommet full theme={theme}>
      <Box fill direction="row">
        <Box className="professional-sidebar" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' }}>
          {menuItems.map(item => (
            <SidebarButton
              key={item.label}
              label={item.label}
              icon={item.icon}
              active={item.label === active}
              onClick={() => {
                if (item.action === "schedule") {
                  window.location = "/scheduleAppt"
                }
                else if (item.action === "signout") {
                  fetch("http://localhost:3001/endSession");
                  window.location = "/"
                }
                else if (item.action === "appointments") {
                  window.location = "/PatientsViewAppt"
                }
                else if (item.action === "history") {
                  let email_in_use = "";
                  fetch("http://localhost:3001/userInSession")
                    .then(res => res.json())
                    .then(res => {
                      var string_json = JSON.stringify(res);
                      var email_json = JSON.parse(string_json);
                      email_in_use = email_json.email;
                      console.log("Email In Use Is :" + email_in_use);
                      window.location = "/ViewOneHistory/" + email_in_use;
                    });
                }
                else if (item.action === "settings") {
                  window.location = "/Settings"
                }
                setActive(item.label);
              }}
            />
          ))}
        </Box>
      </Box>
    </Grommet>
  );
};
export class Home extends Component {
  renderName = ({ name, email }) => <div key={email}>{name} {name}</div>

  render() {
    const Header = () => (
      <Box
        className="professional-header"
        pad='medium'
        elevation='medium'
        justify='between'
        direction='row'
        align='center'
        flex={false}
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 2px 20px rgba(102, 126, 234, 0.3)'
        }}
      >
        <Box direction="row" align="center" gap="medium" className="header-content">
          <HomeIcon className="home-icon" size="large" color="white" />
          <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/">
            <Heading level='2' margin='none' className="hms-title" color="white" weight="600">
              Hospital Management System
            </Heading>
          </a>
        </Box>
      </Box>
    );

    return (
      <Grommet full={true} theme={theme}>
        <Box fill={true} className="professional-container" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
          <Header/>
          <Grid
            fill
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            areas={[
              { name: 'sidebar', start: [0, 1], end: [0, 1] },
              { name: 'main', start: [1, 1], end: [1, 1] },
            ]}>
            <Box
              gridArea="sidebar"
              width="medium"
              animation={[
                { type: 'fadeIn', duration: 300 },
                { type: 'slideRight', size: 'xlarge', duration: 150 },
              ]}
            >
              <SidebarButtons />
            </Box>
            <Box
              gridArea="main"
              justify="center"
              align="center"
              pad="large">
              <Box align="center" pad="large" className="professional-card" background="white" round="medium" elevation="medium">
                <Heading 
                  className="welcome-section"
                  level="1"
                  size="large"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem'
                  }}
                >
                  Welcome to Your Dashboard
                </Heading>
                <Text size="large" color="text.dark" textAlign="center" style={{ maxWidth: '600px', lineHeight: '1.6' }}>
                  Manage your health records, schedule appointments, and access medical history all in one place. 
                  Your health is our priority.
                </Text>
                <Box direction="row" gap="medium" margin={{ top: 'medium' }}>
                  <Button 
                    primary 
                    label="Schedule New Appointment" 
                    onClick={() => window.location = "/scheduleAppt"}
                    className="professional-button"
                    size="large"
                  />
                  <Button 
                    label="View Medical History" 
                    onClick={() => {
                      fetch("http://localhost:3001/userInSession")
                        .then(res => res.json())
                        .then(res => {
                          var string_json = JSON.stringify(res);
                          var email_json = JSON.parse(string_json);
                          let email_in_use = email_json.email;
                          window.location = "/ViewOneHistory/" + email_in_use;
                        });
                    }}
                    style={{ 
                      border: '2px solid #667eea',
                      color: '#667eea',
                      background: 'transparent'
                    }}
                    size="large"
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Grommet>
    );
  }
}

export default Home;