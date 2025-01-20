import Card from "@/components/ui/Card";
import IconBubble from "@/components/ui/IconBubble";
import { FaLock } from "react-icons/fa6";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="bg-neutral-light h-screen mx-auto flex flex-row">
      <picture className="hidden md:block flex-1 bg-[url('/static/img/auth/login-background.jpg')] bg-cover"></picture>
      <section className="w-full  h-screen overflow-auto sm:max-w-2xl bg-neutral-light grid place-content-center c-space">
        <Card className="w-[350px] sm:w-[500px] py-8 bg-white flex flex-col items-center justify-center c-space">
          <IconBubble
            icon={<FaLock color="white" size={22} />}
            className="bg-primary-500 w-[43px] h-[43px]"
          />
          {children}
        </Card>
      </section>
    </main>
  );
};
