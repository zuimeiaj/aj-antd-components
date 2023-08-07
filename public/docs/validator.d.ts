interface RuleObject {
  pattern: RegExp
  message: string
  validator?(rule: object, value: any, callback: (errorString: string) => void)
}
export declare class ValidatorUtil {
  static EmailReg: RuleObject
  static MobileReg: RuleObject
  static CompanyCertCodeReg: RuleObject
  static UsernameReg: RuleObject
  static PwdReg: RuleObject
  static OrgCodeReg: RuleObject
  static MerchantCodeReg: RuleObject
  static TerminalCodeReg: RuleObject
  static NameReg: RuleObject
  static MerchantNameReg: RuleObject
  static IntegerReg: RuleObject
  static IDCardReg: RuleObject
  static NumberReg: RuleObject
}
