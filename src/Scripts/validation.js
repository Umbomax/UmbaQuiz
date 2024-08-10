

export default function isPasswordsSame(str1, str2) {
    return str1 === str2 ? true : false;
  }

  export function isEmail(str) {
    str = str.split("@");
  
    if (str.length !== 2 || str[0].length === 0) {
      return false;
    }
    let secondMaiPart = str[1].split(".");
    if (secondMaiPart.length !== 2 || secondMaiPart[0].length === 0 || secondMaiPart[1].length === 0) {
      return false;
    }
    return true;
  }

  export function isFill(str) {
    return str.trim().length > 0 ? true : false;
  }
