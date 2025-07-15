import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET;

// deterministic encryption for the key
const deriveKey = (rawKey) => CryptoJS.SHA256(rawKey).toString();

// real AES encryption for the value
const encryptValue = (rawValue) =>
  CryptoJS.AES.encrypt(rawValue, SECRET_KEY).toString();

const decryptValue = (cipher) =>
  CryptoJS.AES.decrypt(cipher, SECRET_KEY).toString(CryptoJS.enc.Utf8);

export const setStorageItem = (rawKey, rawValue) => {
  const storageKey = deriveKey(rawKey);
  const cipher = encryptValue(rawValue);
  localStorage.setItem(storageKey, cipher);
};

export const getStorageItem = (rawKey) => {
  const storageKey = deriveKey(rawKey);
  const cipher = localStorage.getItem(storageKey);
  if (!cipher) return null;
  try {
    return decryptValue(cipher);
  } catch (err) {
    console.error("Decryption error:", err);
    return null;
  }
};

export const removeStorageItem = (rawKey) => {
  localStorage.removeItem(deriveKey(rawKey));
};
