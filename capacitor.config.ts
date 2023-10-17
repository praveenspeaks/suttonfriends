import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.sutton.friends.scanner',
  appName: 'SFScanner',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
