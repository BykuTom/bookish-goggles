export function returnRandomKey() {
  const randomValues = new Uint8Array(20);
  crypto.getRandomValues(randomValues);
  return Array.from(randomValues, (byte) => byte.toString(16)).join("");
}
