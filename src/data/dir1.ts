import type { Unit } from '../types'
import { L, card, mc, tf, match, order } from './h'

export const dirUnits1: Unit[] = [
  {
    id: 'dir-cnh',
    title: 'A jornada da CNH',
    desc: 'Etapas, categorias, PPD e as regras novas',
    icon: 'badge',
    color: '#22c55e',
    lessons: [
      L('dir-cnh-1', 'Requisitos e etapas', [
        card('Quem pode tirar a CNH', 'Pelo CTB (art. 140) e pela **Resolução CONTRAN nº 1.020/2025**, o candidato precisa:\n\n- Ser **penalmente imputável** (18 anos)\n- **Saber ler e escrever**\n- Ter **documento de identidade** e **CPF**'),
        card('A ordem do processo', '1. Requerimento (DETRAN ou canal digital oficial)\n2. **Curso teórico**\n3. RENACH + **coleta biométrica** (foto, assinatura, digitais)\n4. **Avaliação psicológica** e **exame de aptidão física e mental**\n5. **Exame teórico**\n6. **Licença de Aprendizagem** (digital)\n7. **Aulas práticas** com instrutor autorizado\n8. **Exame prático de direção**\n9. **PPD** (Permissão para Dirigir)\n10. **CNH** definitiva'),
        card('O que mudou em dezembro/2025', 'A Resolução 1.020/2025 **acabou com a obrigatoriedade de autoescola**:\n\n- Curso teórico pode ser **EaD**, inclusive **gratuito** pelo Ministério dos Transportes (app/portal oficial), ou em autoescola/entidade credenciada.\n- Carga mínima de aulas práticas caiu de 20 h para **2 horas-aula**.\n- Aulas com **autoescola** ou **instrutor autônomo credenciado** pelo DETRAN, inclusive em **carro próprio** (respeitando as regras).\n- As **provas teórica e prática continuam obrigatórias**.\n\nAlguns estados demoraram a adaptar os sistemas — confira o DETRAN do seu estado.'),
      ], [
        mc('Qual destes NÃO é requisito para tirar a CNH?', ['Ser penalmente imputável', 'Saber ler e escrever', 'Ter CPF', 'Ter ensino médio completo'], 3),
        order('Ordene as primeiras etapas do processo', ['Requerimento', 'Curso teórico', 'Biometria (RENACH)', 'Exames médico e psicológico', 'Exame teórico']),
        tf('Pela Resolução 1.020/2025, fazer as aulas em autoescola deixou de ser obrigatório.', true, 'O candidato pode estudar a teoria online e fazer as aulas práticas com instrutor autônomo credenciado.'),
        mc('Qual a carga mínima de aulas práticas depois da Resolução 1.020/2025?', ['20 horas-aula', '10 horas-aula', '2 horas-aula', 'Nenhuma'], 2),
        tf('Com as novas regras, o exame prático deixou de existir.', false, 'As provas teórica e prática continuam obrigatórias.'),
        mc('Depois de passar no exame teórico, o candidato recebe a…', ['PPD', 'Licença de Aprendizagem', 'CNH definitiva', 'ACC'], 1),
        mc('A coleta biométrica inclui…', ['Só a foto', 'Foto, assinatura e impressões digitais', 'Exame de sangue', 'Teste de visão'], 1),
      ]),
      L('dir-cnh-2', 'Categorias de habilitação', [
        card('ACC, A e B', '- **ACC**: ciclomotores (até 50 cc ou elétrico até 4 kW, velocidade máxima de fabricação até 50 km/h).\n- **A**: veículos motorizados de **2 ou 3 rodas**, com ou sem carro lateral (motos, motonetas, triciclos).\n- **B**: veículos de 4 rodas com **PBT até 3.500 kg** e lotação de até **8 lugares, além do motorista**.'),
        card('C, D e E', '- **C**: transporte de **carga** com PBT **acima de 3.500 kg** (exige B há pelo menos 1 ano).\n- **D**: transporte de **passageiros** com **mais de 8 lugares** além do motorista.\n- **E**: **combinação de veículos** em que a unidade acoplada (reboque, semirreboque, articulada) tenha **6.000 kg ou mais** de PBT, ou lotação acima de 8 lugares.'),
        card('Requisitos para D e E (art. 145)', '- Ter mais de **21 anos**\n- Para **D**: habilitado há pelo menos **2 anos na B** ou **1 ano na C**\n- Para **E**: habilitado há pelo menos **1 ano na C**\n- Não ter cometido infração **grave ou gravíssima**, nem ser **reincidente em médias**, nos últimos **12 meses**\n- Aprovação em **curso especializado** (para transporte coletivo, escolar, emergência, perigosos)'),
      ], [
        match('Ligue a categoria ao veículo', [['Ciclomotor 50 cc', 'ACC'], ['Motocicleta', 'A'], ['Carro de passeio', 'B'], ['Caminhão', 'C'], ['Ônibus', 'D'], ['Carreta articulada', 'E']]),
        mc('Limite de peso bruto total (PBT) para a categoria B:', ['2.000 kg', '3.500 kg', '6.000 kg', '8.000 kg'], 1),
        mc('A categoria B permite até quantos lugares além do motorista?', ['4', '6', '8', '12'], 2),
        mc('Idade mínima para as categorias D e E:', ['18 anos', '19 anos', '21 anos', '25 anos'], 2),
        tf('Para tirar a categoria E, é preciso estar habilitado há pelo menos 1 ano na categoria C.', true),
        mc('Uma van com 12 lugares para passageiros exige categoria…', ['B', 'C', 'D', 'E'], 2),
        tf('ACC permite conduzir motocicletas de 150 cc.', false, 'ACC é só para ciclomotores (até 50 cc / 4 kW / 50 km/h). Motos exigem categoria A.'),
      ]),
      L('dir-cnh-3', 'PPD, validade e renovação', [
        card('Permissão para Dirigir (PPD)', 'Após aprovação no exame prático, o condutor recebe a **PPD**, válida por **1 ano**.\n\nA CNH definitiva só é concedida se, nesse ano, ele **não cometer infração grave ou gravíssima** nem for **reincidente em infração média**. Caso contrário, precisa **reiniciar todo o processo** (art. 148, §§ 3º e 4º).'),
        card('Validade da CNH (Lei 14.071/2020)', 'O exame de aptidão física e mental é renovado:\n\n- **Menos de 50 anos**: a cada **10 anos**\n- **50 a 69 anos**: a cada **5 anos**\n- **70 anos ou mais**: a cada **3 anos**\n\nO médico pode reduzir o prazo se houver indício de condição que exija acompanhamento.'),
        card('CNH Digital e porte', 'A CNH digital (app Carteira Digital de Trânsito) tem a **mesma validade** da física.\n\nO porte de CNH e CRLV é dispensado quando, na fiscalização, o agente consegue **consultar o sistema** (art. 159, § 1º e art. 133, parágrafo único).'),
      ], [
        mc('Validade da PPD:', ['6 meses', '1 ano', '2 anos', '5 anos'], 1),
        tf('Quem comete uma infração grave durante a PPD precisa reiniciar o processo de habilitação.', true),
        tf('Uma única infração média durante a PPD impede a CNH definitiva.', false, 'O impedimento é infração grave, gravíssima ou reincidência em média.'),
        match('Prazos de renovação (Lei 14.071/2020)', [['Menos de 50 anos', '10 anos'], ['50 a 69 anos', '5 anos'], ['70 anos ou mais', '3 anos']]),
        mc('A CNH digital, em relação à física, tem…', ['Validade menor', 'A mesma validade', 'Validade só no estado de emissão', 'Validade só para multas'], 1),
      ]),
    ],
  },
  {
    id: 'dir-leg',
    title: 'Legislação e o SNT',
    desc: 'CTB, órgãos de trânsito e documentos',
    icon: 'gavel',
    color: '#0ea5e9',
    lessons: [
      L('dir-leg-1', 'Sistema Nacional de Trânsito', [
        card('CTB', 'O **Código de Trânsito Brasileiro** é a **Lei nº 9.503/1997**. Vale em todas as vias terrestres do país abertas à circulação.\n\nArt. 1º, § 2º: o trânsito **em condições seguras** é um **direito de todos** e dever dos órgãos do SNT.'),
        card('Órgãos normativos', '- **CONTRAN** — Conselho Nacional de Trânsito: **coordenador do SNT e órgão máximo normativo e consultivo**. Edita as Resoluções.\n- **CETRAN** — Conselhos Estaduais de Trânsito (e **CONTRANDIFE** no DF): normativos nos estados e julgam recursos em 2ª instância.'),
        card('Órgãos executivos', '- **SENATRAN** (Secretaria Nacional de Trânsito): **órgão máximo executivo de trânsito da União**.\n- **DETRAN**: órgão executivo de trânsito do **estado/DF** (habilitação, registro de veículos).\n- **Órgãos municipais** (ex.: BHTrans, CET): executivos de trânsito nas vias municipais.\n- **DNIT** e **DER**: órgãos executivos rodoviários.\n- **PRF**: fiscaliza rodovias federais.\n- **Polícias Militares**: fiscalização por convênio.\n- **JARI**: Juntas Administrativas de Recursos de Infrações (1ª instância de recurso).'),
      ], [
        mc('O CTB é a lei…', ['8.078/1990', '9.503/1997', '13.146/2015', '14.071/2020'], 1),
        mc('Órgão máximo normativo e coordenador do SNT:', ['DETRAN', 'CONTRAN', 'PRF', 'SENATRAN'], 1),
        mc('Órgão máximo executivo de trânsito da União:', ['SENATRAN', 'CETRAN', 'JARI', 'DER'], 0),
        mc('Quem julga recursos de multa em 1ª instância?', ['JARI', 'CONTRAN', 'DETRAN', 'STF'], 0),
        match('Ligue', [['Edita Resoluções', 'CONTRAN'], ['Emite CNH no estado', 'DETRAN'], ['Fiscaliza rodovias federais', 'PRF'], ['Recurso em 2ª instância no estado', 'CETRAN']]),
        tf('Trânsito em condições seguras é direito de todos, segundo o CTB.', true),
      ]),
      L('dir-leg-2', 'Conceitos e classificação das vias', [
        card('Vias urbanas', '- **Trânsito rápido**: sem interseções em nível, sem travessia de pedestres em nível, sem acesso direto aos lotes.\n- **Arterial**: interseções em nível, geralmente com semáforo; liga regiões da cidade.\n- **Coletora**: coleta e distribui o trânsito entre arteriais e locais.\n- **Local**: interseções sem semáforo, acesso local ou a áreas restritas.'),
        card('Vias rurais', '- **Rodovias**: vias rurais **pavimentadas**.\n- **Estradas**: vias rurais **não pavimentadas**.'),
        card('Velocidades máximas (sem placa) — art. 61', '**Urbanas**:\n- Trânsito rápido: **80 km/h**\n- Arterial: **60 km/h**\n- Coletora: **40 km/h**\n- Local: **30 km/h**\n\n**Rodovias de pista dupla**: **110 km/h** (automóveis, camionetas, motos); **90 km/h** demais veículos.\n**Rodovias de pista simples**: **100 km/h** (automóveis, camionetas, motos); **90 km/h** demais.\n**Estradas**: **60 km/h**.\n\nVelocidade **mínima**: metade da máxima da via (art. 62).'),
      ], [
        match('Velocidade máxima sem sinalização (urbana)', [['Trânsito rápido', '80 km/h'], ['Arterial', '60 km/h'], ['Coletora', '40 km/h'], ['Local', '30 km/h']]),
        mc('Velocidade máxima para automóveis em rodovia de pista dupla, sem placa:', ['80 km/h', '100 km/h', '110 km/h', '120 km/h'], 2),
        mc('Velocidade máxima para automóveis em rodovia de pista simples, sem placa:', ['80 km/h', '90 km/h', '100 km/h', '110 km/h'], 2),
        mc('Velocidade máxima numa estrada (rural não pavimentada), sem placa:', ['40 km/h', '60 km/h', '80 km/h', '90 km/h'], 1),
        tf('A velocidade mínima numa via é a metade da máxima permitida.', true),
        mc('Via rural pavimentada é chamada de…', ['Estrada', 'Rodovia', 'Via local', 'Via coletora'], 1),
        mc('Via urbana sem interseções em nível e sem travessia de pedestres em nível é de…', ['Trânsito rápido', 'Arterial', 'Coletora', 'Local'], 0),
      ]),
      L('dir-leg-3', 'Documentos e equipamentos obrigatórios', [
        card('Documentos', '- Do condutor: **CNH**, **PPD** ou **Licença de Aprendizagem** (física ou digital).\n- Do veículo: **CRLV-e** (Certificado de Registro e Licenciamento de Veículo, digital desde 2021).\n- O licenciamento é **anual**.\n\nConduzir veículo **não licenciado**: infração **gravíssima** + remoção do veículo (art. 230, V).'),
        card('Equipamentos obrigatórios (automóvel)', 'Conforme Resoluções do CONTRAN:\n\n- **Cinto de segurança** para todos os ocupantes\n- **Triângulo** de sinalização\n- **Macaco**, **chave de roda** e **estepe** (pneu sobressalente)\n- Para-choques, espelhos retrovisores, buzina, limpador de para-brisa, faróis, lanternas, luz de freio, pisca\n\nO **extintor de incêndio deixou de ser obrigatório** para automóveis em 2015 (Resolução 556/2015).'),
      ], [
        tf('O extintor de incêndio é obrigatório em automóveis de passeio.', false, 'Deixou de ser obrigatório para automóveis (Resolução 556/2015). Continua obrigatório em veículos como caminhões, ônibus e de transporte de produtos perigosos.'),
        mc('O CRLV é documento do…', ['Condutor', 'Veículo', 'Seguro', 'Instrutor'], 1),
        mc('Dirigir veículo não licenciado é infração…', ['Leve', 'Média', 'Grave', 'Gravíssima'], 3),
        mc('Qual destes é equipamento obrigatório em automóvel?', ['Extintor', 'Triângulo de sinalização', 'GPS', 'Câmera de ré'], 1),
        tf('O licenciamento do veículo é feito anualmente.', true),
      ]),
    ],
  },
  {
    id: 'dir-inf',
    title: 'Infrações e penalidades',
    desc: 'Pontos, multas, suspensão e cassação',
    icon: 'report',
    color: '#ef4444',
    lessons: [
      L('dir-inf-1', 'Natureza, pontos e valores', [
        card('Natureza das infrações (art. 258 e 259)', '- **Leve**: **3 pontos** — R$ 88,38\n- **Média**: **4 pontos** — R$ 130,16\n- **Grave**: **5 pontos** — R$ 195,23\n- **Gravíssima**: **7 pontos** — R$ 293,47\n\nAlgumas gravíssimas têm **fator multiplicador** (×2, ×3, ×5, ×10, ×20, ×60).'),
        card('Limite de pontos (Lei 14.071/2020)', 'A suspensão por pontos acontece ao atingir, em **12 meses**:\n\n- **20 pontos** — se tiver **2 ou mais** infrações gravíssimas\n- **30 pontos** — se tiver **1** gravíssima\n- **40 pontos** — se **não** tiver gravíssima\n\nPara quem exerce **atividade remunerada (EAR)**: **40 pontos**, independentemente da natureza.'),
        card('Penalidades (art. 256)', '- **Advertência por escrito**\n- **Multa**\n- **Suspensão do direito de dirigir**\n- **Cassação** da CNH ou da PPD\n- **Frequência obrigatória em curso de reciclagem**\n\n**Advertência por escrito** (art. 267): para infração **leve ou média**, se o infrator **não for reincidente** na mesma infração nos últimos 12 meses — substitui a multa.'),
      ], [
        match('Pontos por natureza', [['Leve', '3 pontos'], ['Média', '4 pontos'], ['Grave', '5 pontos'], ['Gravíssima', '7 pontos']]),
        mc('Valor base da multa gravíssima:', ['R$ 88,38', 'R$ 130,16', 'R$ 195,23', 'R$ 293,47'], 3),
        mc('Condutor sem nenhuma infração gravíssima tem a CNH suspensa ao atingir, em 12 meses:', ['20 pontos', '30 pontos', '40 pontos', '50 pontos'], 2),
        mc('Condutor com 2 ou mais gravíssimas no período é suspenso ao atingir:', ['20 pontos', '30 pontos', '40 pontos', '10 pontos'], 0),
        tf('A advertência por escrito pode substituir a multa em infração leve ou média, se o condutor não for reincidente em 12 meses.', true),
        mc('Qual destas NÃO é uma penalidade do art. 256 do CTB?', ['Multa', 'Suspensão do direito de dirigir', 'Cassação', 'Prisão do veículo por 30 dias'], 3, 'A apreensão do veículo deixou de ser penalidade com a Lei 14.071/2020. Remoção e retenção são medidas administrativas.'),
        mc('Limite de pontos para motorista que exerce atividade remunerada (EAR):', ['20', '30', '40', '60'], 2),
      ]),
      L('dir-inf-2', 'Infrações mais cobradas', [
        card('Álcool (Lei Seca)', '- **Art. 165**: dirigir sob influência de álcool → **gravíssima ×10** (R$ 2.934,70) + **suspensão por 12 meses** + recolhimento da CNH e retenção do veículo. Reincidência em 12 meses: multa em **dobro**.\n- **Art. 165-A**: **recusar** o bafômetro → mesmas penalidades.\n- **Art. 306 (crime)**: concentração **≥ 0,3 mg/L** de ar alveolar (ou ≥ 6 dg/L de sangue) → detenção de 6 meses a 3 anos.\n\nNão existe "quantidade segura": qualquer concentração configura infração administrativa.'),
        card('Celular, cinto e crianças', '- **Segurar ou manusear o celular** dirigindo: **gravíssima** (art. 252, parágrafo único).\n- Usar fone de ouvido conectado a aparelho: **média** (art. 252, VI).\n- **Sem cinto** (condutor ou passageiro): **grave** (art. 167).\n- Criança sem dispositivo de retenção: **gravíssima** (art. 168).'),
        card('Velocidade (art. 218)', '- Até **20%** acima: **média**\n- De **20% a 50%** acima: **grave**\n- **Mais de 50%** acima: **gravíssima ×3** + **suspensão**'),
        card('Outras gravíssimas clássicas', '- **Avançar o sinal vermelho** (art. 208)\n- **Dirigir sem habilitação** (art. 162, I) → ×3\n- **Ultrapassar pela contramão** em linha contínua amarela (art. 203, V) → ×5\n- **Racha / disputa** (art. 173) → ×10 + suspensão\n- Estacionar em vaga de **idoso ou PcD** sem credencial (art. 181, XVII e XX)\n- Deixar de prestar **socorro** à vítima, sendo o condutor envolvido (art. 176) → ×5\n- **Motociclista sem capacete** (art. 244, I) + suspensão'),
      ], [
        mc('Dirigir segurando o celular é infração…', ['Leve', 'Média', 'Grave', 'Gravíssima'], 3),
        mc('Recusar o teste do bafômetro tem as mesmas penalidades de…', ['Excesso de velocidade', 'Dirigir sob influência de álcool', 'Estacionar em local proibido', 'Não usar cinto'], 1),
        mc('A partir de qual concentração no ar alveolar a embriaguez ao volante é crime (art. 306)?', ['0,05 mg/L', '0,1 mg/L', '0,3 mg/L', '1,0 mg/L'], 2),
        mc('Passar 30% acima da velocidade máxima é infração…', ['Leve', 'Média', 'Grave', 'Gravíssima'], 2),
        mc('Passar mais de 50% acima da velocidade máxima é…', ['Média', 'Grave', 'Gravíssima ×3 com suspensão', 'Leve'], 2),
        tf('Não usar cinto de segurança é infração grave.', true),
        mc('Avançar o sinal vermelho é infração…', ['Média', 'Grave', 'Gravíssima', 'Leve'], 2),
        match('Ligue a infração à natureza', [['Sem cinto', 'Grave'], ['Fone de ouvido conectado', 'Média'], ['Criança sem cadeirinha', 'Gravíssima'], ['Racha', 'Gravíssima ×10']]),
        tf('Existe uma pequena quantidade de álcool que é permitida administrativamente.', false, 'Qualquer concentração de álcool configura a infração do art. 165 (há apenas margem de erro do aparelho).'),
      ]),
      L('dir-inf-3', 'Suspensão, cassação e recursos', [
        card('Suspensão (art. 261)', '- Por **pontos** (20/30/40) ou por infração que **prevê suspensão direta** (Lei Seca, racha, >50% de velocidade, moto sem capacete…).\n- Prazo por pontos: **6 meses a 1 ano**; na reincidência em 12 meses: **8 meses a 2 anos**.\n- Para voltar a dirigir: cumprir o prazo e fazer o **curso de reciclagem** com aprovação.'),
        card('Cassação (art. 263)', 'A CNH é cassada quando o condutor:\n\n- **Dirige com o direito suspenso**\n- Reincide, em 12 meses, em certas infrações (ex.: Lei Seca, racha)\n- É condenado judicialmente por crime de trânsito\n\nApós **2 anos**, pode pedir **reabilitação**, refazendo os exames do processo de habilitação.'),
        card('Notificação e recursos', '- **Notificação da Autuação**: deve ser expedida em até **30 dias** (art. 281). Abre prazo para **defesa da autuação** e **indicação do condutor**.\n- **Notificação da Penalidade**: abre prazo para recurso.\n- Recurso em **1ª instância**: **JARI**.\n- Em **2ª instância**: **CETRAN** / CONTRANDIFE (ou colegiado especial para órgãos da União).\n- Pagando a multa até o vencimento: **20% de desconto**; via SNE (sistema de notificação eletrônica), **40%**.'),
      ], [
        mc('O que acontece com quem dirige com o direito de dirigir suspenso?', ['Advertência', 'Cassação da CNH', 'Multa leve', 'Nada'], 1),
        mc('Depois de cassada, a reabilitação pode ser pedida após…', ['6 meses', '1 ano', '2 anos', '5 anos'], 2),
        mc('Prazo de suspensão por pontos (primeira vez):', ['1 a 3 meses', '6 meses a 1 ano', '2 a 5 anos', '10 anos'], 1),
        order('Ordene as instâncias de recurso', ['Defesa da autuação', 'Recurso à JARI', 'Recurso ao CETRAN']),
        tf('Para voltar a dirigir após a suspensão, é preciso fazer o curso de reciclagem.', true),
        mc('Prazo máximo para expedir a notificação da autuação:', ['15 dias', '30 dias', '60 dias', '1 ano'], 1),
        mc('Desconto ao pagar a multa pelo SNE (notificação eletrônica) até o vencimento:', ['10%', '20%', '40%', '60%'], 2),
      ]),
    ],
  },
]
