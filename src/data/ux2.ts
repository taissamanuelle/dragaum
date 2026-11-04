import type { Unit } from '../types'
import { L, card, mc, tf, match, order } from './h'

export const uxUnits2: Unit[] = [
  {
    id: 'ux-ia',
    title: 'Arquitetura e fluxos',
    desc: 'IA, navegação, user flows e wireframes',
    icon: 'account_tree',
    color: '#14b8a6',
    lessons: [
      L('ux-ia-1', 'Arquitetura da informação', [
        card('O que é IA', 'Arquitetura da Informação é organizar, estruturar e rotular conteúdo para que as pessoas **encontrem e entendam** o que precisam.\n\nReferência clássica: o "livro do urso polar" de **Louis Rosenfeld e Peter Morville**.'),
        card('Os 4 sistemas de Rosenfeld & Morville', '- **Organização**: como o conteúdo é agrupado (categorias, esquemas).\n- **Rotulagem**: como as coisas são nomeadas.\n- **Navegação**: como as pessoas se movem.\n- **Busca**: como encontram diretamente.'),
        card('Esquemas de organização', '- **Exatos**: alfabético, cronológico, geográfico.\n- **Ambíguos**: por tópico, por tarefa, por público, por metáfora.\n\nE estruturas: **hierárquica** (árvore), **sequencial** (passo a passo), **matriz**, **rede/hipertexto**.'),
        card('Padrões de navegação', '- **Tab bar** (mobile): 3 a 5 destinos principais, sempre visíveis.\n- **Sidebar** (desktop): muitos destinos.\n- **Menu hambúrguer**: esconde e reduz descoberta.\n- **Breadcrumbs**: "você está aqui" em hierarquias profundas.\n- **Navegação local** e **contextual** (links relacionados).'),
      ], [
        match('Ligue os sistemas de IA', [['Como agrupamos', 'Organização'], ['Como nomeamos', 'Rotulagem'], ['Como nos movemos', 'Navegação'], ['Como achamos direto', 'Busca']]),
        mc('Esquema alfabético é um esquema de organização…', ['Exato', 'Ambíguo', 'Por público', 'Por tarefa'], 0),
        mc('Quantos destinos uma tab bar mobile costuma ter?', ['1 a 2', '3 a 5', '8 a 10', 'Quantos quiser'], 1),
        tf('O menu hambúrguer aumenta a descoberta das funcionalidades.', false, 'Ele esconde opções; o que está fora da vista tende a ser menos usado.'),
        mc('Breadcrumbs servem para…', ['Mostrar onde o usuário está numa hierarquia', 'Decorar o topo', 'Fazer login', 'Mostrar notificações'], 0),
        mc('Organizar um site de mercado por "Para bebês / Para pets / Para casa" é esquema por…', ['Público', 'Ordem alfabética', 'Cronologia', 'Geografia'], 0),
      ]),
      L('ux-ia-2', 'Fluxos, wireframes e protótipos', [
        card('Tipos de fluxo', '- **Task flow**: caminho linear de uma tarefa, sem desvios.\n- **User flow**: caminho de um perfil, com decisões e caminhos alternativos.\n- **Wireflow**: fluxo desenhado com as telas (wireframes) no lugar das caixas.\n\nNo fluxograma, **losango = decisão**, retângulo = etapa/tela, oval = início/fim.'),
        card('Wireframes', 'Esqueleto da tela: **estrutura, hierarquia e conteúdo**, sem estética final.\n\n- **Baixa fidelidade**: papel, caixas. Rápido e barato.\n- **Média**: digital, cinza, conteúdo real.\n- **Alta**: visual próximo do final (mockup).'),
        card('Protótipos', 'Simulam interação para **testar** antes de construir.\n\n- **Papel** e **clicável** (Figma)\n- **Mágico de Oz**: um humano simula o sistema por trás\n- **Protótipo de fachada**: só a superfície, como no Design Sprint\n\nRegra: a fidelidade deve combinar com a **pergunta** que você quer responder.'),
      ], [
        mc('No fluxograma, o losango representa…', ['Início', 'Decisão', 'Tela', 'Fim'], 1),
        mc('Fluxo com wireframes no lugar das caixas é um…', ['Task flow', 'Wireflow', 'Sitemap', 'Moodboard'], 1),
        tf('Wireframe de baixa fidelidade deve ter as cores finais da marca.', false),
        mc('Uma pessoa simulando "por trás" as respostas de um chatbot no teste é um protótipo…', ['Mágico de Oz', 'Papel', 'Alta fidelidade', 'Wireflow'], 0),
        order('Ordene da menor para a maior fidelidade', ['Esboço em papel', 'Wireframe digital cinza', 'Mockup visual', 'Protótipo interativo de alta fidelidade']),
        tf('A fidelidade do protótipo deve depender da pergunta que você quer responder.', true),
      ]),
    ],
  },
  {
    id: 'ux-ui',
    title: 'UI Design visual',
    desc: 'Hierarquia, cor, tipografia, grid e estados',
    icon: 'brush',
    color: '#f43f5e',
    lessons: [
      L('ux-ui-1', 'Hierarquia visual e layout', [
        card('Hierarquia visual', 'Guia o olhar na ordem de importância. Ferramentas: **tamanho, peso, cor, contraste, posição, espaço**.\n\nTeste do "olhar desfocado" (*squint test*): aperte os olhos — o que ainda se destaca é o que domina a hierarquia.'),
        card('Padrões de leitura', '- **Padrão F**: em páginas com muito texto, as pessoas leem as primeiras linhas e escaneiam a lateral esquerda.\n- **Padrão Z**: em páginas com pouco texto (landing pages), o olho percorre um "Z".\n\nColoque o essencial onde o olhar passa.'),
        card('Espaçamento e grid 8pt', 'Use uma escala de espaçamento consistente, em geral múltiplos de **8** (4, 8, 16, 24, 32, 48…).\n\nGrids de colunas: comum **4 colunas no mobile, 8 no tablet, 12 no desktop**, com gutters e margens definidos.\n\nRegra: **espaço interno ≤ espaço externo** (grupo coeso, separado dos outros).'),
        card('Uma ação primária', 'Cada tela deve ter, sempre que possível, **uma ação principal** clara. Botões secundários menos destacados, ações destrutivas separadas e confirmadas.'),
      ], [
        mc('O squint test serve para…', ['Testar contraste de cores', 'Ver o que domina a hierarquia visual', 'Checar ortografia', 'Medir velocidade'], 1),
        mc('Em páginas com muito texto, o padrão de leitura comum é o…', ['Padrão Z', 'Padrão F', 'Padrão O', 'Padrão espiral'], 1),
        mc('Qual valor NÃO pertence a uma escala de 8pt?', ['8', '16', '24', '13'], 3),
        tf('Num grupo, o espaço interno deve ser maior que o espaço que o separa dos outros grupos.', false, 'É o contrário: espaço interno menor, para que a proximidade agrupe.'),
        match('Colunas típicas de grid', [['Mobile', '4 colunas'], ['Tablet', '8 colunas'], ['Desktop', '12 colunas']]),
        tf('Ter uma ação primária clara por tela ajuda a reduzir o tempo de decisão.', true),
      ]),
      L('ux-ui-2', 'Cor', [
        card('Modelos e harmonia', '- **HSL** (matiz, saturação, luminosidade) é ótimo para criar escalas.\n- Harmonias: **monocromática, análoga, complementar, tríade**.\n- **Regra 60-30-10**: 60% cor dominante (fundo), 30% secundária, 10% de destaque.'),
        card('Cores semânticas', 'Cores com significado de **estado**:\n\n- **Sucesso**: verde\n- **Erro/perigo**: vermelho\n- **Alerta**: amarelo/laranja\n- **Informação**: azul\n\nNunca comunique **apenas com cor** — use também ícone e texto (daltonismo afeta cerca de 8% dos homens).'),
        card('Escalas tonais', 'Crie escalas (50 → 900) para cada cor. Ex.: `primary-500` para botões, `primary-100` para fundos suaves, `primary-700` para hover.\n\nNo **dark mode**, não basta inverter: reduza a saturação, evite preto puro (#000) e branco puro em grandes áreas, e use elevação com tons mais claros.'),
      ], [
        mc('Na regra 60-30-10, os 10% são para…', ['Fundo', 'Texto', 'Destaques', 'Bordas'], 2),
        tf('É aceitável indicar um erro apenas deixando a borda vermelha, sem texto.', false, 'Daltônicos podem não perceber. Combine cor + ícone + texto.'),
        mc('Cores opostas no círculo cromático formam uma harmonia…', ['Análoga', 'Complementar', 'Monocromática', 'Tríade'], 1),
        mc('No dark mode, é recomendado…', ['Usar preto puro #000 em tudo', 'Inverter todas as cores', 'Reduzir saturação e usar cinzas escuros', 'Usar só branco puro no texto e fundo'], 2),
        match('Cores semânticas', [['Sucesso', 'Verde'], ['Erro', 'Vermelho'], ['Alerta', 'Amarelo'], ['Informação', 'Azul']]),
      ]),
      L('ux-ui-3', 'Tipografia', [
        card('Anatomia e classificação', '- **Serifadas**: com "pezinhos" (Times, Merriweather).\n- **Sem serifa**: (Inter, Roboto, Helvetica) — dominam interfaces.\n- **Monoespaçadas**: todos os caracteres com mesma largura (código).\n\nAltura-x maior = melhor legibilidade em tamanhos pequenos.'),
        card('Boas práticas', '- Texto corrido: **16px** como base no mobile/web.\n- **Altura de linha** de ~1,4 a 1,6 para corpo de texto.\n- **45 a 75 caracteres por linha** (ideal ~66).\n- 1 ou 2 famílias tipográficas no máximo.\n- Evite texto todo em CAIXA ALTA em parágrafos.'),
        card('Escala tipográfica', 'Use uma **escala modular** (ex.: razão 1,25 — *major third*): 12, 16, 20, 25, 31, 39…\n\nDefina papéis: display, h1, h2, h3, body, caption, label. Hierarquia vem de **tamanho + peso + cor**, não só tamanho.'),
      ], [
        mc('Qual o comprimento de linha ideal para leitura confortável?', ['10–20 caracteres', '45–75 caracteres', '120–150 caracteres', 'Não importa'], 1),
        mc('Altura de linha recomendada para corpo de texto:', ['1,0', '1,4 a 1,6', '2,5', '3,0'], 1),
        tf('Usar 5 famílias tipográficas numa interface reforça a hierarquia.', false, 'Use 1 ou 2. Hierarquia vem de tamanho, peso e cor.'),
        mc('Fontes onde todos os caracteres têm a mesma largura são…', ['Serifadas', 'Monoespaçadas', 'Script', 'Display'], 1),
        mc('Tamanho base comum para texto corrido na web:', ['10px', '12px', '16px', '24px'], 2),
      ]),
      L('ux-ui-4', 'Componentes, estados e motion', [
        card('Estados de componente', 'Todo componente interativo precisa de estados:\n\n**default · hover · focus · pressed/active · disabled · loading · error · success**\n\nE telas precisam de estados: **vazio (empty state), carregando, erro, parcial e ideal**.'),
        card('Botões', '- **Primário**: ação principal (1 por área).\n- **Secundário**: alternativa.\n- **Terciário/ghost**: ação de baixa ênfase.\n- **Destrutivo**: excluir, sair (vermelho, com confirmação).\n\nRótulos com **verbo + objeto**: "Salvar meta", "Começar lição".'),
        card('Motion com propósito', 'Animação serve para **feedback, orientação e continuidade**, não decoração.\n\n- Microinterações: **100–200 ms**\n- Transições de tela: **200–500 ms**\n- Use *easing* (ease-out para entrar, ease-in para sair)\n- Respeite `prefers-reduced-motion`.'),
      ], [
        mc('Qual estado indica navegação por teclado no elemento?', ['Hover', 'Focus', 'Disabled', 'Pressed'], 1),
        mc('Duração típica de uma microinteração:', ['10 ms', '100–200 ms', '2 s', '5 s'], 1),
        tf('Empty state é a tela que aparece quando ainda não há conteúdo, e deve orientar o próximo passo.', true),
        mc('Melhor rótulo para botão:', ['OK', 'Enviar', 'Clique aqui', 'Salvar meta diária'], 3),
        tf('Usuários com sensibilidade a movimento podem ativar "reduzir movimento", e o app deve respeitar.', true),
        match('Ligue o botão ao uso', [['Ação principal', 'Primário'], ['Excluir conta', 'Destrutivo'], ['Ação alternativa', 'Secundário'], ['Baixa ênfase', 'Ghost']]),
      ]),
    ],
  },
  {
    id: 'ux-a11y',
    title: 'Acessibilidade',
    desc: 'WCAG, contraste, leitores de tela e inclusão',
    icon: 'accessibility_new',
    color: '#0ea5e9',
    lessons: [
      L('ux-a11y-1', 'WCAG e POUR', [
        card('WCAG', 'As **Web Content Accessibility Guidelines** são do **W3C** (WAI). Versão atual: **WCAG 2.2** (2023). A WCAG 3.0 está em desenvolvimento.\n\nNíveis de conformidade: **A** (mínimo), **AA** (padrão exigido pela maioria das leis) e **AAA** (máximo).'),
        card('Os 4 princípios: POUR', '- **Perceptível**: a informação pode ser percebida (alt text, legendas, contraste).\n- **Operável**: dá para operar (teclado, tempo suficiente, sem convulsões).\n- **Compreensível**: dá para entender (linguagem clara, comportamento previsível).\n- **Robusto**: funciona com tecnologias assistivas (HTML semântico).'),
        card('No Brasil', '- **Lei Brasileira de Inclusão (Lei 13.146/2015)** — Estatuto da Pessoa com Deficiência — obriga acessibilidade em sites de empresas e órgãos públicos.\n- **eMAG**: Modelo de Acessibilidade em Governo Eletrônico.\n- **ABNT NBR 17225** (2025): norma brasileira de acessibilidade digital.'),
      ], [
        mc('Quem publica as WCAG?', ['ISO', 'W3C', 'Google', 'ABNT'], 1),
        order('Ordene as letras do POUR', ['Perceptível', 'Operável', 'Compreensível', 'Robusto']),
        mc('O nível de conformidade exigido pela maioria das leis é…', ['A', 'AA', 'AAA', 'AAAA'], 1),
        mc('Legendas em vídeos atendem principalmente ao princípio…', ['Perceptível', 'Operável', 'Robusto', 'Compreensível'], 0),
        tf('A Lei Brasileira de Inclusão (13.146/2015) trata também de acessibilidade em sites.', true),
        match('Ligue', [['Navegar só pelo teclado', 'Operável'], ['HTML semântico para leitores de tela', 'Robusto'], ['Linguagem clara', 'Compreensível'], ['Texto alternativo em imagens', 'Perceptível']]),
      ]),
      L('ux-a11y-2', 'Contraste, alvos e foco', [
        card('Contraste (WCAG AA)', '- Texto normal: **4,5:1**\n- Texto grande (≥ 24px, ou ≥ 18,66px negrito): **3:1**\n- Componentes de interface e gráficos (bordas de input, ícones): **3:1**\n- AAA: 7:1 para texto normal.'),
        card('Tamanho de alvo', '- WCAG 2.2 **AA (2.5.8)**: mínimo **24 × 24 px** CSS (ou espaçamento equivalente).\n- WCAG **AAA (2.5.5)**: **44 × 44 px**.\n- Apple HIG recomenda **44 × 44 pt**; Material Design, **48 × 48 dp**.'),
        card('Foco e teclado', '- Tudo que é clicável deve ser alcançável com **Tab** e acionável com **Enter/Espaço**.\n- **Foco visível** sempre (nunca `outline: none` sem substituto).\n- Ordem de foco lógica.\n- WCAG 2.2 adicionou critérios para foco não ficar escondido (2.4.11).'),
      ], [
        mc('Contraste mínimo AA para texto normal:', ['2:1', '3:1', '4,5:1', '7:1'], 2),
        mc('Contraste mínimo AA para texto grande e componentes de interface:', ['3:1', '4,5:1', '7:1', '1,5:1'], 0),
        mc('Tamanho mínimo de alvo no WCAG 2.2 nível AA:', ['16 × 16 px', '24 × 24 px', '44 × 44 px', '60 × 60 px'], 1),
        tf('Remover o outline de foco sem colocar outro indicador prejudica usuários de teclado.', true),
        match('Ligue', [['Apple HIG', '44 × 44 pt'], ['Material Design', '48 × 48 dp'], ['WCAG AAA', '44 × 44 px'], ['WCAG AA (2.2)', '24 × 24 px']]),
        mc('Contraste AAA para texto normal:', ['4,5:1', '5:1', '7:1', '10:1'], 2),
      ]),
      L('ux-a11y-3', 'Leitores de tela e conteúdo', [
        card('Tecnologias assistivas', '- Leitores de tela: **NVDA** e **JAWS** (Windows), **VoiceOver** (Apple), **TalkBack** (Android).\n- Ampliadores, controle por voz, switch, teclado braille.'),
        card('Texto alternativo', 'Descreva a **função/informação** da imagem, não "imagem de…".\n\n- Informativa: descreva o essencial.\n- Decorativa: `alt=""` (vazio) para o leitor pular.\n- Ícone-botão sem texto: precisa de nome acessível ("Fechar").'),
        card('HTML semântico e ARIA', '**Primeira regra do ARIA**: se existe um elemento HTML nativo com a semântica e comportamento que você precisa, **use-o** em vez de ARIA.\n\n`<button>` em vez de `<div role="button">`. Use headings em ordem (h1 → h2 → h3), labels em inputs, landmarks (header, nav, main).'),
      ], [
        mc('Leitor de tela nativo dos iPhones:', ['TalkBack', 'NVDA', 'VoiceOver', 'JAWS'], 2),
        mc('Imagem puramente decorativa deve ter…', ['alt="imagem decorativa"', 'alt="" (vazio)', 'Nenhum atributo alt', 'alt com o nome do arquivo'], 1),
        tf('A primeira regra do ARIA é: prefira elementos HTML nativos quando possível.', true),
        mc('Um botão só com ícone de "X" precisa de…', ['Nada', 'Um nome acessível como "Fechar"', 'Cor vermelha', 'Animação'], 1),
        match('Ligue o leitor à plataforma', [['TalkBack', 'Android'], ['VoiceOver', 'Apple'], ['NVDA', 'Windows (gratuito)']]),
      ]),
    ],
  },
  {
    id: 'ux-writing',
    title: 'UX Writing',
    desc: 'Microcopy, voz e tom, erros e CTAs',
    icon: 'edit_note',
    color: '#a855f7',
    lessons: [
      L('ux-wri-1', 'Microcopy que ajuda', [
        card('Princípios', 'Textos de interface devem ser: **claros, concisos e úteis** (e humanos).\n\n- Escreva para quem escaneia: **o mais importante primeiro**.\n- Use a palavra que o **usuário** usa.\n- Voz ativa: "Salvamos seu progresso" em vez de "O progresso foi salvo".'),
        card('Voz × tom', '- **Voz**: personalidade da marca — **constante** (ex.: Dragaum é encorajador, divertido e direto).\n- **Tom**: varia com o **contexto** e a emoção do momento. Num erro de pagamento, menos piada e mais clareza.'),
        card('Mensagens de erro', 'Boa mensagem de erro:\n\n1. Diz **o que aconteceu**\n2. Diz **por quê** (se ajudar)\n3. Diz **como resolver**\n\nSem culpar o usuário, sem jargão, sem "Ops!" vazio.\n\n**Ruim:** "Entrada inválida."\n**Bom:** "A senha precisa de pelo menos 8 caracteres."'),
        card('CTAs e empty states', '- CTA: **verbo + resultado** ("Começar a primeira lição").\n- Empty state: explique o que vai aparecer ali e **como começar**.\n- Confirmações destrutivas: repita a ação no botão ("Excluir conta", não "Sim").'),
      ], [
        mc('Qual o melhor botão de confirmação para apagar uma trilha?', ['Sim', 'OK', 'Apagar trilha', 'Continuar'], 2),
        tf('Voz da marca muda a cada tela; tom é sempre o mesmo.', false, 'É o contrário: voz é constante, tom se adapta ao contexto.'),
        mc('Melhor mensagem de erro:', ['Erro 500', 'Ops! Algo deu errado.', 'Não conseguimos salvar. Verifique sua internet e tente de novo.', 'Usuário cometeu um erro.'], 2),
        order('Ordene uma boa mensagem de erro', ['O que aconteceu', 'Por que aconteceu', 'Como resolver']),
        mc('Um empty state de "Revisão" ideal diz…', ['Nada aqui.', 'Lista vazia.', 'Você ainda não errou nada! Os erros das lições aparecem aqui para revisar.', 'Erro: nenhum item'], 2),
        tf('Voz ativa costuma deixar a microcopy mais clara.', true),
      ]),
    ],
  },
  {
    id: 'ux-ds',
    title: 'Design System',
    desc: 'Tokens, componentes, Atomic Design e governança',
    icon: 'widgets',
    color: '#6366f1',
    lessons: [
      L('ux-ds-1', 'O que é um Design System', [
        card('Definição', 'Um Design System é um **conjunto vivo** de padrões, componentes, princípios, código e documentação que permite criar produtos consistentes em escala.\n\n**Style guide** (visual) e **biblioteca de componentes** são **partes** de um design system, não o todo.'),
        card('Camadas', '1. **Princípios** de design\n2. **Fundamentos/foundations**: cor, tipografia, espaçamento, grid, ícones, motion, voz\n3. **Design tokens**\n4. **Componentes** (design + código)\n5. **Padrões** (receitas: formulários, onboarding, erros)\n6. **Documentação** e **governança**'),
        card('Exemplos famosos', '- **Material Design** — Google\n- **Human Interface Guidelines** — Apple (diretrizes)\n- **Carbon** — IBM\n- **Polaris** — Shopify\n- **Lightning** — Salesforce (pioneiro em design tokens)\n- **Fluent** — Microsoft\n- **Atlassian Design System**'),
      ], [
        tf('Uma biblioteca de componentes no Figma, sozinha, já é um Design System completo.', false, 'Faltam princípios, tokens, código, documentação e governança.'),
        match('Ligue o DS à empresa', [['Material', 'Google'], ['Carbon', 'IBM'], ['Polaris', 'Shopify'], ['Lightning', 'Salesforce']]),
        mc('Qual empresa é reconhecida como pioneira no uso de design tokens?', ['Salesforce', 'Apple', 'Netflix', 'Spotify'], 0),
        mc('"Receitas" de uso como formulário de cadastro ou tela de erro são…', ['Tokens', 'Padrões (patterns)', 'Átomos', 'Princípios'], 1),
        tf('Design System é um produto vivo que evolui com versões.', true),
      ]),
      L('ux-ds-2', 'Atomic Design', [
        card('Brad Frost', 'Metodologia criada por **Brad Frost** (2013, livro de 2016), inspirada na química. 5 níveis:'),
        card('Os 5 níveis', '1. **Átomos**: elementos básicos (botão, label, input, ícone, cor)\n2. **Moléculas**: grupos simples (campo de busca = label + input + botão)\n3. **Organismos**: seções complexas (header, card de lição, lista)\n4. **Templates**: estrutura da página com placeholders\n5. **Páginas**: templates com conteúdo real'),
      ], [
        order('Ordene os níveis do Atomic Design', ['Átomos', 'Moléculas', 'Organismos', 'Templates', 'Páginas']),
        mc('Um campo de busca (label + input + botão) é um…', ['Átomo', 'Molécula', 'Organismo', 'Template'], 1),
        mc('Um header com logo, navegação e busca é um…', ['Átomo', 'Molécula', 'Organismo', 'Página'], 2),
        mc('Quem criou o Atomic Design?', ['Brad Frost', 'Don Norman', 'Jakob Nielsen', 'Dieter Rams'], 0),
        tf('Página, no Atomic Design, é o template preenchido com conteúdo real.', true),
      ]),
      L('ux-ds-3', 'Design tokens', [
        card('O que são', 'Tokens são **decisões de design nomeadas** e armazenadas como dados (JSON), compartilhadas entre design e código: cores, espaçamentos, raios, sombras, tipografia, durações.\n\nO **W3C Design Tokens Community Group** padroniza o formato (a especificação chegou à primeira versão estável em 2025).'),
        card('3 camadas de tokens', '- **Primitivos/globais**: valores brutos → `purple-500: #8b5cf6`\n- **Semânticos/alias**: intenção → `color-action-primary: {purple-500}`\n- **De componente**: específicos → `button-primary-bg: {color-action-primary}`\n\nTrocar de tema (dark mode, marca) = trocar o mapeamento dos semânticos.'),
        card('Nomeação', 'Padrão comum: **categoria-propriedade-variante-estado**\n\n`color-background-danger-hover`, `space-inset-md`, `radius-card`, `font-size-body`.\n\nNomeie pela **função**, não pela aparência ("danger", não "red").'),
      ], [
        mc('`color-action-primary` é um token…', ['Primitivo', 'Semântico', 'De componente', 'Inválido'], 1),
        mc('Para criar um dark mode com tokens, normalmente trocamos…', ['Os primitivos de lugar', 'O mapeamento dos tokens semânticos', 'Todos os componentes', 'As fontes'], 1),
        tf('É melhor nomear um token como "vermelho-botao" do que "danger".', false, 'Nomeie pela função; a aparência pode mudar.'),
        match('Ligue a camada ao exemplo', [['purple-500: #8b5cf6', 'Primitivo'], ['color-text-error', 'Semântico'], ['button-primary-bg', 'Componente']]),
        mc('Quem está padronizando o formato de design tokens?', ['W3C Design Tokens Community Group', 'ISO', 'Apple', 'Figma apenas'], 0),
      ]),
      L('ux-ds-4', 'Componentes, documentação e governança', [
        card('Documentando um componente', 'Para cada componente:\n\n- **Quando usar / quando não usar**\n- **Anatomia** (partes nomeadas)\n- **Variantes** (tamanho, tipo) e **estados**\n- **Comportamento** e responsividade\n- **Acessibilidade** (teclado, ARIA, contraste)\n- **Conteúdo** (como escrever os textos)\n- Exemplos do/don\'t e **código**'),
        card('Governança', '- Modelos: **centralizado** (time dedicado), **federado** (vários times contribuem), **híbrido**.\n- Processo de **contribuição**: proposta → revisão → design + código → documentação → release.\n- **Versionamento semântico**: MAJOR.MINOR.PATCH (quebra.funcionalidade.correção).\n- Changelog e comunicação de mudanças.'),
        card('Handoff', 'Passagem do design ao desenvolvimento: especificações, tokens, estados, comportamentos, assets e casos de borda. Com um DS maduro, o handoff vira **"use o componente X, variante Y"**.'),
      ], [
        mc('No versionamento semântico 2.4.1 → 3.0.0, houve…', ['Correção de bug', 'Nova funcionalidade compatível', 'Mudança que quebra compatibilidade', 'Nada'], 2),
        mc('Modelo de governança em que vários times contribuem com o DS:', ['Centralizado', 'Federado', 'Solitário', 'Ad hoc'], 1),
        tf('A documentação de um componente deve incluir quando NÃO usá-lo.', true),
        match('SemVer', [['MAJOR', 'Quebra compatibilidade'], ['MINOR', 'Nova funcionalidade compatível'], ['PATCH', 'Correção']]),
        order('Ordene o fluxo de contribuição', ['Proposta', 'Revisão', 'Design e código', 'Documentação', 'Release']),
      ]),
    ],
  },
  {
    id: 'ux-metrics',
    title: 'Métricas e estratégia',
    desc: 'HEART, funis, NPS, OKRs e experimentos',
    icon: 'monitoring',
    color: '#22c55e',
    lessons: [
      L('ux-met-1', 'HEART e GSM', [
        card('Framework HEART (Google)', 'Criado por **Kerry Rodden** e equipe no Google (2010):\n\n- **Happiness** — satisfação (surveys, NPS)\n- **Engagement** — intensidade de uso\n- **Adoption** — novos usuários de um recurso\n- **Retention** — quem volta\n- **Task success** — eficiência e eficácia'),
        card('GSM: Goals → Signals → Metrics', 'Para cada letra do HEART:\n\n1. **Goal**: o que queremos?\n2. **Signal**: que comportamento indica sucesso?\n3. **Metric**: como medimos?\n\nEx.: Retention → aluno volta a estudar → % de usuários ativos no D7.'),
        card('Outras métricas', '- **AARRR (pirata)**: Acquisition, Activation, Retention, Referral, Revenue.\n- **CSAT**: satisfação com interação específica.\n- **CES**: esforço do cliente.\n- **Retenção D1/D7/D30**, **DAU/MAU** (stickiness).\n- **OKR**: Objetivo qualitativo + Resultados-chave mensuráveis.'),
      ], [
        order('Ordene as letras do HEART', ['Happiness', 'Engagement', 'Adoption', 'Retention', 'Task success']),
        order('Ordene o processo GSM', ['Goals', 'Signals', 'Metrics']),
        mc('% de pessoas que voltam no 7º dia é métrica de…', ['Adoption', 'Retention', 'Happiness', 'Task success'], 1),
        mc('O "A" de Activation no AARRR significa…', ['Primeira experiência de valor', 'Anúncio pago', 'Avaliação na loja', 'Atualização'], 0),
        tf('DAU/MAU é usado para medir "stickiness" (o quanto o produto gruda).', true),
        match('Ligue', [['Satisfação pontual', 'CSAT'], ['Esforço', 'CES'], ['Recomendação', 'NPS'], ['Objetivo + resultados-chave', 'OKR']]),
      ]),
      L('ux-met-2', 'Experimentos e teste A/B', [
        card('Teste A/B', 'Duas (ou mais) versões mostradas aleatoriamente para grupos diferentes. Compara uma **métrica primária**.\n\n- Defina **hipótese** e métrica **antes**\n- Calcule o **tamanho de amostra**\n- Não pare o teste no primeiro resultado bom (*peeking*)\n- Significância estatística típica: **95%** (p < 0,05)'),
        card('Limites', 'A/B diz **o quê** funciona melhor, não **por quê**. Combine com pesquisa qualitativa.\n\nMetrics de guarda (*guardrails*): garanta que melhorar conversão não piorou retenção ou satisfação.'),
      ], [
        tf('Num teste A/B, é ok parar assim que o resultado parecer bom.', false, 'Isso é "peeking" e infla falsos positivos. Defina amostra e duração antes.'),
        mc('Nível de confiança mais usado em testes A/B:', ['50%', '80%', '95%', '100%'], 2),
        mc('O teste A/B responde principalmente…', ['Por que os usuários preferem', 'Qual versão performa melhor numa métrica', 'Como é o modelo mental', 'Qual a persona'], 1),
        tf('Métricas de guarda (guardrails) evitam que uma melhoria numa métrica prejudique outra importante.', true),
      ]),
    ],
  },
  {
    id: 'ux-game',
    title: 'Gamificação e comportamento',
    desc: 'Motivação, hábitos e dark patterns',
    icon: 'sports_esports',
    color: '#eab308',
    lessons: [
      L('ux-game-1', 'Motivação e hábitos', [
        card('Teoria da Autodeterminação (SDT)', '**Deci & Ryan**: motivação intrínseca depende de 3 necessidades:\n\n- **Autonomia** — sentir que escolhe\n- **Competência** — sentir que evolui\n- **Relacionamento** — sentir conexão\n\nRecompensas externas mal usadas podem **minar** a motivação intrínseca (efeito de superjustificação).'),
        card('Modelo de Fogg: B = MAP', '**BJ Fogg** (Stanford): um comportamento acontece quando **Motivação**, **Habilidade (Ability)** e um **Prompt** (gatilho) convergem no mesmo momento.\n\nQuer um hábito? Facilite muito (tiny habits) e coloque um gatilho certo.'),
        card('Hook Model', '**Nir Eyal** (*Hooked*): **Gatilho → Ação → Recompensa variável → Investimento**.\n\nPoderoso — e por isso exige ética. Use para criar hábitos que a pessoa **quer** ter.'),
        card('Octalysis', '**Yu-kai Chou**: 8 core drives — significado épico, desenvolvimento e realização, empoderamento da criatividade, propriedade, influência social, escassez, imprevisibilidade e perda/evitação.\n\nOs de cima ("white hat") geram bem-estar; os de baixo ("black hat") geram urgência e ansiedade.'),
      ], [
        match('Necessidades da SDT', [['Sentir que escolhe', 'Autonomia'], ['Sentir que evolui', 'Competência'], ['Sentir conexão', 'Relacionamento']]),
        mc('No modelo de Fogg (B = MAP), o "P" é…', ['Prêmio', 'Prompt (gatilho)', 'Persona', 'Preço'], 1),
        order('Ordene o Hook Model', ['Gatilho', 'Ação', 'Recompensa variável', 'Investimento']),
        mc('Quem criou o Octalysis?', ['Yu-kai Chou', 'Nir Eyal', 'BJ Fogg', 'Jane McGonigal'], 0),
        tf('Recompensas externas sempre aumentam a motivação intrínseca.', false, 'Podem diminuí-la (efeito de superjustificação).'),
        mc('Um streak que causa ansiedade explora qual drive "black hat"?', ['Perda e evitação', 'Significado épico', 'Criatividade', 'Realização'], 0),
      ]),
      L('ux-game-2', 'Mecânicas e dark patterns', [
        card('PBL não é tudo', '**Pontos, Badges e Leaderboards** são a camada superficial. Gamificação boa tem: **metas claras, feedback imediato, desafio equilibrado (flow), progresso visível e escolha**.\n\n**Flow** (Csikszentmihalyi): o desafio acompanha a habilidade — nem tédio, nem ansiedade.'),
        card('Dark patterns (deceptive patterns)', 'Termo de **Harry Brignull** (2010). Exemplos:\n\n- **Confirmshaming**: "Não, prefiro continuar burro"\n- **Roach motel**: fácil entrar, difícil cancelar\n- **Sneak into basket**: itens adicionados sem pedir\n- **Urgência falsa**: contador que reinicia\n- **Disguised ads**: anúncio parecendo conteúdo\n- **Nagging**: pedir a mesma coisa repetidamente'),
        card('Repetição espaçada', 'Curva do esquecimento (**Ebbinghaus**): esquecemos rápido sem revisão. Revisar em **intervalos crescentes** (1, 3, 7, 14 dias…) fortalece a memória.\n\nO sistema de caixas de **Leitner** e o algoritmo **SM-2** (SuperMemo/Anki) aplicam isso. A aba Revisão do Dragaum usa caixas de Leitner!'),
      ], [
        mc('"Não, obrigado, não quero economizar" é um exemplo de…', ['Confirmshaming', 'Roach motel', 'Nagging', 'Bait and switch'], 0),
        mc('Assinatura que se faz em 1 clique mas só se cancela por telefone é…', ['Roach motel', 'Confirmshaming', 'Sneak into basket', 'Flow'], 0),
        mc('Quem cunhou o termo "dark patterns"?', ['Harry Brignull', 'Don Norman', 'Nir Eyal', 'Brad Frost'], 0),
        tf('No estado de flow, o desafio está equilibrado com a habilidade da pessoa.', true),
        mc('A curva do esquecimento foi descrita por…', ['Ebbinghaus', 'Miller', 'Fitts', 'Hick'], 0),
        match('Ligue', [['Caixas de revisão', 'Leitner'], ['Algoritmo do Anki', 'SM-2'], ['Desafio = habilidade', 'Flow'], ['Pontos, badges, rankings', 'PBL']]),
      ]),
    ],
  },
]
