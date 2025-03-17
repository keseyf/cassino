import React from 'react';
import Footer from '../components/Footer';

const TermsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      {/* Cabeçalho */}
      <header className="bg-zinc-900 text-center md:text-start text-white p-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold">Termos e Condições</h1>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Bem-vindo à nossa Casa de Apostas Online</h2>
        <p className="mb-6">
          Ao acessar ou utilizar nossos serviços, você concorda em cumprir todos os termos e condições aqui descritos.
          Por favor, leia atentamente antes de continuar.
        </p>

        {/* Seções dos Termos */}
        <section className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-zinc-900">1. Responsabilidade do Usuário</h3>
            <p>
              O usuário é o único responsável pelas suas ações ao utilizar a plataforma. As apostas realizadas são de
              inteira responsabilidade do jogador, e ele deve estar ciente de que existe o risco de perda financeira.
              Não nos responsabilizamos por qualquer valor perdido nas apostas.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-zinc-900">2. Riscos Associados</h3>
            <p>
              Ao realizar apostas, o usuário declara que está ciente de que há um risco de perda do valor investido.
              Recomendamos que os usuários apostem apenas o que estão dispostos a perder. Apostas em plataformas de
              jogos podem causar vícios, e os jogadores devem estar cientes de seu comportamento e tomar as medidas
              necessárias para evitar danos.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-zinc-900">3. Idade Legal para Apostar</h3>
            <p>
              Apenas maiores de idade (18 anos ou conforme a legislação local) podem acessar nossa plataforma e realizar
              apostas. O usuário deve garantir que está cumprindo as leis e regulamentos de sua jurisdição.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-zinc-900">4. Política de Privacidade</h3>
            <p>
              Coletamos informações pessoais para garantir a segurança das apostas e o cumprimento dos regulamentos
              aplicáveis. Sua privacidade é importante para nós, e você pode consultar nossa Política de Privacidade
              para mais detalhes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-zinc-900">5. Modificações nos Termos</h3>
            <p>
              Reservamo-nos o direito de alterar os termos e condições a qualquer momento. Quaisquer alterações serão
              publicadas nesta página, e o usuário deverá verificar regularmente as atualizações.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-zinc-900">6. Isenção de Responsabilidade</h3>
            <p>
              A plataforma não se responsabiliza por qualquer perda financeira ou danos causados pela participação em
              atividades de apostas. O usuário concorda que utiliza os serviços por sua própria conta e risco, ciente de
              que as apostas podem envolver riscos financeiros consideráveis.
            </p>
          </div>
        </section>

        {/* Aviso de Risco */}
        <div className="mt-10 p-6 bg-red-100 text-red-800 rounded-md">
          <h3 className="text-xl font-semibold">Aviso Importante</h3>
          <p>
            A prática de apostas online envolve risco. Ao acessar e utilizar nossos serviços, você confirma que está
            ciente dos riscos financeiros envolvidos e que é plenamente responsável pelas suas ações.
          </p>
        </div>
      </div>
      <div className='w-full flex items-center justify-center'>

        <a href="/" className='text-center text-blue-600 my-2'>Voltar</a>
      </div>
      {/* Rodapé */}
      <Footer />
    </div>
  );
}

export default TermsPage;
