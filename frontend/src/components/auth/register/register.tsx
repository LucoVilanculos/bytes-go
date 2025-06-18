import { useState } from "react";
import { RegisterCustomerForm } from "./customer";
import { RegisterDriverForm } from "./driver";
import { Button } from "../../ui/button";

export const RegisterSwitcher = () => {
  const [role, setRole] = useState<"customer" | "driver">("customer");

  return (
    <div>
      <div className="flex justify-center gap-2 mb-4">
        <Button onClick={() => setRole("customer")} variant={role === "customer" ? "default" : "outline"}>Cliente</Button>
        <Button onClick={() => setRole("driver")} variant={role === "driver" ? "default" : "outline"}>Motorista</Button>
      </div>
      {role === "customer" && <RegisterCustomerForm />}
      {role === "driver" && <RegisterDriverForm />}
    </div>
  );
};