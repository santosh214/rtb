import React from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar'
import Header from '../../Common/Header'
import { Box } from '@mui/material';


export default function Dashboard() {
  const navItems: {
    label: string;
    href: string;
  }[] = [];
  return (
    <>
    <Header appName={'AppName'} navItems={navItems} />
    <Sidebar/>
    <Box>Hello World</Box>
    </>
  )
}
