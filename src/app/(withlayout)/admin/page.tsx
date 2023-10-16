'use client'
import React from 'react'
import ProfilePage from './profile/page'
import { getUserInfo, removeLocalStorageInfo } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { authKey } from '@/constants/storageKey';

export default function AdminPage() {
    const { role } = getUserInfo() as any;
    const history = useRouter();
    if (role !== "admin") {
      removeLocalStorageInfo(authKey);
      history.push("/login");
    }
  return (
    <div> 
        <ProfilePage />
    </div>
  )
}
