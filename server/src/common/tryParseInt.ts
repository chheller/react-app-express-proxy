export default function tryParseInt(out: string | number, radix = 10) {
  try {
    out = parseInt(out as string, radix);
    return true;
  } catch (err) {
    return false;
  }
}
