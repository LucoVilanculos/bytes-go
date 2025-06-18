export const generateWelcomeMessage = (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  return {
    subject: `Welcome to the Transport Platform, ${name}!`,
    html: `
      <h2>Hello ${name} 👋</h2>
      <p>You've been registered as a <strong>${role.toUpperCase()}</strong>.</p>
      <p>Your login details are:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>Change your password on first login for security.</p>
      <p>Thanks for joining us! 🚀</p>
    `
  }
}
