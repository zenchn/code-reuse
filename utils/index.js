// 目录
// - 字符串相关  7行
// - 数组相关    70行
// - 时间相关    126行
// - 其他       148行

//***************字符串相关***************/
//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
//trim('  1235asd',1)
//result：1235asd
export function trim(str, type) {
  switch (type) {
    case 1:
        return str.replace(/\s+/g, "");
    case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
        return str.replace(/(^\s*)/g, "");
    case 4:
        return str.replace(/(\s*$)/g, "");
    default:
        return str;
  }
}

//字符串替换(字符串,要替换的字符或者正则表达式（不要写g）,替换成什么)
export function replaceAll(str, AFindText, ARepText) {
    let raRegExp = new RegExp(AFindText, "g");
    return str.replace(raRegExp, ARepText);
}

//检测字符串
//checkType('165226226326','mobile')
//result：false
export function checkType(str, type) {
  switch (type) {
    case 'email':
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'mobile':
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
    case 'tel':
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'number':
        return /^[0-9]$/.test(str);
    case 'english':
        return /^[a-zA-Z]+$/.test(str);
    case 'text':
        return /^\w+$/.test(str);
    case 'chinese':
        return /^[\u4E00-\u9FA5]+$/.test(str);
    case 'lower':
        return /^[a-z]+$/.test(str);
    case 'upper':
        return /^[A-Z]+$/.test(str);
    default:
        return true;
  }
}

//格式化处理字符串
//formatText('1234asda567asd890',4,'-')
//result："1-234a-sda5-67as-d890"
export function formatText(str, size = 3, delimiter = ',') {
  let regText = '\\B(?=(\\w{' + size + '})+(?!\\w))';
  let reg = new RegExp(regText, 'g');
  return str.replace(reg, delimiter);
}


//***************数组相关***************/
//数组去重
export function removeRepeatArray(arr) {
  return [...new Set(arr)]
}

//数组顺序打乱
export function upsetArr(arr) {
  return arr.sort(() => {
      return Math.random() - 0.5
  });
}

//数组最大值
//这一块的封装，主要是针对数字类型的数组
export function maxArr(arr) {
  return Math.max.apply(null, arr);
}

//数组最小值
export function minArr(arr) {
  return Math.min.apply(null, arr);
}

// 排序（快排）
export function quickSort(arr) {
  if(arr.length <=1){
    return arr;
  }
  var left = [],
      right = [],
      current = arr.splice(0,1);

  for(let i = 0; i < arr.length;i++){
    if(arr[i] < current) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(current,quickSort(right))
}

//数组扁平化
export function flatten(arr) {
  return [].concat(...arr)
}

// 从数组中找出元素，并删除
// destroyer([1,2,3,4,1,3,2],1,2) //[3,4,3]
export function destroyer(arr, ...items) {
  var removeArgs = new Set(items)
  return arr.filter(v => !removeArgs.has(v))
}


//***************时间相关***************/
//到某一个时间的倒计时
//getEndTime('2019/7/22 16:0:0')
//result："剩余时间6天 2小时 28 分钟20 秒"
export function getEndTime(endTime) {
  let startDate = new Date(); //开始时间，当前时间
  let endDate = new Date(endTime); //结束时间，需传入时间参数
  let t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
  let d = 0,
      h = 0,
      m = 0,
      s = 0;
  if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor(t / 1000 / 60 / 60 % 24);
      m = Math.floor(t / 1000 / 60 % 60);
      s = Math.floor(t / 1000 % 60);
  }
  return {d,h,m,s};
}


//*************** 其他 ***************/
//函数节流
// let count=0;
// function fn1(){
//     count++;
//     console.log(count)
// }
// //100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
// document.onmousemove=delayFn(fn1,100,200)
export function delayFn(fn, delay, mustDelay) {
  let timer = null;
  let t_start;
  return function () {
    let context = this, args = arguments, t_cur = +new Date();
    //先清理上一次的调用触发（上一次调用触发事件不执行）
    clearTimeout(timer);
    //如果不存触发时间，那么当前的时间就是触发时间
    if (!t_start) {
        t_start = t_cur;
    }
    //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
    if (t_cur - t_start >= mustDelay) {
        fn.apply(context, args);
        t_start = t_cur;
    }
    //否则延迟执行
    else {
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
  };
}
