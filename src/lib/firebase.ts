// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from 'firebase/remote-config';
import { getStorage } from 'firebase/storage';
import { config } from '@/config/environments';

const firebaseConfig = config.firebase;

const app = initializeApp(firebaseConfig);

export const remoteConfig = getRemoteConfig(app);

// Configurar Remote Config según el ambiente
remoteConfig.settings = {
  minimumFetchIntervalMillis: config.remoteConfig.minimumFetchIntervalMillis,
  fetchTimeoutMillis: config.remoteConfig.fetchTimeoutMillis,
};