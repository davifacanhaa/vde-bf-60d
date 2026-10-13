# Pré Black Friday VDE — captura da Turma de 60 dias (OAB 48)

Página de captura de **uma dobra só** para a condição especial de Pré Black
Friday da Turma de 60 dias do Método VDE, 1ª fase da OAB 48.

## Identidade

Segue o **Guia Visual Black Friday VDE** (`BLACK FRIDAY VICIO.pdf`). As cores
foram amostradas pixel a pixel da página CORES do guia:

| Papel | Hex |
|---|---|
| Magenta (principal) | `#F93DF9` |
| Roxo elétrico (principal) | `#A400FF` |
| Roxo profundo (principal) | `#421870` |
| Preto (principal) | `#000000` |
| Azul (secundária) | `#649BF8` |
| Rosa (secundária) | `#CE148A` |
| Índigo (secundária) | `#1D0098` |

Tipografia do guia: **Poppins**. A display do guia é a *Doctor Glitch*, que não
é Google Font e não está instalada.

A estética glitch fica **só na logo do evento**. Texto e botões ficam limpos: o
efeito de aberração cromática na headline e as scanlines de CRT sobre a página
foram testados e removidos, porque atrapalhavam a leitura.

## Onde mudar a copy

Tudo que muda de campanha está na constante `OFERTA`, no topo de
[`app/page.tsx`](app/page.tsx): headline, subheadline, preço (`de` / `valor`,
deixe vazio para esconder o bloco) e texto do botão. O trecho dentro de
`<span className="glitch">` recebe o efeito glitch.

## Dobra única

O layout fecha dentro da altura da tela em todos os tamanhos de retrato
testados, de 320x568 a 1920x1080. A logo escala por `svh` e há regras de
compressão para telas muito pequenas (`max-height: 620px`), telas baixas
(`max-height: 800px`) e notebooks (`min-width: 768px` + `max-height: 1000px`).

Em celular deitado (ex.: 844x390) o conteúdo não cabe e a página rola, o que é
esperado. A centralização usa `margin: auto` no `.wrap` em vez de
`align-items: center`, justamente para que o topo continue alcançável quando
isso acontece.

**Ao mexer na copy, confira se a dobra continua fechando.** A headline é a parte
mais sensível: `.h1-forte` precisa caber em uma linha.

## Captura de leads

O formulário envia `nome`, `whatsapp`, `email` e `origem: "captura-bf-60d"` via
POST JSON para `NEXT_PUBLIC_LEAD_ENDPOINT`. **Sem essa variável o formulário
mostra o sucesso mas não grava o lead.** Veja [`.env.example`](.env.example).

Depois do envio aparece o botão de entrar no grupo do WhatsApp, vindo de
`OFERTA.grupoWhatsapp` em `app/page.tsx`. **Enquanto esse link estiver vazio o
botão não aparece** e o texto cai para a versão sem grupo.

## Desenvolvimento

```bash
npm run dev     # http://localhost:3240 (preview "bf-60d" no launch.json)
npm run build
```
