export const EmailReg = {
  pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
  message: '请输入正确的邮箱',
}
export const MobileReg = {
  pattern: /^1[2-9][0-9]{9}$/,
  message: '请输入正确手机号',
}
export const CompanyCertCodeReg = {
  pattern: /^[0-9a-zA-Z]{15,18}$/,
  message: '统一社会信用代码格式错误',
}
export const UsernameReg = {
  pattern: /^[\w]{4,20}$/,
  message: '请输入4-20位数字/字母/下滑线',
}
export const PwdReg = {
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
  message: '密码长度为8-16位，且必须包含大小写字母和数字',
}
export const OrgCodeReg = {
  pattern: /^\d{4,25}$/,
  message: '请输入4-25位数字编码',
}
export const MerchantCodeReg = {
  pattern: /^\d{4,25}$/,
  message: '请输入4-25位数字编码',
}
export const TerminalCodeReg = {
  pattern: /^[a-zA-Z0-9]{4,25}$/,
  message: '请输入4-25位终端号(支持大小写数字)',
}
export const NameReg = {
  pattern: /^[\u4e00-\u9fa5A-Za-z0-9]+$/,
  message: '请输入正确的名称(支持中文/字母/数字)',
}
export const MerchantNameReg = {
  pattern: /^[\u4e00-\u9fa5A-Za-z0-9]{2,25}$/,
  message: '请输入2-25位名称(支持中文/字母/数字)',
}
export const IntegerReg = {
  pattern: /^\d*$/,
  message: '请输入整数',
}

export const IDCardReg = {
  pattern: /^\d{17}[xX*0-9]$/,
  message: '请输入18位身份证号码',
}
export const NumberReg = {
  validator: (rule, value, cb) => {
    if (isNaN(value)) return cb('请输入数字')
    cb()
  },
}
