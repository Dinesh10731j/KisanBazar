"use client";
import React from 'react'
import { UseUserRole } from '@/hooks/useUserRole';
const FarmerDashboardClient = () => {
    const role = UseUserRole();
  return (
    <div>FarmerDashboardClient the role is {role}</div>
  )
}

export default FarmerDashboardClient