export const isSingleByte = (str) => {
  str = (str == null) ? "" : str;
  if (str.match(/^[\x20-\x7e]*$/)) {
    return true;
  } else {
    return false;
  }
}