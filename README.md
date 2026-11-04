# 🐉 Dragaum

App pessoal gamificado (estilo Duolingo) com duas trilhas:

- **🎨 UX Design**: fundamentos, leis de UX, Gestalt, heurísticas de Nielsen, UX Research, Design Thinking & Double Diamond, arquitetura da informação, UI visual, acessibilidade (WCAG 2.2), UX Writing, Design System (Atomic Design, tokens, governança), métricas (HEART, A/B) e gamificação/dark patterns.
- **🚗 Teoria de Direção (CNH)**: jornada da CNH com a Resolução CONTRAN 1.020/2025, categorias, PPD, legislação e SNT, infrações e penalidades, sinalização (placas desenhadas em SVG), normas de circulação, direção defensiva, primeiros socorros, meio ambiente, mecânica, exame prático (nova pontuação) e motos/ACC.

## Recursos

- Trilha com unidades, lições (cards de teoria + exercícios) e **teste da unidade** (chefão)
- Exercícios: múltipla escolha, verdadeiro/falso, ligar pares e ordenar
- Erros voltam no fim da lição; **revisão espaçada** (caixas de Leitner: 1, 3, 7, 14, 30 dias)
- **Simulado** da prova teórica (30 questões, aprovação com 20) + mini simulado
- XP, níveis, ofensiva (streak) com escudos, meta diária, conquistas, combo
- **Biblioteca** com toda a teoria pesquisável + galeria de placas
- Responsivo (mobile com tab bar, desktop com sidebar e painel lateral), tema claro/escuro
- **PWA** instalável e offline; progresso salvo no aparelho (exportar/importar JSON)
- Atalhos no desktop: `1`-`4` escolhem a alternativa, `Enter` verifica/continua

## Desenvolvimento

```bash
npm install
npm run dev      # servidor local
npm run check    # typecheck + validação do conteúdo
npm run build    # build de produção em dist/
```

Identidade visual: mascote Dragaum (vermelho + creme + dourado) em `public/mascot/` (hello, happy, sad, thinking, angry, icon), ícones Material Symbols Rounded e fontes empacotadas no build (funcionam offline).
Ao usar um ícone novo, rode `node scripts/fonts.mjs` para regerar o subconjunto da fonte de ícones (as fontes ficam em `src/assets/fonts` e recebem hash no build).

O conteúdo fica em `src/data/` (`ux1.ts`, `ux2.ts`, `dir1.ts`, `dir2.ts`) usando os helpers de `src/data/h.ts`.
Ícones do PWA em `public/icons/`.

## Banco de dados (Supabase)

- Login por e-mail e senha (Supabase Auth). Sem conta, o app funciona só neste aparelho.
- Tabela `public.progress` (1 linha por usuária, JSON com todo o progresso) com RLS: cada pessoa só lê e grava a própria linha. SQL em `supabase/migrations/`.
- O app salva localmente primeiro (funciona offline) e envia para o Supabase ~1,5 s após cada mudança; ao abrir, voltar à aba ou reconectar, baixa e **mescla** com o que estiver na nuvem (`src/sync.ts`).
- Configuração em `.env.example` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`: chave publicável).
