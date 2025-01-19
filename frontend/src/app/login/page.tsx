import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const login = () => {
  return (
    <main className="max-w-7xl bg-neutral-light h-screen mx-auto grid place-items-center">
      <section className=" rounded-base max-w-md border py-8 bg-white border-neutral-gray  c-space">
        <h1>Hola mundo</h1>
        <Input
          type="email"
          placeholder="correo@ejemplo.com"
          /*  value={email}
        onChange={(e) => setEmail(e.target.value)} */
          className="pl-10 rounded"
          required
        />

        <Button type="submit" className="w-full">
          Continuar
        </Button>
      </section>
    </main>
  );
};

export default login;
