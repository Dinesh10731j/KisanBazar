"use client";
import { UseUserRole } from '@/hooks/useUserRole';
import React from 'react'

const CustomerDashBoardClient = () => {
    const role = UseUserRole();
  return (
    <div>CustomerDashBoardClient role is {role}</div>
  )
}

export default CustomerDashBoardClient