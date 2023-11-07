import React, { useEffect, useState } from 'react';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Button, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({children}) {

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="flex-1 p-4">
        <Navbar/> 
       {children}
      </div>
    </div>
  );
}

export default Layout;








