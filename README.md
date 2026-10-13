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
é Google Font e não está instalada; o efeito glitch da headline é reproduzido em
CSS (aberração cromática magenta + azul) sobre a Poppins.

## Onde mudar a copy

Tudo que muda de campanha está na constante `OFERTA`, no topo de
[`app/page.tsx`](app/page.tsx): headline, subheadline, preço (`de` / `valor`,
deixe vazio para esconder o bloco) e texto do botão. O trecho dentro de
`<span className="glitch">` recebe o efeito glitch.

## Dobra única

O layout fecha dentro da altura da tela em todos os tamanhos testados
(360x640 até 1920x1080). A logo escala por `svh` e há regras de compressão para
telas baixas (`max-height: 800px`) e notebooks (`min-width: 768px` +
`max-height: 1000px`). Ao mexer na copy, confira se a dobra continua fechando.

## Captura de leads

O formulário envia `nome`, `whatsapp`, `email` e `origem: "captura-bf-60d"` via
POST JSON para `NEXT_PUBLIC_LEAD_ENDPOINT`. **Sem essa variável o formulário
mostra o sucesso mas não grava o lead.** Veja [`.env.example`](.env.example).

## Desenvolvimento

```bash
npm run dev     # http://localhost:3240 (preview "bf-60d" no launch.json)
npm run build
```
