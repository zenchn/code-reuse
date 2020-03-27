// 1.校验字符串类型
//checkType('165226226326','mobile')
//result：false
export function checkType(str, type) {
  switch (type) {
    case "email":
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case "mobile":
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
    case "tel":
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case "number":
      return /^[0-9]$/.test(str);
    case "text":
      return /^\w+$/.test(str);
    case "chinese":
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case "lower":
      return /^[a-z]+$/.test(str);
    case "upper":
      return /^[A-Z]+$/.test(str);
    default:
      return true;
  }
}

// 2.验证数字
/**
 * @param { string } value
 */
export const isNumber = value => /^\d{1,}$/g.test(value);

// 3.验证小数
/**
 * @param { string } value
 */
export const isDecimal = value => /^\d+\.\d+$/g.test(value);

// 4.验证整数

//正整数正则
var posPattern = /^\d+$/;
//负整数正则
var negPattern = /^-\d+$/;
//整数正则
var intPattern = /^-?\d+$/;

// 5.验证 Email
/**
 * @param { string } value
 */
export const isEmail = value =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(
    value
  );

// 6.验证手机号
/**
 * @param { string } value
 */
export const isMPRelaxed = value =>
  /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value);

// 7.校验密码强度
//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
export const pPattern = value =>
  /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(value);
