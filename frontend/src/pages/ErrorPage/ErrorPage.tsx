import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';


export default function ErrorPage() {
  window.document.title = 'Página não encontrada';

  return (
    <div className="flex items-center justify-center flex-col w-full h-screen gap-10">
      <Logo size={20} />
      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-white text-5xl font-extrabold text-center text-pretty">Página <br className='sm:hidden' /> não encontrada</p>
        <p className="text-[#A5A5A5] text-center text-lg md:text-xl">Não encontramos a página que você queria.</p>
        <Link to="/" className="bg-white p-3 text-black font-semibold px-8 rounded-full mt-8">Início</Link>
      </div>
    </div>
  );
}
