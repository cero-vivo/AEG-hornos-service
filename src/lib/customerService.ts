import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CustomerData, CustomerFormData } from '@/types/customer';

export async function saveCustomerData(formData: CustomerFormData, photoUrls?: string[]): Promise<string> {
  try {
    const customerData: Omit<CustomerData, 'id'> = {
      ...formData,
      fechaContacto: new Date(),
      estado: 'nuevo',
      fotoUrls: photoUrls || [],
    };

    const docRef = await addDoc(collection(db, 'customers'), {
      ...customerData,
      fechaContacto: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving customer data:', error);
    throw new Error('Failed to save customer data');
  }
}

export async function uploadCustomerPhotos(files: File[]): Promise<string[]> {
  // This function would handle photo uploads to Firebase Storage
  // For now, returning empty array as placeholder
  console.log(`Processing ${files.length} files for upload`);
  return [];
}