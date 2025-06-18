export const generateResetPasswordMessage = (name: string, resetToken: string) => {
  return {
    subject: "Password Reset Request",
    html: `
      <h2>Hello ${name},</h2>
      <p>We received a request to reset your password.</p>
      <p>Click the link below to set a new password:</p>
      <a href="https://yourapp.com/reset-password/${resetToken}">Reset Password</a>
      <p>If you didn't request this, just ignore this email.</p>
    `
  }
}
