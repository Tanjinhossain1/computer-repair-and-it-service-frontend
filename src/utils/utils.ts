import { authKey } from "@/constants/storageKey";
import { removeLocalStorageInfo } from "@/services/auth.service";
import { redirect } from "next/navigation";

export const TrimToUpperCase = (value: string) =>{
  if (value === null || value === undefined) {
    return ''; // or handle it in some other way based on your requirements
  }
    return value.trim().toUpperCase().replace(/_/g, '-')
}

export const TrimToUpperCaseWithSpace = (value: string) =>{
  if (value === null || value === undefined) {
    return ''; // or handle it in some other way based on your requirements
  }
    return value.trim().replace(/_/g, '-').split('').join(' ').toUpperCase();
}

export const TrimToLowerCase = (value: string) =>{
  if (value === null || value === undefined) {
    return ''; // or handle it in some other way based on your requirements
  }
    return value.trim().toLowerCase()
}

export function fullDateFormat(inputDateString: string): string {
    try {
      const inputDate: Date = new Date(inputDateString);
  
      
  
      const day = inputDate.getDate().toString().padStart(2, '0');
      const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
      const year = inputDate.getFullYear();
      const hours = inputDate.getHours().toString().padStart(2, '0');
      const minutes = inputDate.getMinutes().toString().padStart(2, '0');
  
      const amOrPm = +hours >= 12 ? 'PM' : 'AM';
      const formattedHours = (+hours % 12).toString().padStart(2, '0');
  
      return `${day}/${month}/${year} ${formattedHours}:${minutes} ${amOrPm}`;
    } catch (error: any) {
      return `Error: ${error?.message}`;
    }
  }   
 