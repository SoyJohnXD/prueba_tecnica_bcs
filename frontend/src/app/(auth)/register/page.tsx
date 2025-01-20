"use client";
import { useRegister } from "@/services/api/authService";
import Card from "@/components/ui/Card";
import IconBubble from "@/components/ui/IconBubble";
import { FaPersonChalkboard } from "react-icons/fa6";
import { Register as IRegister } from "@/types/auth";
import { RegisterForm } from "./components/RegisterForm";

const Register = () => {
  const register = useRegister();

  const handleRegister = (formData: IRegister) => {
    register.mutate(formData);
  };

  return (
    <main className="bg-neutral-light min-h-screen mx-auto flex md:flex-row">
      <picture className="hidden md:block flex-1 bg-[url('/static/img/auth/register-background.webp')] bg-cover"></picture>
      <section className="w-full h-screen overflow-auto sm:max-w-2xl bg-neutral-light grid place-content-center c-space">
        <Card className="w-full sm:w-[500px] py-8 bg-white flex flex-col items-center justify-center c-space">
          <IconBubble
            icon={<FaPersonChalkboard color="white" size={22} />}
            className="bg-primary-500 w-[43px] h-[43px]"
          />
          <RegisterForm
            onSubmit={handleRegister}
            isLoading={register.status === "pending"}
            error={
              register.isError
                ? "Error al registrar el usuario, verifique sus datos"
                : undefined
            }
          />
        </Card>
      </section>
    </main>
  );
};

export default Register;
