import { storage } from '@/lib/firebase';
import { getDownloadURL, ref } from 'firebase/storage';

export async function getImageUrl(path: string): Promise<string> {
  const imageRef = ref(storage, path);
  return await getDownloadURL(imageRef);
} 