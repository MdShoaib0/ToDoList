import InputForm from "../component/InputForm";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          TaskFlow Dashboard
        </h1>
        <InputForm />
      </div>
      <Footer />
    </div>
  );
}