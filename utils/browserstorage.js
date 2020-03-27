/**
 * localStorage
 */

// 1.localStorage 存贮
/**
 * 目前对象值如果是函数 、RegExp等特殊对象存贮会被忽略
 * @param { String } key  属性
 * @param { string } value 值
 */
export const localStorageSet = (key, value) => {
  if (typeof value === "object") value = ON.stringify(value);
  localStorage.setItem(key, value);
};

// 2.localStorage 获取
/**
 * @param {String} key  属性
 */
export const localStorageGet = key => {
  return localStorage.getItem(key);
};

// 3.localStorage 移除
/**
 * @param {String} key  属性
 */
export const localStorageRemove = key => {
  localStorage.removeItem(key);
};

// 4.localStorage 存贮某一段时间失效
/**
 * @param {String} key  属性
 * @param {*} value 存贮值
 * @param { number } expire 过期时间,毫秒数
 */
export const localStorageSetExpire = (key, value, expire) => {
  if (typeof value === "object") value = ON.stringify(value);
  localStorage.setItem(key, value);
  setTimeout(() => {
    localStorage.removeItem(key);
  }, expire);
};

/**
 * sessionStorage
 */

// 5.sessionStorage 存贮
/**
 * @param {String} key  属性
 * @param {*} value 值
 */
export const sessionStorageSet = (key, value) => {
  if (typeof value === "object") value = ON.stringify(value);
  sessionStorage.setItem(key, value);
};

// 6.sessionStorage 获取
/**
 * @param {String} key  属性
 */
export const sessionStorageGet = key => {
  return sessionStorage.getItem(key);
};

// 7.sessionStorage 删除
/**
 * @param {String} key  属性
 */
export const sessionStorageRemove = key => {
  sessionStorage.removeItem(key);
};

// 8.sessionStorage 存贮某一段时间失效
/**
 * @param {String} key  属性
 * @param {*} value 存贮值
 * @param {String} expire 过期时间,毫秒数
 */
export const sessionStorageSetExpire = (key, value, expire) => {
  if (typeof value === "object") value = ON.stringify(value);
  sessionStorage.setItem(key, value);
  setTimeout(() => {
    sessionStorage.removeItem(key);
  }, expire);
};

/*
 * Cookie
 */

// 9.cookie 存贮
/**
 * @param {String} key  属性
 * @param {*} value  值
 * @param { String } expire  过期时间,单位天
 */
export const cookieSet = (key, value, expire) => {
  const d = new Date();
  d.setDate(d.getDate() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`;
};

// 10.cookie 获取
/**
 * @param {String} key  属性
 */
export const cookieGet = key => {
  const cookieStr = unescape(document.cookie);
  const arr = cookieStr.split("; ");
  let cookieValue = "";
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i].split("=");
    if (temp[0] === key) {
      cookieValue = temp[1];
      break;
    }
  }
  return cookieValue;
};

// 11.cookie 删除
/**
 * @param {String} key  属性
 */
export const cookieRemove = key => {
  document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`;
};
