// 1.格式化时间戳为时间
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}


// 2.时钟
/***
 *  @return {string} timeText 返回系统时间字符串
 */
export function getdataTimeSec() {
  let time = new Date();
  let weekDay;
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  //获取时分秒
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  //检查是否小于10
  h = check(h);
  m = check(m);
  s = check(s);
  let now_day = time.getDay();
  switch (now_day) {
      case 0: {
          weekDay = "星期日"
      }
          break;
      case 1: {
          weekDay = "星期一"
      }
          break;
      case 2: {
          weekDay = "星期二"
      }
          break;
      case 3: {
          weekDay = "星期三"
      }
          break;
      case 4: {
          weekDay = "星期四"
      }
          break;
      case 5: {
          weekDay = "星期五"
      }
          break;
      case 6: {
          weekDay = "星期六"
      }
          break;
      case 7: {
          weekDay = "星期日"
      }
          break;
  }
  let timeText = year + "年" + month + "月" + day + "日  " + " " + weekDay + " " + h + ":" + m +":" + s;

  return timeText
}

// 3.倒计时
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
