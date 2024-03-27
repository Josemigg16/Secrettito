import ChooseLanguage from "@/components/ChooseLanguage.jsx";

export default function Home() {
  return (
    <main className="bg-ig relative h-screen overflow-hidden">
      <header className="absolute flex justify-end top-0 h-24 w-full">
        <ChooseLanguage className="mr-5" />
      </header>
      <section className="grid h-full md:grid-cols-3">
        <div className="hidden md:block"></div>
        <div className="flex items-center">
          <article className="mx-5 h-96 w-full rounded-lg bg-white p-5">
            <h2>Registrate para recibir mensajes anónimos</h2>
            <form></form>
          </article>
        </div>
      </section>
    </main>
  );
}
