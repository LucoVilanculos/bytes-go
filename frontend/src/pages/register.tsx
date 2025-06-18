import { RegisterSwitcher } from "../components/auth/register/register";

export const RegisterPage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400"
    >
      <RegisterSwitcher />
    </div>
  );
}