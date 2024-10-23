export const REGEXPATTERNS={
    password: <Pattern>{
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,50}$/,
        errorMsg: "Password must be 8-50 chars, with uppercase, lowercase, number, and special character."
      }
}

interface Pattern {
    pattern : RegExp,
    errorMsg : string
}