import Image from 'next/image'
import LeadForm from './lead-form'

/* =========================================================
   CONFIGURAÇÃO DA OFERTA
   Tudo que muda de campanha está aqui em cima.
   ========================================================= */
const OFERTA = {
  // Duas linhas com pesos diferentes: a chamada grande em cima,
  // o produto e a prova embaixo, menor.
  headline: (
    <>
      <span className="h1-forte">Pré-Black Friday</span>
      <span className="h1-leve">do Método VDE 60 dias para a OAB 48!</span>
    </>
  ),
  sub: (
    <>
      A oferta especial será enviada somente no dia <b>21/10 às 8h</b> e será
      encerrada assim que as vagas esgotarem!
    </>
  ),
  // Preço: deixe `de` ou `valor` como string vazia para esconder o bloco.
  de: '',
  valor: '',
  cta: 'Quero a condição especial',
  // Link do grupo de WhatsApp mostrado DEPOIS do envio.
  // Enquanto estiver vazio, o botão não aparece.
  grupoWhatsapp: '',
}

export default function Page() {
  return (
    <>
      <main className="stage">
        <div className="wrap">
          <div className="logo in">
            <Image
              src="/logo-pre-black-friday.png"
              alt="Pré Black Friday Método VDE"
              width={1050}
              height={1029}
              priority
            />
          </div>

          <h1 className="in" style={{ '--d': '0.16s' } as React.CSSProperties}>
            {OFERTA.headline}
          </h1>

          <p className="sub in" style={{ '--d': '0.24s' } as React.CSSProperties}>
            {OFERTA.sub}
          </p>

          {OFERTA.valor && (
            <div className="oferta in" style={{ '--d': '0.3s' } as React.CSSProperties}>
              {OFERTA.de && <span className="de">{OFERTA.de}</span>}
              <span className="por">por</span>
              <strong className="valor">{OFERTA.valor}</strong>
            </div>
          )}

          <div className="form-card in" id="inscricao" style={{ '--d': '0.36s' } as React.CSSProperties}>
            <LeadForm cta={OFERTA.cta} grupo={OFERTA.grupoWhatsapp} />
          </div>

          <div className="rodape in" style={{ '--d': '0.44s' } as React.CSSProperties}>
            <Image src="/logo-branca1f.svg" alt="Método VDE" width={203} height={65} />
            <p>Vício de Uma Estudante © {new Date().getFullYear()}</p>
          </div>
        </div>
      </main>
    </>
  )
}
