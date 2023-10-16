'use client'
import React from 'react'
import ProfilePage from './profile/page'
import { getUserInfo, removeLocalStorageInfo } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { authKey } from '@/constants/storageKey';

export default function SuperAdminPage() {
    const { role } = getUserInfo() as any;
    const history = useRouter()
    if(role !== "super_admin"){ 
        removeLocalStorageInfo(authKey);
        history.push("/login");
    }
  return (
    <div> 
        <ProfilePage />
    </div>
  )
}
