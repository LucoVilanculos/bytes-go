export const generateDriverRejectionAlert = (name: string, reason: string) => {
  return `Hello ${name}, your driver application was rejected due to: ${reason}. Please check your email for more details.`
}
