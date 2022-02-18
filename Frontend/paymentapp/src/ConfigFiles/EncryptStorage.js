import { EncryptStorage } from 'encrypt-storage';

export const encryptStorage = new EncryptStorage('secret-key', {
  storageType: 'localStorage',
});
