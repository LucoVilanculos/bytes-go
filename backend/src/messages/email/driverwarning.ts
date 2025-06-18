export const generateDriverWarningMessage = (name: string) => {
  return {
    subject: "Important: Unprofessional Behavior Notice",
    html: `
      <h2>Hello ${name},</h2>
      <p>We have received reports of behavior that goes against our platform's rules.</p>
      <p>This includes negotiating prices outside the app or canceling accepted rides without reason.</p>
      <p>Please review our guidelines and avoid repeated violations.</p>
      <p>If you have questions, contact support.</p>
    `
  }
}
