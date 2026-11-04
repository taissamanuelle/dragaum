import type { Lesson } from '../types'
import { L, card, mc, tf, match, order } from './h'

/** Lições de aprofundamento, anexadas às unidades existentes (chave = id da unidade) */
export const extraUx: Record<string, Lesson[]> = {
  'ux-fund': [
    L('ux-fund-4', 'Design centrado no ser humano (ISO 9241-210)', [
      card('A norma do processo', 'A **ISO 9241-210** (revisada em 2019) descreve o **design centrado no ser humano** para sistemas interativos. Enquanto a 9241-11 define *o que é* usabilidade, a 210 diz *como trabalhar* para chegar nela.'),
      card('Os 6 princípios', '1. O design se baseia no **entendimento explícito** de usuários, tarefas e ambientes\n2. Os usuários são **envolvidos** durante todo o projeto\n3. O design é guiado e refinado por **avaliação centrada no usuário**\n4. O processo é **iterativo**\n5. O design aborda **toda a experiência** do usuário\n6. A equipe tem **habilidades e perspectivas multidisciplinares**'),
      card('As 4 atividades do ciclo', '1. **Entender e especificar o contexto de uso** (quem, o quê, onde, com quais recursos)\n2. **Especificar os requisitos** do usuário\n3. **Produzir soluções** de design\n4. **Avaliar** as soluções contra os requisitos\n\nSe a avaliação falha, o ciclo volta para a atividade que precisa de ajuste.'),
      card('Contexto de uso', 'É a combinação de **usuários, objetivos, tarefas, recursos e ambiente** (físico, social e técnico).\n\nO mesmo app pode ser ótimo no sofá e péssimo no ônibus lotado, com uma mão só e sol na tela. Projetar sem conhecer o contexto é projetar para ninguém.'),
    ], [
      mc('A ISO 9241-210 trata principalmente de…', ['Cores acessíveis', 'O processo de design centrado no ser humano', 'Leis de trânsito digitais', 'Padrões de código'], 1),
      order('Ordene as atividades do ciclo da ISO 9241-210', ['Entender o contexto de uso', 'Especificar requisitos do usuário', 'Produzir soluções de design', 'Avaliar as soluções']),
      tf('Pela ISO 9241-210, o processo de design centrado no ser humano é iterativo.', true),
      mc('Qual destes NÃO é um princípio da ISO 9241-210?', ['Envolver usuários durante o projeto', 'Equipe multidisciplinar', 'Decidir tudo antes de qualquer teste', 'Abordar toda a experiência'], 2),
      match('Ligue as normas', [['O que é usabilidade', 'ISO 9241-11'], ['Como fazer design centrado no humano', 'ISO 9241-210']]),
      mc('"Usar o app com uma mão, no ônibus, com sol na tela" descreve o…', ['Modelo mental', 'Contexto de uso', 'Wireframe', 'Design token'], 1),
    ]),
    L('ux-fund-5', 'Design emocional: os 3 níveis de Norman', [
      card('Por que emoção importa', 'No livro *Design Emocional* (2004), Don Norman mostra que emoção e cognição andam juntas: pessoas felizes tendem a ser mais criativas e tolerantes a pequenos problemas. Ele propõe três níveis de processamento.'),
      card('Visceral', 'Reação **imediata e automática** à aparência: cor, forma, som, textura. Acontece antes de qualquer reflexão.\n\nEx.: a primeira impressão ao abrir o app, o mascote fofo, a animação de celebração.'),
      card('Comportamental', 'O prazer e a eficácia **durante o uso**: a sensação de controle, de que as coisas funcionam como esperado, de fluidez.\n\nÉ aqui que a usabilidade mora.'),
      card('Reflexivo', 'O nível da **consciência, do significado e da memória**: o que o produto diz sobre mim, a história que conto depois, o orgulho de uma ofensiva de 100 dias.\n\nÉ o mais duradouro, e o que mais influencia lealdade.'),
    ], [
      order('Ordene os níveis do design emocional, do mais imediato ao mais duradouro', ['Visceral', 'Comportamental', 'Reflexivo']),
      match('Ligue o exemplo ao nível', [['Gostei da cor assim que abri', 'Visceral'], ['Concluí a tarefa sem travar', 'Comportamental'], ['Tenho orgulho da minha ofensiva', 'Reflexivo']]),
      mc('Quem escreveu *Design Emocional*?', ['Jakob Nielsen', 'Don Norman', 'Brad Frost', 'Tim Brown'], 1),
      tf('O nível comportamental está ligado à usabilidade e à sensação de controle.', true),
      mc('Uma animação de confete ao terminar a lição atua principalmente no nível…', ['Visceral', 'Reflexivo', 'Normativo', 'Técnico'], 0),
      mc('Qual nível mais influencia a lealdade a longo prazo?', ['Visceral', 'Comportamental', 'Reflexivo', 'Nenhum'], 2),
    ]),
  ],

  'ux-leis': [
    L('ux-leis-4', 'Vieses cognitivos nas decisões', [
      card('Atalhos mentais', 'Daniel Kahneman descreve dois modos de pensar: **Sistema 1** (rápido, automático, intuitivo) e **Sistema 2** (lento, deliberado, analítico). Interfaces conversam quase sempre com o Sistema 1, e é aí que os vieses aparecem.'),
      card('Ancoragem e enquadramento', '- **Ancoragem**: o primeiro número visto vira referência. Mostrar "de R$ 99 por R$ 49" faz R$ 49 parecer barato.\n- **Enquadramento (framing)**: a mesma informação muda de efeito pela forma. "95% de aprovação" soa melhor que "5% de reprovação".'),
      card('Default, perda e prova social', '- **Efeito default (status quo)**: a maioria mantém a opção pré-selecionada. Defaults são decisões de design com enorme impacto.\n- **Aversão à perda**: perder dói mais do que ganhar a mesma coisa alegra (Kahneman e Tversky). Por isso "não perca sua ofensiva" é tão forte.\n- **Prova social**: seguimos o que outras pessoas fazem ("mais escolhido").'),
      card('Usar com ética', 'Conhecer vieses serve para **reduzir atrito e ajudar a decidir bem**, não para enganar.\n\nPergunta de controle: *a pessoa faria a mesma escolha se entendesse tudo?* Se não, você está criando um dark pattern.'),
    ], [
      match('Ligue o viés ao exemplo', [['"De R$ 99 por R$ 49"', 'Ancoragem'], ['Opção já marcada', 'Efeito default'], ['"Não perca sua ofensiva!"', 'Aversão à perda'], ['"Plano mais escolhido"', 'Prova social']]),
      mc('"95% de aprovação" versus "5% de reprovação" ilustra o…', ['Efeito halo', 'Enquadramento', 'Lei de Fitts', 'Fechamento'], 1),
      tf('O Sistema 1 de Kahneman é rápido e intuitivo.', true),
      mc('Por que defaults são tão poderosos?', ['Porque as pessoas tendem a manter o que já vem selecionado', 'Porque ficam em negrito', 'Porque carregam mais rápido', 'Porque são obrigatórios por lei'], 0),
      tf('Usar vieses para levar a pessoa a uma escolha que ela não faria se entendesse tudo é um dark pattern.', true),
      mc('Segundo Kahneman e Tversky, perder algo costuma pesar…', ['Menos que ganhar', 'Igual a ganhar', 'Mais que ganhar a mesma coisa', 'Nada'], 2),
    ]),
  ],

  'ux-gestalt': [
    L('ux-gestalt-3', 'Gestalt aplicada a telas reais', [
      card('Formulários', '- Label **colado** ao campo (proximidade) e mais espaço entre um par label/campo e o próximo.\n- Mensagem de erro logo **abaixo** do campo certo, não no topo da página.\n- Campos relacionados (endereço) dentro de um mesmo **grupo visual** (região comum).'),
      card('Cards e listas', '- Tudo que pertence a um item fica dentro do mesmo card (região comum).\n- Cards com o mesmo estilo indicam itens do mesmo tipo (semelhança).\n- Uma linha divisória fraca agrupa menos que o espaço em branco bem usado.'),
      card('Navegação e estados', '- Item ativo diferente dos outros (quebra de semelhança chama atenção).\n- Abas conectadas ao conteúdo que controlam (conexão uniforme).\n- Elementos que aparecem juntos numa animação parecem um grupo (destino comum).'),
    ], [
      mc('A mensagem de erro de um campo deve ficar…', ['No topo da página', 'Logo abaixo do campo com problema', 'Num pop-up separado', 'No rodapé'], 1, 'Proximidade: a mensagem precisa estar perto do campo a que se refere.'),
      mc('Num formulário, o espaço entre o label e seu campo deve ser…', ['Maior que o espaço entre campos diferentes', 'Menor que o espaço entre campos diferentes', 'Igual a todos', 'Zero'], 1),
      tf('Espaço em branco bem usado pode agrupar melhor do que linhas divisórias.', true),
      mc('Destacar só a aba ativa com outra cor usa a quebra do princípio de…', ['Semelhança', 'Fechamento', 'Continuidade', 'Simetria'], 0),
      match('Ligue', [['Endereço num mesmo bloco', 'Região comum'], ['Todos os cards iguais', 'Semelhança'], ['Aba ligada ao conteúdo', 'Conexão uniforme'], ['Itens que entram juntos na animação', 'Destino comum']]),
    ]),
  ],

  'ux-heur': [
    L('ux-heur-4', 'Heurísticas na prática: casos', [
      card('Como identificar', 'Para cada problema, pergunte: **qual expectativa foi quebrada?** Isso costuma apontar a heurística. Um mesmo problema pode violar mais de uma; registre a principal.'),
      card('Casos rápidos', '- Upload sem barra de progresso: **visibilidade do status**.\n- Botão "Excluir" sem confirmação nem desfazer: **prevenção de erros** e **controle e liberdade**.\n- Ícone desconhecido sem rótulo: **reconhecimento em vez de memorização**.\n- Tela de erro "Exception 0x1F": **ajudar a recuperar de erros** e **mundo real**.'),
    ], [
      mc('Um app de banco desloga sem aviso e perde o formulário preenchido. Heurística mais violada:', ['Controle e liberdade / prevenção de erros', 'Estética minimalista', 'Ajuda e documentação', 'Mundo real'], 0),
      mc('Um app usa "Salvar" num lugar e "Gravar" em outro para a mesma ação.', ['Consistência e padrões', 'Flexibilidade', 'Status do sistema', 'Ajuda'], 0),
      mc('Ao enviar um formulário nada muda na tela por 5 segundos.', ['Visibilidade do status do sistema', 'Mundo real', 'Estética minimalista', 'Consistência'], 0),
      mc('O app pede que você digite um código de produto que estava na tela anterior.', ['Reconhecimento em vez de memorização', 'Prevenção de erros', 'Flexibilidade', 'Ajuda'], 0),
      mc('A tela inicial mostra 40 banners, avisos e promoções ao mesmo tempo.', ['Estética e design minimalista', 'Controle e liberdade', 'Mundo real', 'Status'], 0),
      mc('Um app de viagem usa o termo "PNR" em vez de "código da reserva".', ['Correspondência com o mundo real', 'Flexibilidade', 'Prevenção de erros', 'Status'], 0),
      tf('Um mesmo problema de usabilidade pode violar mais de uma heurística.', true),
    ]),
    L('ux-heur-5', 'Shneiderman e Bastien & Scapin', [
      card('8 regras de ouro de Shneiderman', 'Ben Shneiderman (*Designing the User Interface*):\n\n1. Busque **consistência**\n2. Busque **usabilidade universal** (atalhos para frequentes, ajuda para novatos)\n3. Ofereça **feedback informativo**\n4. Projete diálogos que levem ao **encerramento** (fim claro da tarefa)\n5. **Previna erros**\n6. Permita **reverter ações** facilmente\n7. Mantenha o usuário **no controle**\n8. **Reduza a carga** da memória de curto prazo'),
      card('Critérios ergonômicos de Bastien & Scapin', 'Christian Bastien e Dominique Scapin (1993), muito usados no Brasil:\n\n1. **Condução**\n2. **Carga de trabalho**\n3. **Controle explícito**\n4. **Adaptabilidade**\n5. **Gestão de erros**\n6. **Homogeneidade/coerência**\n7. **Significado dos códigos e denominações**\n8. **Compatibilidade**'),
      card('Qual usar?', 'Todas as listas convergem: feedback, consistência, controle, prevenção de erros e baixa carga de memória aparecem em todas. Escolha **uma lista por avaliação**, para que avaliadores falem a mesma língua.'),
    ], [
      mc('As "8 regras de ouro" são de…', ['Ben Shneiderman', 'Jakob Nielsen', 'Don Norman', 'Steve Krug'], 0),
      mc('Quantos critérios ergonômicos propõem Bastien & Scapin?', ['5', '8', '10', '12'], 1),
      match('Ligue', [['Diálogos que levam ao encerramento', 'Shneiderman'], ['Significado dos códigos e denominações', 'Bastien & Scapin'], ['Visibilidade do status do sistema', 'Nielsen']]),
      tf('Feedback e prevenção de erros aparecem nas listas de Nielsen, Shneiderman e Bastien & Scapin.', true),
      mc('Numa avaliação, o ideal é…', ['Cada avaliador usar uma lista diferente', 'Todos usarem a mesma lista de critérios', 'Não usar lista nenhuma', 'Usar só a intuição'], 1),
      mc('"Permita reverter ações facilmente" corresponde, em Nielsen, a…', ['Controle e liberdade do usuário', 'Estética minimalista', 'Ajuda e documentação', 'Mundo real'], 0),
    ]),
    L('ux-heur-6', 'Escrevendo achados e o relatório', [
      card('Anatomia de um bom achado', 'Cada problema registrado deve ter:\n\n- **Onde**: tela e elemento (com print)\n- **O quê**: descrição objetiva do problema\n- **Heurística** violada\n- **Severidade** (0 a 4)\n- **Evidência**: por que é um problema\n- **Recomendação**: direção de solução, não o pixel final'),
      card('Erros comuns', '- Opinião sem evidência ("não gostei da cor")\n- Recomendação vaga ("melhorar a UX")\n- Misturar vários problemas num achado só\n- Listar só problemas: registre também **pontos positivos**, para não quebrarem na próxima versão'),
      card('Priorizando', 'Uma matriz **severidade × esforço** ajuda o time a decidir: severidade alta e esforço baixo primeiro. Agrupe achados por fluxo para facilitar a leitura.'),
    ], [
      mc('Qual achado está melhor escrito?', ['A tela é feia.', 'Melhorar a UX do checkout.', 'No checkout, o botão "Pagar" fica abaixo da dobra no celular; 3 de 5 participantes não o encontraram. Heurística: visibilidade. Severidade 3.', 'Problema grave em tudo.'], 2),
      order('Ordene a anatomia de um achado', ['Onde', 'O quê', 'Heurística', 'Severidade', 'Recomendação']),
      tf('Um relatório de avaliação heurística também deve registrar pontos positivos.', true),
      tf('É boa prática juntar vários problemas diferentes num único achado para economizar espaço.', false, 'Cada achado deve ter um problema, para ser priorizado e resolvido separadamente.'),
      mc('Na matriz severidade × esforço, o que vem primeiro?', ['Baixa severidade, alto esforço', 'Alta severidade, baixo esforço', 'Alta severidade, alto esforço', 'Tanto faz'], 1),
    ]),
  ],

  'ux-research': [
    L('ux-res-6', 'Planejando uma pesquisa', [
      card('O plano de pesquisa', 'Antes de falar com qualquer pessoa, escreva:\n\n1. **Contexto** e decisão que a pesquisa vai apoiar\n2. **Objetivos** e **perguntas de pesquisa**\n3. **Hipóteses** (se houver)\n4. **Método** e por que ele responde às perguntas\n5. **Participantes** e critérios de recrutamento\n6. **Roteiro** e materiais\n7. **Cronograma** e entregáveis'),
      card('Pergunta de pesquisa ≠ pergunta da entrevista', '- **Pergunta de pesquisa**: o que o time quer saber. "Por que alunos abandonam o simulado no meio?"\n- **Pergunta da entrevista**: o que você pergunta ao participante. "Conte da última vez que você começou um simulado. O que aconteceu?"\n\nNunca pergunte a pergunta de pesquisa diretamente ao usuário.'),
      card('Ética e LGPD', '- **Consentimento informado** (termo explicando objetivo, gravação, uso dos dados e direito de desistir)\n- Colete **só o necessário** e anonimize nos relatórios\n- Guarde gravações com acesso restrito e prazo de descarte\n- A **LGPD (Lei 13.709/2018)** se aplica: dados de participantes são dados pessoais'),
      card('Piloto', 'Faça **um teste piloto** do roteiro com alguém do time ou um participante extra. Ele revela perguntas confusas, tarefas impossíveis e problemas técnicos antes que custem caro.'),
    ], [
      order('Ordene o plano de pesquisa', ['Contexto e decisão', 'Objetivos e perguntas', 'Método', 'Participantes', 'Roteiro', 'Cronograma']),
      mc('Qual é uma pergunta de ENTREVISTA (e não de pesquisa)?', ['Por que os alunos abandonam o simulado?', 'Conte da última vez que você começou um simulado. O que aconteceu?', 'Qual o impacto do simulado na retenção?', 'Devemos mudar o simulado?'], 1),
      tf('A LGPD se aplica aos dados pessoais de participantes de pesquisa.', true),
      mc('Para que serve o teste piloto?', ['Substituir a pesquisa', 'Encontrar problemas no roteiro antes das sessões reais', 'Recrutar mais gente', 'Gerar o relatório'], 1),
      tf('É uma boa prática perguntar ao usuário exatamente a pergunta de pesquisa do time.', false),
      mc('No termo de consentimento, o participante deve saber que…', ['Não pode desistir', 'Pode desistir a qualquer momento', 'Será filmado sem aviso', 'Será pago só se gostar'], 1),
    ]),
    L('ux-res-7', 'Pesquisa de campo e estudos longitudinais', [
      card('Investigação contextual', 'Método de **Hugh Beyer e Karen Holtzblatt**: observar e entrevistar a pessoa **no lugar real** onde a tarefa acontece. A relação proposta é de **mestre e aprendiz**: o participante ensina, o pesquisador aprende fazendo perguntas no momento.\n\nRevela atalhos, gambiarras e interrupções que ninguém conta numa sala.'),
      card('Estudo de diário', 'Participantes registram experiências **ao longo de dias ou semanas** (texto, foto, áudio). Ótimo para hábitos e comportamentos que mudam no tempo, como estudar para a prova.\n\nCuidado: exige lembretes e incentivo para não haver abandono.'),
      card('Etnografia e shadowing', '- **Etnografia**: imersão longa no ambiente e na cultura do grupo.\n- **Shadowing**: acompanhar a pessoa durante a rotina, observando sem interferir.\n\nSão métodos caros, mas geram entendimento profundo para a fase Discover.'),
    ], [
      mc('A relação "mestre e aprendiz" é base de qual método?', ['Teste A/B', 'Investigação contextual', 'Survey', 'Tree testing'], 1),
      mc('Para entender como o hábito de estudar muda ao longo de 3 semanas, o método mais indicado é…', ['Estudo de diário', 'Teste de 5 segundos', 'Card sorting', 'Avaliação heurística'], 0),
      tf('A investigação contextual acontece no ambiente real onde a tarefa é feita.', true),
      mc('Acompanhar a rotina de alguém observando sem interferir é…', ['Shadowing', 'Brainstorm', 'Benchmark', 'Wireframe'], 0),
      match('Ligue', [['Registros por semanas', 'Estudo de diário'], ['Imersão longa na cultura', 'Etnografia'], ['Observar no local da tarefa', 'Investigação contextual']]),
    ]),
    L('ux-res-8', 'Testes remotos rápidos', [
      card('Teste de 5 segundos', 'Mostra a tela por **5 segundos** e pergunta o que a pessoa lembra ou entendeu. Avalia **primeira impressão e clareza da mensagem** principal.'),
      card('Teste de primeiro clique', 'Pede uma tarefa e registra **onde a pessoa clica primeiro**. Um estudo de Bob Bailey e Cari Wolfson indicou que quem acerta o primeiro clique tem chance muito maior de completar a tarefa (cerca de 87%, contra 46% de quem erra).'),
      card('Teste de preferência e não moderado', '- **Teste de preferência**: compara versões, mas lembre que preferência não é desempenho; peça o porquê.\n- **Teste não moderado**: a pessoa faz as tarefas sozinha numa plataforma, gravando a tela. É rápido e escalável, mas você não pode aprofundar na hora.'),
    ], [
      mc('O teste de 5 segundos avalia principalmente…', ['Desempenho em tarefas longas', 'Primeira impressão e clareza da mensagem', 'Acessibilidade', 'Velocidade do servidor'], 1),
      mc('No estudo de Bailey e Wolfson, acertar o primeiro clique…', ['Não fez diferença', 'Aumentou muito a chance de sucesso na tarefa', 'Diminuiu o sucesso', 'Só afetou o tempo'], 1),
      tf('Preferência declarada é a mesma coisa que bom desempenho.', false, 'As pessoas podem preferir a versão com a qual têm pior desempenho. Meça os dois.'),
      mc('Desvantagem do teste não moderado:', ['É lento', 'Não dá para aprofundar com perguntas no momento', 'Exige laboratório', 'Não grava nada'], 1),
      match('Ligue', [['O que lembra após 5 s', 'Teste de 5 segundos'], ['Onde clica ao começar a tarefa', 'Primeiro clique'], ['Qual versão prefere e por quê', 'Teste de preferência']]),
    ]),
    L('ux-res-9', 'Números sem medo', [
      card('Amostra e margem de erro', 'Em pesquisa **quantitativa**, o tamanho da amostra define a **margem de erro**. Com cerca de 400 respostas aleatórias, a margem fica perto de **±5 pontos** (95% de confiança) para uma proporção.\n\nCom 5 pessoas, não existe "70% preferiram"; existe "3 de 5".'),
      card('Média, mediana e tempo', 'Tempo de tarefa costuma ter **poucos valores muito altos** (alguém se distraiu). Isso puxa a **média** para cima. Prefira a **mediana** (ou média geométrica) para relatar tempos.'),
      card('Calculando o SUS', 'Cada um dos 10 itens vai de 1 a 5.\n\n- Itens **ímpares** (positivos): nota **menos 1**\n- Itens **pares** (negativos): **5 menos** a nota\n- Some tudo e multiplique por **2,5**\n\nResultado de 0 a 100. Lembre: **não é porcentagem**. 68 é a média de referência.'),
      card('Significância', 'Um resultado é **estatisticamente significativo** quando é improvável que tenha acontecido por acaso (geralmente p < 0,05). Significativo não quer dizer **importante**: uma diferença de 0,1% pode ser significativa e irrelevante para o negócio.'),
    ], [
      mc('Com 5 participantes, a forma honesta de relatar é…', ['"60% preferiram"', '"3 de 5 participantes preferiram"', '"A maioria absoluta"', '"Todos os usuários"'], 1),
      mc('Para relatar tempo de tarefa com alguns valores extremos, use…', ['A soma', 'A mediana', 'O maior valor', 'O menor valor'], 1),
      mc('No SUS, para um item par com nota 2, a contribuição é…', ['1', '2', '3', '4'], 2, 'Itens pares: 5 menos a nota. 5 menos 2 = 3.'),
      mc('No SUS, depois de somar as contribuições, multiplica-se por…', ['2', '2,5', '10', '100'], 1),
      tf('Uma nota 68 no SUS significa que 68% dos usuários aprovaram.', false, 'O SUS não é porcentagem; 68 é a média de referência da escala.'),
      tf('Um resultado estatisticamente significativo é sempre importante para o negócio.', false),
    ]),
  ],

  'ux-process': [
    L('ux-proc-4', 'Double Diamond na prática', [
      card('Discover: atividades', '- Entrevistas, investigação contextual, estudo de diário\n- Análise de dados e de concorrentes (benchmark)\n- Mapa de stakeholders\n- Pesquisa desk (o que já se sabe)\n\n**Saída**: muitos achados e insights brutos.'),
      card('Define: atividades', '- Síntese (affinity mapping)\n- Personas, jornadas, JTBD\n- **Problem statement** e **How Might We**\n- Critérios de sucesso\n\n**Saída**: um desafio claro e priorizado.'),
      card('Develop: atividades', '- Ideação (brainstorm, Crazy 8s)\n- Esboços, storyboards, fluxos\n- Protótipos de baixa e média fidelidade\n- Testes rápidos com usuários\n\n**Saída**: conceitos testados.'),
      card('Deliver: atividades', '- Protótipo de alta fidelidade e teste final\n- Especificação e handoff\n- Lançamento, piloto, medição\n- Aprendizados que alimentam o próximo ciclo'),
    ], [
      match('Ligue a atividade à fase', [['Benchmark de concorrentes', 'Discover'], ['Problem statement', 'Define'], ['Crazy 8s', 'Develop'], ['Handoff e lançamento', 'Deliver']]),
      mc('A saída típica da fase Define é…', ['Código em produção', 'Um desafio claro e priorizado', 'Muitas ideias soltas', 'Um manual de marca'], 1),
      mc('Em qual fase os protótipos de baixa fidelidade aparecem mais?', ['Discover', 'Define', 'Develop', 'Deliver'], 2),
      tf('Aprendizados da fase Deliver podem iniciar um novo ciclo do Double Diamond.', true),
      mc('Pesquisa desk significa…', ['Pesquisar o que já existe de dados e estudos', 'Entrevistar na mesa do usuário', 'Comprar mesas novas', 'Testar em computadores'], 0),
    ]),
    L('ux-proc-5', 'Problem statement e ponto de vista', [
      card('Problem statement', 'Uma frase que descreve **quem** tem o problema, **qual** é o problema e **por que** importa, sem trazer a solução.\n\nEx.: "Candidatas à CNH que estudam no transporte público perdem o ritmo porque as aulas exigem atenção contínua de 30 minutos."'),
      card('Ponto de vista (POV)', 'Formato da d.school:\n\n**[Usuário]** precisa de **[necessidade]** porque **[insight]**.\n\nEx.: "A Ana precisa revisar placas em poucos minutos porque só tem tempo livre no ônibus."'),
      card('Armadilhas', '- Colocar a solução no problema ("precisamos de um app")\n- Ser amplo demais ("melhorar a educação")\n- Esquecer o porquê (o insight)\n- Falar de usuário genérico em vez de um perfil real'),
    ], [
      mc('Qual é um bom problem statement?', ['Precisamos de um app de placas.', 'Melhorar o trânsito do Brasil.', 'Candidatas que estudam no ônibus perdem o ritmo porque as aulas exigem 30 minutos de atenção contínua.', 'Os usuários são ruins.'], 2),
      order('Monte o POV na ordem', ['Usuário', 'precisa de [necessidade]', 'porque [insight]']),
      tf('Um problem statement deve conter a solução para guiar o time.', false),
      mc('O que falta em "A Ana precisa de revisar placas"?', ['O usuário', 'A necessidade', 'O insight (o porquê)', 'Nada'], 2),
      mc('"Melhorar a educação" como problema é…', ['Específico demais', 'Amplo demais', 'Perfeito', 'Uma solução'], 1),
    ]),
    L('ux-proc-6', 'Prototipar, testar e facilitar', [
      card('Protótipo serve para aprender', 'Tim Brown (IDEO): construa para pensar. Um protótipo responde **uma pergunta**: "as pessoas entendem a trilha?", "o fluxo de pagamento é claro?".\n\nRegra: **o mais barato possível** que ainda responda a pergunta.'),
      card('Testando conceitos', '- Teste com **3 a 5 pessoas** por rodada\n- Apresente como rascunho: as pessoas criticam mais um esboço do que algo que parece pronto\n- Observe o que fazem, não só o que dizem\n- Ajuste e teste de novo'),
      card('Facilitação de workshop', '- **Timebox**: cada atividade com tempo fixo e visível\n- **Trabalhar junto, sozinho**: ideias individuais em silêncio antes de discutir, para evitar que quem fala mais alto domine\n- **Votação com pontos** (dot voting) para convergir\n- Papéis claros: facilitador, decisor, participantes'),
    ], [
      mc('Um protótipo deve ser…', ['O mais completo possível', 'O mais barato possível que responda a pergunta', 'Sempre em código', 'Sempre em alta fidelidade'], 1),
      tf('Pessoas tendem a criticar mais livremente algo que parece um rascunho.', true),
      mc('Gerar ideias individualmente em silêncio antes da discussão evita…', ['Que o workshop termine', 'Que quem fala mais alto domine', 'O uso de post-its', 'O timebox'], 1),
      mc('Dot voting serve para…', ['Divergir', 'Convergir e priorizar ideias', 'Recrutar', 'Documentar'], 1),
      match('Ligue', [['Tempo fixo por atividade', 'Timebox'], ['Votar com adesivos', 'Dot voting'], ['Construir para pensar', 'Prototipação']]),
    ]),
  ],

  'ux-ia': [
    L('ux-ia-3', 'Busca, filtros e navegação mobile', [
      card('Busca bem feita', '- Campo **visível** quando a busca é central (não escondido num ícone)\n- **Autocompletar** e sugestões\n- Tolerância a erros de digitação e acentos\n- Página de **zero resultados** útil: sugestões, correção, caminhos alternativos'),
      card('Filtros e busca facetada', 'A **busca facetada** combina filtros por várias dimensões (categoria, preço, tamanho), mostrando quantos itens existem em cada opção.\n\nBoas práticas: mostrar filtros ativos como chips removíveis, aplicar sem recarregar tudo, permitir limpar com um toque.'),
      card('Zona do polegar', 'Steven Hoober observou que cerca de **49%** das pessoas usam o celular **com uma mão só**. As ações frequentes devem ficar na **parte de baixo** da tela, ao alcance do polegar.\n\nPor isso tab bars, botões fixos no rodapé e bottom sheets funcionam tão bem.'),
    ], [
      mc('Como deve ser a página de zero resultados?', ['Em branco', 'Com sugestões e caminhos alternativos', 'Com código de erro', 'Redirecionar para a home sem aviso'], 1),
      mc('Busca facetada é…', ['Busca por voz', 'Filtrar por várias dimensões ao mesmo tempo', 'Busca no Google', 'Uma busca sem resultados'], 1),
      tf('Segundo Steven Hoober, cerca de metade das pessoas usa o celular com uma mão.', true),
      mc('Onde colocar ações frequentes no mobile?', ['No topo, longe do polegar', 'Na parte de baixo, ao alcance do polegar', 'Escondidas no menu', 'Em qualquer lugar'], 1),
      tf('Mostrar os filtros ativos como chips removíveis ajuda o usuário a entender e desfazer filtros.', true),
    ]),
  ],

  'ux-ui': [
    L('ux-ui-5', 'Layout responsivo', [
      card('Origem e ideia', 'O termo **Responsive Web Design** foi cunhado por **Ethan Marcotte** em 2010, com três ingredientes: **grids fluidos**, **imagens flexíveis** e **media queries**.'),
      card('Mobile first', 'Comece projetando para a **menor tela** e vá adicionando para as maiores. Isso força a prioridade do conteúdo: o que não cabe no celular talvez não seja essencial.'),
      card('Breakpoints pelo conteúdo', 'Não escolha breakpoints por aparelhos da moda. Coloque o breakpoint **onde o layout quebra**. Use unidades relativas (rem, %, vw), larguras máximas para texto e, quando possível, **container queries**, que reagem ao tamanho do componente e não da tela.'),
      card('Toque, mouse e teclado', 'Telas grandes nem sempre têm mouse (tablets) e telas pequenas podem ter teclado. Projete pela **forma de interação**: alvos de toque confortáveis, estados de hover apenas como extra, foco visível sempre.'),
    ], [
      mc('Quem cunhou o termo "Responsive Web Design"?', ['Ethan Marcotte', 'Brad Frost', 'Luke Wroblewski', 'Jakob Nielsen'], 0),
      match('Os 3 ingredientes originais', [['Layout que se adapta', 'Grids fluidos'], ['Mídia que encolhe', 'Imagens flexíveis'], ['Regras por tamanho de tela', 'Media queries']]),
      mc('Onde colocar um breakpoint?', ['No tamanho do iPhone mais novo', 'Onde o layout do conteúdo quebra', 'A cada 100px', 'Só no 1024px'], 1),
      tf('Container queries permitem que um componente se adapte ao espaço que ele ocupa, não só à largura da tela.', true),
      tf('Hover deve ser a única forma de revelar uma ação importante.', false, 'Telas de toque não têm hover. Use hover só como reforço.'),
      mc('"Mobile first" significa…', ['Fazer só o app de celular', 'Começar pela menor tela e expandir', 'Ignorar o desktop', 'Usar só fontes pequenas'], 1),
    ]),
    L('ux-ui-6', 'Formulários que convertem', [
      card('Estrutura', '- **Uma coluna**: o olho desce sem zigue-zague\n- **Labels acima** do campo: leitura mais rápida e funciona bem no mobile\n- Agrupe campos relacionados e peça **só o necessário**\n- Ordem lógica (nome antes de sobrenome, CEP antes do endereço)'),
      card('Placeholder não é label', 'O texto de placeholder **some ao digitar**, tem pouco contraste e confunde leitores de tela. Use um **label visível** sempre; o placeholder pode dar um exemplo de formato.'),
      card('Validação', '- Valide **ao sair do campo** (não a cada tecla, para não acusar erro antes da hora)\n- Mensagem específica, perto do campo, com solução\n- Mostre o requisito **antes** (ex.: "mínimo de 8 caracteres")\n- Indique campos opcionais em vez de marcar todos os obrigatórios com asterisco, quando a maioria for obrigatória'),
      card('Teclados e preenchimento', 'No mobile, use o **tipo de teclado certo** (numérico para CEP, e-mail com @) e os atributos de **autocomplete**, para o navegador preencher nome, e-mail e endereço sozinho.'),
    ], [
      mc('Melhor posição para o label na maioria dos formulários:', ['Dentro do campo como placeholder', 'Acima do campo', 'Depois do campo', 'Não usar label'], 1),
      tf('Usar só placeholder no lugar do label é uma boa prática.', false),
      mc('Quando validar um campo?', ['A cada tecla, desde o início', 'Ao sair do campo', 'Só ao enviar, mostrando todos os erros no topo', 'Nunca'], 1),
      mc('Para o campo de CEP no celular, mostre…', ['Teclado completo', 'Teclado numérico', 'Teclado de emojis', 'Nenhum teclado'], 1),
      tf('Formulários de uma coluna costumam ser preenchidos mais rápido que os de várias colunas.', true),
      mc('O atributo autocomplete ajuda a…', ['Bloquear o preenchimento', 'O navegador preencher dados conhecidos', 'Trocar a cor do campo', 'Validar CPF'], 1),
    ]),
    L('ux-ui-7', 'Ícones, imagens e elevação', [
      card('Iconografia', '- Mantenha **um estilo** (contorno ou preenchido, mesma espessura, mesmos cantos)\n- Desenhe numa **grade** (ex.: 24 × 24 px com área de respiro)\n- Ícones universais (lupa, casa, lixeira) funcionam sozinhos; os ambíguos precisam de **rótulo**\n- Preenchido para o estado **ativo** e contorno para o inativo é um padrão comum'),
      card('Imagens', '- Imagem deve **informar ou emocionar**, não só decorar\n- Otimize peso e use formatos modernos (WebP, AVIF)\n- Defina largura e altura para evitar que a página "pule" ao carregar\n- Texto alternativo quando a imagem informa'),
      card('Elevação e sombra', 'Sombras indicam **profundidade e hierarquia**: o que está mais "alto" (modal, menu) fica na frente. Use uma escala pequena de elevação (ex.: 0, 1, 2, 3) e seja consistente. No modo escuro, superfícies mais altas costumam ficar **mais claras** em vez de usar sombra forte.'),
    ], [
      tf('Um ícone ambíguo deve vir acompanhado de rótulo.', true),
      mc('Um conjunto de ícones consistente mantém…', ['Estilos variados para chamar atenção', 'O mesmo estilo, espessura e grade', 'Cores aleatórias', 'Tamanhos diferentes em cada tela'], 1),
      mc('Definir largura e altura das imagens evita…', ['Que a página pule durante o carregamento', 'Que a imagem apareça', 'O uso de WebP', 'O texto alternativo'], 0),
      mc('No modo escuro, superfícies mais elevadas geralmente ficam…', ['Mais escuras', 'Mais claras', 'Transparentes', 'Vermelhas'], 1),
      match('Ligue', [['Modal sobre a tela', 'Elevação alta'], ['Ícone ativo', 'Preenchido'], ['Formato de imagem moderno', 'WebP/AVIF']]),
    ]),
  ],

  'ux-a11y': [
    L('ux-a11y-4', 'Formulários e erros acessíveis', [
      card('Rótulos e instruções', '- Todo campo tem **label associado** (`<label for>` ou envolvendo o campo)\n- Instruções e formato esperado **antes** do campo\n- Campos obrigatórios indicados em **texto**, não só com cor ou asterisco'),
      card('Erros', '- Mensagem de erro **ligada ao campo** (por exemplo com `aria-describedby`) e campo marcado como inválido (`aria-invalid`)\n- Em formulários longos, um **resumo de erros** no topo com links para os campos\n- Nunca indique erro **apenas com cor**'),
      card('Identificar o propósito', 'O critério 1.3.5 da WCAG pede que campos de dados pessoais usem **autocomplete** adequado (name, email, tel). Isso ajuda pessoas com deficiência motora ou cognitiva, e todo mundo ganha preenchimento automático.'),
    ], [
      mc('Como ligar a mensagem de erro ao campo para leitores de tela?', ['Com aria-describedby', 'Com cor vermelha', 'Com negrito', 'Com placeholder'], 0),
      tf('Marcar o campo obrigatório apenas com cor vermelha é suficiente.', false),
      mc('Em um formulário longo com vários erros, ajuda colocar…', ['Um resumo de erros com links para os campos', 'Um som alto', 'Nada', 'Um captcha'], 0),
      mc('O atributo autocomplete em campos pessoais atende ao critério…', ['1.3.5 Identificar o propósito do campo', '2.4.7 Foco visível', '1.4.3 Contraste', '2.1.1 Teclado'], 0),
      tf('Instruções de formato devem aparecer antes do campo, não só depois do erro.', true),
    ]),
    L('ux-a11y-5', 'Acessibilidade cognitiva e WCAG 2.2', [
      card('Cognição também é acessibilidade', 'Pessoas com TDAH, dislexia, autismo, ansiedade ou simplesmente cansadas se beneficiam de: **linguagem simples**, passos curtos, layout previsível, menos distrações, tempo suficiente e possibilidade de pausar animações.'),
      card('Novidades da WCAG 2.2 (2023)', '- **2.4.11 Foco não oculto**: o elemento focado não pode ficar escondido atrás de barras fixas\n- **2.5.7 Movimentos de arrastar**: toda ação de arrastar precisa de alternativa com clique\n- **2.5.8 Tamanho do alvo (mínimo)**: 24 × 24 px\n- **3.2.6 Ajuda consistente**: a ajuda fica sempre no mesmo lugar\n- **3.3.7 Entrada redundante**: não pedir de novo o que já foi informado\n- **3.3.8 Autenticação acessível**: não exigir teste cognitivo, como decorar senha sem permitir colar'),
      card('Na prática', '- Permita **colar** senha e códigos\n- Ofereça alternativa a arrastar (como no exercício de ordenar, que funciona com toques)\n- Salve progresso para a pessoa poder parar e voltar'),
    ], [
      mc('Pela WCAG 2.2, uma ação de arrastar precisa…', ['Ser mais lenta', 'Ter alternativa sem arrastar', 'Ter som', 'Ser removida'], 1),
      mc('Bloquear o "colar" no campo de senha fere o critério…', ['3.3.8 Autenticação acessível', '1.4.3 Contraste', '2.4.4 Propósito do link', '1.1.1 Conteúdo não textual'], 0),
      tf('Acessibilidade cognitiva inclui linguagem simples e layout previsível.', true),
      mc('Pedir o mesmo endereço duas vezes no mesmo fluxo fere o critério…', ['Entrada redundante', 'Foco visível', 'Legendas', 'Idioma da página'], 0),
      match('Ligue o critério da WCAG 2.2', [['2.4.11', 'Foco não oculto'], ['2.5.8', 'Alvo de 24 × 24 px'], ['3.2.6', 'Ajuda consistente']]),
    ]),
  ],

  'ux-writing': [
    L('ux-wri-2', 'Linguagem simples e escrita inclusiva', [
      card('Linguagem simples', '- Frases curtas e voz ativa\n- Palavras comuns ("usar" em vez de "utilizar")\n- Uma ideia por frase\n- O mais importante primeiro\n- Teste: a pessoa entende na primeira leitura?\n\nÓrgãos públicos brasileiros vêm adotando linguagem simples como padrão na comunicação com a população.'),
      card('Escrita inclusiva', '- Prefira termos neutros quando possível ("pessoa usuária", "quem estuda", "boas-vindas")\n- Evite expressões capacitistas ("cego para", "dar uma de surdo")\n- Não presuma gênero, idade ou família\n- Exemplos e ilustrações diversos'),
      card('Números e datas', 'Use o formato que o público usa: datas em **dd/mm/aaaa**, moeda **R$ 49,90**, horário **14h30**. Prefira algarismos em interfaces ("3 lições", não "três lições"), pois são escaneados mais rápido.'),
    ], [
      mc('Qual frase está em linguagem simples?', ['Procede-se à efetivação do seu cadastro.', 'Seu cadastro foi concluído.', 'O cadastro foi efetivado pelo sistema mediante validação.', 'Cadastro: OK.'], 1),
      tf('"Boas-vindas" é uma alternativa neutra a "Bem-vindo".', true),
      mc('Em interfaces, para quantidades, é melhor usar…', ['Números por extenso', 'Algarismos', 'Algarismos romanos', 'Símbolos'], 1),
      tf('Expressões como "dar uma de surdo" são exemplos de linguagem capacitista.', true),
      mc('Formato de data mais adequado para o público brasileiro:', ['mm/dd/aaaa', 'dd/mm/aaaa', 'aaaa-dd-mm', 'Só o dia da semana'], 1),
    ]),
    L('ux-wri-3', 'Onboarding, notificações e estados', [
      card('Onboarding', '- Mostre valor **rápido**: deixe a pessoa fazer algo real antes de pedir cadastro\n- **Revelação progressiva**: explique cada recurso quando ele for útil, não tudo no início\n- Evite tours longos de "próximo, próximo, próximo"'),
      card('Notificações', '- **Relevante**: tem a ver com o objetivo da pessoa\n- **No momento certo**: horário que ela escolheu\n- **Acionável**: diz o que fazer\n- **Controlável**: fácil de ajustar ou desligar\n\n"Sua revisão de 3 placas está pronta, leva 2 minutos" é melhor que "Volte para o app!".'),
      card('Estados da interface', '- **Carregando**: diga o que está acontecendo\n- **Vazio**: explique e convide a agir\n- **Sucesso**: confirme e indique o próximo passo\n- **Erro**: explique, tranquilize e ofereça saída'),
    ], [
      mc('Revelação progressiva significa…', ['Mostrar todos os recursos no primeiro acesso', 'Apresentar cada recurso quando ele for útil', 'Esconder tudo para sempre', 'Usar só vídeos'], 1),
      mc('Melhor notificação:', ['Volte para o app!', 'Sentimos sua falta :(', 'Sua revisão de 3 placas está pronta, leva 2 minutos.', 'Notificação nova'], 2),
      tf('Uma boa notificação é fácil de ajustar ou desligar.', true),
      match('Ligue o estado à boa prática', [['Vazio', 'Explicar e convidar a agir'], ['Sucesso', 'Confirmar e indicar o próximo passo'], ['Erro', 'Explicar e oferecer saída']]),
      tf('Pedir cadastro antes de mostrar qualquer valor costuma aumentar o abandono.', true),
    ]),
  ],

  'ux-ds': [
    L('ux-ds-5', 'Componentes a fundo: botão, campo e modal', [
      card('Botão', '- **Hierarquia**: primário, secundário, terciário, destrutivo\n- **Tamanhos**: poucos (P, M, G) com alvo mínimo garantido\n- **Estados**: padrão, hover, foco, pressionado, desabilitado, carregando\n- Ícone opcional à esquerda; rótulo sempre que o ícone não for universal\n- Botão desabilitado deve ter motivo claro, ou prefira deixar ativo e explicar o erro ao clicar'),
      card('Campo de texto', '**Anatomia**: label, campo, texto de ajuda, mensagem de erro, contador (opcional), ícones (opcional).\n\n**Estados**: vazio, foco, preenchido, erro, desabilitado, somente leitura.'),
      card('Modal', '- Use para decisões que **interrompem de propósito**\n- **Prenda o foco** dentro do modal enquanto aberto\n- Feche com **Esc** e devolva o foco ao elemento que abriu\n- Título claro e ações com verbos\n- Evite modal sobre modal'),
      card('Toast, banner e alerta', '- **Toast/snackbar**: aviso breve que some sozinho, opcionalmente com "Desfazer"\n- **Banner**: mensagem persistente no topo de uma área\n- **Alerta/diálogo**: exige resposta antes de continuar'),
    ], [
      mc('Ao fechar um modal, o foco deve…', ['Ir para o topo da página', 'Voltar para o elemento que abriu o modal', 'Sumir', 'Ir para o rodapé'], 1),
      match('Ligue', [['Aviso breve que some sozinho', 'Toast'], ['Mensagem persistente no topo', 'Banner'], ['Exige resposta para continuar', 'Diálogo de alerta']]),
      order('Ordene a anatomia do campo de texto (de cima para baixo)', ['Label', 'Campo', 'Texto de ajuda ou erro']),
      tf('Abrir um modal por cima de outro modal é uma boa prática.', false),
      mc('Qual destes é um estado de botão?', ['Carregando', 'Vazio', 'Somente leitura', 'Contador'], 0),
      tf('Dentro de um modal aberto, o foco do teclado deve ficar preso nele.', true),
    ]),
    L('ux-ds-6', 'Temas, modo escuro e marcas', [
      card('Temas com tokens semânticos', 'Componentes usam **apenas tokens semânticos** (`color-surface`, `color-text`, `color-action-primary`). Um tema é só um novo mapeamento desses tokens para primitivos. Trocar o tema não exige tocar nos componentes.'),
      card('Modo escuro bem feito', '- Não basta inverter cores\n- Evite preto puro e branco puro em grandes áreas\n- Reduza a saturação das cores de marca\n- Verifique contraste **de novo**: cores que passam no claro podem falhar no escuro\n- Respeite a preferência do sistema (`prefers-color-scheme`) e ofereça escolha manual'),
      card('Multimarca', 'Empresas com várias marcas usam a mesma biblioteca de componentes e trocam apenas os tokens de marca (cores, fontes, raios). É a grande economia de um design system maduro.'),
    ], [
      mc('Para criar um tema, o ideal é mudar…', ['O código de cada componente', 'O mapeamento dos tokens semânticos', 'Só o logotipo', 'O HTML'], 1),
      tf('No modo escuro, as cores que passam no teste de contraste do tema claro sempre passam também.', false),
      mc('Qual recurso do CSS detecta a preferência de tema do sistema?', ['prefers-color-scheme', 'prefers-reduced-motion', 'max-width', 'hover'], 0),
      tf('Componentes devem usar tokens semânticos e não valores de cor fixos.', true),
      mc('Num design system multimarca, o que muda entre as marcas?', ['A lógica dos componentes', 'Os tokens de marca', 'A acessibilidade', 'Os testes'], 1),
    ]),
    L('ux-ds-7', 'Adoção, métricas e manutenção', [
      card('Medir o design system', '- **Adoção**: % de telas ou produtos usando os componentes oficiais\n- **Cobertura**: % das necessidades atendidas pela biblioteca\n- **Desvios**: componentes "caseiros" que duplicam os oficiais\n- **Tempo de entrega** de telas novas\n- **Satisfação** de quem usa (designers e devs)'),
      card('Manutenção', '- **Changelog** público a cada versão\n- **Depreciação** com aviso e prazo antes de remover algo\n- **Guia de migração** em mudanças grandes\n- Plantões de dúvidas (*office hours*) e canal de suporte'),
      card('Cultura', 'Design system é **produto interno**: tem usuários (o time), roadmap, pesquisa e suporte. Sem isso, vira um arquivo esquecido no Figma.'),
    ], [
      mc('A métrica "% de telas usando componentes oficiais" é…', ['Adoção', 'NPS', 'Churn', 'Conversão'], 0),
      tf('Antes de remover um componente, o ideal é depreciá-lo com aviso e prazo.', true),
      mc('Os usuários de um design system são…', ['Os clientes finais apenas', 'Os times de design e desenvolvimento', 'Só o time de marketing', 'Ninguém'], 1),
      mc('Um guia de migração é necessário principalmente em…', ['Versões PATCH', 'Mudanças MAJOR que quebram compatibilidade', 'Mudanças de cor pequenas', 'Correções de texto'], 1),
      tf('Componentes "caseiros" que duplicam os oficiais indicam um problema de adoção ou cobertura.', true),
    ]),
  ],

  'ux-metrics': [
    L('ux-met-3', 'Métricas de usabilidade', [
      card('As três clássicas', 'Ligadas à ISO 9241-11:\n\n- **Eficácia**: taxa de sucesso na tarefa\n- **Eficiência**: tempo na tarefa, cliques, erros\n- **Satisfação**: questionários (SEQ, SUS, UMUX-Lite)'),
      card('Questionários', '- **SEQ**: uma pergunta após cada tarefa, de 1 a 7 ("Foi fácil ou difícil?"). Média de referência perto de **5,5**.\n- **SUS**: 10 itens, ao final do teste, de 0 a 100.\n- **UMUX-Lite**: só **2 itens**, correlaciona bem com o SUS e cabe em pesquisas dentro do produto.'),
      card('Comparar no tempo', 'Uma métrica sozinha diz pouco. O valor aparece ao **comparar**: antes e depois de um redesign, entre versões, contra um concorrente (benchmark de usabilidade).'),
    ], [
      match('Ligue a métrica à dimensão', [['Taxa de sucesso', 'Eficácia'], ['Tempo na tarefa', 'Eficiência'], ['SUS', 'Satisfação']]),
      mc('Quantos itens tem o UMUX-Lite?', ['2', '5', '10', '20'], 0),
      mc('A SEQ é aplicada…', ['Só no fim do estudo', 'Após cada tarefa', 'Antes de começar', 'Um mês depois'], 1),
      tf('Métricas de usabilidade são mais úteis quando comparadas no tempo ou entre versões.', true),
      mc('A escala da SEQ vai de…', ['0 a 100', '1 a 7', '1 a 3', '0 a 10'], 1),
    ]),
    L('ux-met-4', 'Resultados, North Star e roadmap', [
      card('Output × outcome', '- **Output**: o que entregamos ("lançamos o modo escuro")\n- **Outcome**: a mudança de comportamento que queríamos ("mais pessoas estudam à noite")\n- **Impacto**: o efeito no negócio ou na vida\n\nTimes maduros se comprometem com outcomes, não só com outputs.'),
      card('North Star Metric', 'Uma métrica que representa o **valor entregue** às pessoas e guia o time. Para um app de estudo, poderia ser "lições concluídas com precisão acima de 80% por semana". Ela precisa ser influenciável pelo time e ligada ao valor real, não à vaidade.'),
      card('Roadmap Agora, Próximo, Depois', 'Em vez de datas fixas para funcionalidades, organize por **problemas a resolver** em três horizontes: **Agora**, **Próximo** e **Depois**. Quanto mais longe, menos detalhe. Isso deixa espaço para aprender com pesquisa.'),
    ], [
      mc('"Lançamos o modo escuro" é um…', ['Outcome', 'Output', 'Impacto', 'Insight'], 1),
      mc('"Mais pessoas estudam à noite" é um…', ['Output', 'Outcome', 'Bug', 'Requisito técnico'], 1),
      tf('Uma North Star Metric deve representar o valor entregue às pessoas.', true),
      mc('No roadmap Agora, Próximo, Depois, o horizonte "Depois" tem…', ['Mais detalhe', 'Menos detalhe', 'Datas exatas', 'Código pronto'], 1),
      mc('Qual é uma métrica de vaidade?', ['Downloads totais sem considerar uso', 'Retenção na semana 4', 'Taxa de conclusão de lições', 'Precisão média nos simulados'], 0),
    ]),
  ],

  'ux-game': [
    L('ux-game-3', 'Hábitos éticos e bem-estar', [
      card('Tiny Habits (BJ Fogg)', 'Receita: **âncora + comportamento minúsculo + celebração**.\n\n"Depois de **escovar os dentes** (âncora), vou **fazer uma questão** no Dragaum (comportamento minúsculo) e **comemorar** (celebração)."\n\nComeçar pequeno reduz a barreira; a celebração cria a emoção que fixa o hábito.'),
      card('Ofensivas sem crueldade', '- Ofereça **proteção** (escudo) para dias difíceis\n- Permita **metas flexíveis**\n- Celebre consistência, não só números enormes\n- Nunca use culpa ou humilhação nas mensagens'),
      card('Tempo bem gasto', 'O movimento *Time Well Spent* (Center for Humane Technology) propõe medir se o tempo no produto **foi bom para a pessoa**, não apenas quanto tempo ela ficou. Um app de estudo ideal ajuda você a aprender rápido e **voltar para a vida**.'),
    ], [
      order('Ordene a receita do Tiny Habits', ['Âncora', 'Comportamento minúsculo', 'Celebração']),
      tf('Escudos de ofensiva ajudam a manter o hábito sem punir um dia difícil.', true),
      mc('Qual mensagem é antiética?', ['Sua meta de hoje está quase lá!', 'Você é preguiçosa por não estudar.', 'Que tal 2 minutos de revisão?', 'Você protegeu sua ofensiva com um escudo.'], 1),
      mc('O movimento Time Well Spent propõe medir…', ['Só o tempo de tela', 'Se o tempo no produto foi bom para a pessoa', 'Quantos anúncios foram vistos', 'O número de notificações'], 1),
      tf('No Tiny Habits, o comportamento inicial deve ser grande e desafiador.', false),
    ]),
  ],
}
