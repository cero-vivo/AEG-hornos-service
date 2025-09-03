export interface EnvironmentConfig {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  };
  remoteConfig: {
    minimumFetchIntervalMillis: number;
    fetchTimeoutMillis: number;
  };
  resend: {
    apiKey: string;
    fromDomain: string;
    // IMPORTANTE: Asegúrate de configurar DMARC en tu DNS
    // Agrega un registro TXT: _dmarc.tudominio.com
    // Valor: v=DMARC1; p=none; rua=mailto:dmarc@tudominio.com
  };
  general: {
    nodeEnv: 'development' | 'production' | 'test';
    isDevelopment: boolean;
    isProduction: boolean;
  };
}

const getFirebaseConfig = () => ({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

const developmentConfig: EnvironmentConfig = {
  firebase: getFirebaseConfig(),
  remoteConfig: {
    minimumFetchIntervalMillis: 0, // Fetch cada vez en desarrollo
    fetchTimeoutMillis: 10000,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY || 'test-key',
    fromDomain: process.env.RESEND_FROM_DOMAIN || 'onboarding@resend.dev',
  },
  general: {
    nodeEnv: 'development',
    isDevelopment: true,
    isProduction: false,
  },
};

const productionConfig: EnvironmentConfig = {
  firebase: getFirebaseConfig(),
  remoteConfig: {
    minimumFetchIntervalMillis: 3600000, // Fetch cada hora en producción
    fetchTimeoutMillis: 60000,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY!,
    fromDomain: process.env.RESEND_FROM_DOMAIN!,
  },
  general: {
    nodeEnv: 'production',
    isDevelopment: false,
    isProduction: true,
  },
};

export const getEnvironmentConfig = (): EnvironmentConfig => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  if (nodeEnv === 'production') {
    return productionConfig;
  }
  
  return developmentConfig;
};

export const config = getEnvironmentConfig();