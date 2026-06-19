// Mock Pix "BR Code" (copia e cola) generator.
// Builds an EMV-MPM payload shaped like a real static Pix code, with a valid
// CRC16-CCITT checksum, so the QR scans as well-formed. DEMO ONLY — the key
// below is fictional and no real charge is created.

const PIX_KEY = "contato@purodoce.com.br"; // demo key
const MERCHANT = "PURO DOCE";
const CITY = "CURITIBA";

function tlv(id: string, value: string): string {
  const len = value.length.toString().padStart(2, "0");
  return `${id}${len}${value}`;
}

function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

const sanitize = (s: string, max: number) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .toUpperCase()
    .slice(0, max);

export function buildPixPayload(amount: number, txid: string): string {
  const gui = tlv("00", "br.gov.bcb.pix");
  const key = tlv("01", PIX_KEY);
  const merchantAccount = tlv("26", gui + key);

  const amountStr = amount.toFixed(2);
  const txidField = tlv("05", sanitize(txid, 25) || "PURODOCE");

  let payload =
    tlv("00", "01") + // payload format indicator
    merchantAccount +
    tlv("52", "0000") + // merchant category code
    tlv("53", "986") + // currency = BRL
    tlv("54", amountStr) +
    tlv("58", "BR") +
    tlv("59", sanitize(MERCHANT, 25)) +
    tlv("60", sanitize(CITY, 15)) +
    tlv("62", txidField) +
    "6304"; // CRC placeholder id+len

  payload += crc16(payload);
  return payload;
}

export function makeTxid(): string {
  // pseudo-unique, no Date.now dependency at module scope
  const rand = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `PD${rand}`;
}
