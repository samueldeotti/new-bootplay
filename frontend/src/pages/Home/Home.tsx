import Header from "../../components/Header/Header";
import MainContainer from "../../components/MainContainer/MainContainer";
import Background from "../../components/Background/Background";
import Title from "../../components/Title/Title";
import { ButtonNavHeader } from "../../components/Header/NavHeader";

export default function Home() {
  window.document.title = 'BootPlay';

  return (
    <Background bgImage="fundo" childClassName="h-screen">
      <Header hasBackground />
      <MainContainer className="w-[95%] md:w-[85%] lg:w-2/3 lg:gap-8 gap-4">
        <Title className="text-white w-full sm:text-6xl leading-tight">
          A história da música não pode ser esquecida!
        </Title>
        <p className="text-base w-5/6 text-pretty text-white sm:text-2xl">
          Crie já sua conta e curta os sucessos que marcaram os tempos no Vinil.
        </p>
        <ButtonNavHeader
          path="/signup"
          className="w-40 sm:w-48 text-secondaryDark bg-homeButton py-2 sm:py-3">
          Inscrever-se
        </ButtonNavHeader>
      </MainContainer>
    </Background>
  );
}
