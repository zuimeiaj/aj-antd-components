import moment from 'moment'
import { saveAs } from 'file-saver'
import { message } from 'ant-design-vue'

export const requiredMsg = (msg, rule = []) => ({
  rules: [{ required: true, message: msg }, ...rule],
})

export const waitForSeconds = async (s = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, s * 1000)
  })
}

/**
 * 遍历数组，树，对象
 * @param {object|array} item 数据结构 树、数组、对象
 * @param {function<item,index>} callback 回调函数
 * @param {string} [childName] 树形结构中的字段名称
 */
export const forEach = (item, callback, childName) => {
  // eslint-disable-next-line valid-typeof
  if (typeof Object.prototype.toString.call(item) === '[object Object]') {
    for (let key in item) {
      callback(item[key], key)
    }
  } else if (Array.isArray(item)) {
    const eachArray = (items, parent) => {
      for (let i = 0; i < items.length; i += 1) {
        let obj = items[i]
        callback(obj, i, parent)
        if (childName && obj && obj[childName] && Array.isArray(obj[childName])) {
          eachArray(obj[childName], obj)
        }
      }
    }
    eachArray(item)
  }
}
export const removeEmptyProp = (obj) => {
  const result = {}
  for (let key in obj) {
    if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
      result[key] = obj[key]
      if (typeof result[key] === 'string') {
        result[key] = obj[key].trim()
      }
    }
  }
  return result
}

export function getPwdWithRandom(len = 16) {
  let id = '@#$%^&*@#$%^&*'
  let rid = id.charAt(Math.floor(Math.random() * id.length))
  let rindex = Math.floor(Math.random() * len)
  let str = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbm1234567890'
  let result = []
  for (let index = 0; index < len - 1; index++) {
    const element = str.charAt(Math.floor(Math.random() * str.length))
    result.push(element)
  }
  result.splice(rindex, 0, rid)
  return result.join('')
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
}

export function downloadByBuffer(buffer, fileName) {
  saveAs(new Blob([buffer]), fileName)
}

export function updateArrayItem(array, index, callback) {
  let copyOfArray = array.slice()
  let item = { ...copyOfArray[index] }
  copyOfArray[index] = callback({ ...item })
  return copyOfArray
}

export function validateFormFields(form) {
  return new Promise((resolve, reject) => {
    form.validateFields((error, value) => {
      if (error) return reject(error)
      resolve({ ...value })
    })
  })
}

export function isEmpty(object) {
  return object === '' || object === undefined || object === null
}

export function getYearsSelect() {
  let year = moment().year()
  let array = []
  for (let i = 0; i < 20; i++) {
    array.push({
      label: year + '年',
      value: year,
    })
    year -= 1
  }
  return array
}
export function displayByCondition(array = []) {
  return array.filter((item) => {
    if ('show' in item) {
      return item.show
    }
    return true
  })
}

export function getMonthSelect() {
  let month = 11
  let array = []
  for (let i = 0; i < 12; i++) {
    array.push({
      label: month + 1 + '月',
      value: month,
    })
    month -= 1
  }
  return array
}

export function generateuid() {
  return 'D_' + Math.random().toString().slice(2)
}

export function downloadFiles(taskCallback) {
  let destroy = message.loading({ content: '下载中,请稍后...', duration: 0 })
  taskCallback().finally(destroy)
}
