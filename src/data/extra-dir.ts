import type { Lesson } from '../types'
import { L, card, mc, tf, match, order } from './h'

/** Lições de aprofundamento da trilha de Direção (chave = id da unidade) */
export const extraDir: Record<string, Lesson[]> = {
  'dir-cnh': [
    L('dir-cnh-4', 'Exames médico e psicológico', [
      card('Exame de aptidão física e mental', 'Feito por médico de tráfego credenciado. Avalia, entre outros:\n\n- **Acuidade visual**, campo visual e visão de cores\n- **Audição**\n- Pressão arterial e condições clínicas\n- Coordenação e reflexos\n\nO médico pode **reduzir a validade** da CNH ou colocar **restrições** (ex.: uso obrigatório de lentes, câmbio automático).'),
      card('Avaliação psicológica', 'Obrigatória na **primeira habilitação** e também para quem passa a **exercer atividade remunerada** (EAR). Avalia atenção, memória, raciocínio e traços de personalidade relevantes para dirigir.\n\nO resultado pode ser apto, inapto temporário ou inapto.'),
      card('Restrições na CNH', 'As restrições aparecem por **códigos** no documento. Exemplos comuns: uso de **lentes corretivas**, **veículo com câmbio automático**, **adaptações** para pessoa com deficiência. Dirigir desrespeitando a restrição é infração.'),
    ], [
      mc('Quem realiza o exame de aptidão física e mental?', ['O instrutor', 'Um médico de tráfego credenciado', 'O agente de trânsito', 'O psicólogo'], 1),
      tf('A avaliação psicológica é exigida na primeira habilitação.', true),
      mc('Quem passa a exercer atividade remunerada ao volante (EAR) também precisa de…', ['Avaliação psicológica', 'Novo exame teórico', 'Curso de mecânica', 'Nada'], 0),
      mc('Uma restrição comum anotada na CNH é…', ['Uso de lentes corretivas', 'Cor preferida do carro', 'Tipo de combustível', 'Estado onde mora'], 0),
      tf('O médico pode reduzir o prazo de validade da CNH quando necessário.', true),
    ]),
    L('dir-cnh-5', 'Renovação, adição e reabilitação', [
      card('Renovação', 'Ao vencer o exame médico, a CNH precisa ser **renovada** fazendo novo exame de aptidão física e mental. Lembre: dirigir com a CNH vencida **há mais de 30 dias** é infração **gravíssima** com retenção do veículo até alguém habilitado assumir (art. 162, V).'),
      card('Adição e mudança de categoria', '- **Adição**: incluir outra categoria do mesmo nível (quem tem B e quer A, por exemplo). Faz aulas e exame prático da nova categoria.\n- **Mudança**: subir para categorias maiores (B para C, D ou E), cumprindo tempo de habilitação, idade e cursos exigidos.'),
      card('Reciclagem e reabilitação', '- **Curso de reciclagem**: obrigatório para voltar a dirigir após **suspensão** e em outros casos previstos (art. 268).\n- **Reabilitação**: após a **cassação**, depois de 2 anos, refazendo o processo de habilitação (exames e cursos exigidos).'),
    ], [
      mc('Dirigir com a CNH vencida há mais de 30 dias é infração…', ['Leve', 'Média', 'Grave', 'Gravíssima'], 3),
      mc('Quem tem categoria B e quer pilotar moto faz…', ['Mudança de categoria', 'Adição de categoria', 'Reabilitação', 'Renovação'], 1),
      mc('Passar da categoria B para a D é…', ['Adição', 'Mudança de categoria', 'Reciclagem', 'Renovação'], 1),
      match('Ligue', [['Exame médico vencido', 'Renovação'], ['Depois da suspensão', 'Curso de reciclagem'], ['Depois da cassação', 'Reabilitação']]),
      tf('A reabilitação após cassação pode ser pedida depois de 2 anos.', true),
    ]),
  ],

  'dir-leg': [
    L('dir-leg-4', 'Definições do CTB (Anexo I)', [
      card('Parada × estacionamento', '- **Parada**: imobilização do veículo pelo tempo **estritamente necessário** para embarque ou desembarque de passageiros.\n- **Estacionamento**: imobilização por tempo **superior** ao necessário para embarque ou desembarque.\n\nUma placa de "proibido estacionar" ainda permite parar rapidamente; "proibido parar e estacionar" não permite nenhum dos dois.'),
      card('Partes da via', '- **Pista**: parte da via normalmente usada pelos veículos\n- **Faixa de trânsito**: subdivisão da pista com largura para uma fila de veículos\n- **Acostamento**: parte da via diferenciada da pista, para **parada ou estacionamento em emergência** e circulação de pedestres e bicicletas quando não houver local apropriado\n- **Calçada**: parte da via destinada a pedestres, mobiliário urbano e vegetação\n- **Passeio**: parte da calçada ou pista separada para pedestres (e, excepcionalmente, ciclistas)\n- **Refúgio**: área sinalizada e protegida para pedestres durante a travessia'),
      card('Ciclovia, ciclofaixa e outros', '- **Ciclovia**: pista própria para bicicletas, **separada fisicamente**\n- **Ciclofaixa**: parte da pista destinada a bicicletas, separada **por sinalização**\n- **Interseção**: todo cruzamento, entroncamento ou bifurcação\n- **Ultrapassagem**: passar à frente de outro veículo do mesmo sentido, **saindo e retornando à faixa de origem**\n- **Passagem**: passar à frente de outro veículo em **outra faixa**, sem precisar mudar de faixa'),
    ], [
      mc('Imobilizar o carro apenas para alguém descer é…', ['Estacionamento', 'Parada', 'Ultrapassagem', 'Retorno'], 1),
      mc('O acostamento serve para…', ['Ultrapassar carros lentos', 'Parada ou estacionamento em emergência', 'Fazer retorno sempre', 'Andar mais rápido'], 1),
      match('Ligue', [['Separada fisicamente', 'Ciclovia'], ['Separada por pintura', 'Ciclofaixa'], ['Área protegida no meio da travessia', 'Refúgio']]),
      mc('Passar à frente de outro carro sem mudar de faixa, numa via de várias faixas, é…', ['Ultrapassagem', 'Passagem', 'Conversão', 'Parada'], 1),
      tf('Com a placa "proibido estacionar", parar rapidamente para embarque e desembarque é permitido.', true),
      mc('Subdivisão da pista com largura para uma fila de veículos:', ['Faixa de trânsito', 'Acostamento', 'Calçada', 'Refúgio'], 0),
    ]),
    L('dir-leg-5', 'Registro, licenciamento e placas', [
      card('Registro e transferência', '- O veículo é **registrado** no DETRAN, gerando o certificado de registro (hoje unificado ao CRLV-e digital).\n- Na compra de um veículo usado, o comprador tem **30 dias** para fazer a **transferência** (art. 123).\n- O vendedor deve **comunicar a venda** ao DETRAN, para não responder por multas futuras.'),
      card('Licenciamento anual', 'Todo ano o veículo precisa ser **licenciado**, com débitos quitados (IPVA, multas, taxas). Sem licenciamento, conduzir é infração **gravíssima** com remoção do veículo.'),
      card('Placa padrão Mercosul', 'Fundo branco, faixa azul superior com a bandeira do Brasil e **7 caracteres** no formato **LLLNLNN** (3 letras, 1 número, 1 letra, 2 números). A cor dos caracteres indica a categoria: **preta** para particulares, **vermelha** para comerciais (aluguel, aprendizagem), **azul** para oficiais, **verde** para veículos em teste, **dourada** para diplomáticos e **prateada** para coleção.'),
    ], [
      mc('Prazo para o comprador transferir um veículo usado:', ['7 dias', '15 dias', '30 dias', '1 ano'], 2),
      tf('O vendedor deve comunicar a venda ao DETRAN para não responder por multas futuras.', true),
      mc('Formato da placa Mercosul:', ['LLL-NNNN', 'LLLNLNN', 'NNNLLLL', 'LLNNLLN'], 1),
      match('Cor dos caracteres na placa Mercosul', [['Particular', 'Preta'], ['Aluguel e aprendizagem', 'Vermelha'], ['Oficial', 'Azul'], ['Coleção', 'Prateada']]),
      mc('O licenciamento do veículo é…', ['Feito uma vez na vida', 'Anual', 'A cada 5 anos', 'Opcional'], 1),
    ]),
  ],

  'dir-inf': [
    L('dir-inf-4', 'Medidas administrativas', [
      card('Penalidade × medida administrativa', '- **Penalidade** é a punição aplicada pela autoridade após o processo (multa, suspensão, cassação...).\n- **Medida administrativa** é uma providência **imediata** do agente para corrigir a situação ou proteger a segurança.'),
      card('As medidas (art. 269)', '- **Retenção do veículo**: fica parado até a irregularidade ser sanada no local\n- **Remoção do veículo**: vai para o pátio\n- **Recolhimento da CNH**\n- **Recolhimento do CRLV**\n- **Transbordo** do excesso de carga\n- **Teste de alcoolemia**, exame ou perícia\n- **Recolhimento de animais** soltos na via'),
      card('Exemplos', '- Sem cinto: **retenção** até colocar o cinto\n- Lei Seca: **recolhimento da CNH** e **retenção** do veículo até um condutor habilitado e sóbrio assumir\n- Estacionar em local proibido que atrapalha: pode haver **remoção**\n- Excesso de peso: **transbordo** da carga'),
    ], [
      mc('Qual destas é uma MEDIDA ADMINISTRATIVA (e não penalidade)?', ['Multa', 'Suspensão do direito de dirigir', 'Remoção do veículo', 'Cassação'], 2),
      match('Ligue a situação à medida', [['Excesso de carga', 'Transbordo'], ['Carro levado ao pátio', 'Remoção'], ['Corrigir no local e seguir', 'Retenção']]),
      tf('Na Lei Seca, a CNH é recolhida e o veículo fica retido até um condutor habilitado e sóbrio assumir.', true),
      mc('A medida administrativa é aplicada…', ['Só depois de anos de processo', 'De imediato pelo agente', 'Pelo juiz', 'Pelo vendedor do carro'], 1),
      tf('Recolher animais soltos na via é uma das medidas administrativas previstas no CTB.', true),
    ]),
    L('dir-inf-5', 'Crimes de trânsito', [
      card('Os principais (arts. 302 a 312)', '- **302**: homicídio culposo na direção\n- **303**: lesão corporal culposa na direção\n- **304**: omissão de socorro\n- **305**: fugir do local do acidente para não ser responsabilizado\n- **306**: dirigir com capacidade alterada por álcool ou drogas\n- **307**: violar suspensão ou proibição de dirigir\n- **308**: racha ou competição não autorizada\n- **309**: dirigir sem habilitação gerando perigo de dano\n- **310**: entregar a direção a pessoa não habilitada ou sem condições\n- **311**: velocidade incompatível perto de escolas, hospitais e aglomerações, gerando perigo\n- **312**: alterar o local do acidente para enganar a investigação'),
      card('Álcool agrava muito', 'Com álcool ou drogas, o **homicídio culposo** passa a ter pena de **reclusão de 5 a 8 anos** (art. 302, § 3º) e a **lesão corporal grave**, de **2 a 5 anos** (art. 303, § 2º). Além da pena, há suspensão ou proibição de obter a habilitação.'),
      card('Infração × crime', 'A mesma conduta pode gerar **as duas coisas**: a infração administrativa (multa, pontos, suspensão, aplicada pelo órgão de trânsito) e o processo criminal (aplicado pela Justiça). Um não exclui o outro.'),
    ], [
      mc('Racha está previsto no artigo…', ['302', '304', '308', '312'], 2),
      mc('Entregar o carro para uma pessoa sem habilitação dirigir é crime do artigo…', ['305', '310', '303', '307'], 1),
      tf('Uma mesma conduta pode gerar infração administrativa e processo criminal.', true),
      mc('Homicídio culposo na direção sob efeito de álcool tem pena de…', ['Multa apenas', 'Detenção de 6 meses', 'Reclusão de 5 a 8 anos', 'Advertência'], 2),
      match('Ligue', [['Fugir do local do acidente', 'Art. 305'], ['Omissão de socorro', 'Art. 304'], ['Dirigir com a CNH suspensa', 'Art. 307']]),
      tf('Alterar o local do acidente para enganar a polícia é crime.', true),
    ]),
    L('dir-inf-6', 'Infrações do dia a dia', [
      card('Sinalizar e se posicionar', '- **Não sinalizar** com antecedência a mudança de direção ou de faixa: **grave** (art. 196)\n- **Parar sobre a faixa de pedestres** na mudança do semáforo: **média** (art. 183)\n- **Não dar preferência ao pedestre** que está na faixa: **gravíssima** (art. 214)\n- **Transitar pelo acostamento**: **gravíssima ×3** (art. 193)'),
      card('Comportamento e conduta', '- **Usar o celular** segurando ou manuseando: gravíssima\n- **Dirigir sem atenção ou sem os cuidados indispensáveis** à segurança: **leve** (art. 169)\n- **Ameaçar pedestres** ou outros veículos (direção agressiva): **gravíssima** (art. 170)\n- **Buzinar** entre 22h e 6h ou de forma prolongada: **leve** (art. 227)'),
      card('Documentos e veículo', '- Dirigir com **CNH de categoria diferente** da do veículo: **gravíssima ×2** (art. 162, III)\n- Veículo **sem equipamento obrigatório** ou com ele ineficiente: **grave** (art. 230, IX)\n- **Placa ilegível**, encoberta ou sem lacre: **gravíssima** (art. 230)'),
    ], [
      mc('Mudar de faixa sem dar seta é infração…', ['Leve', 'Média', 'Grave', 'Gravíssima'], 2),
      mc('Não dar preferência a pedestre que está atravessando na faixa é infração…', ['Leve', 'Média', 'Grave', 'Gravíssima'], 3),
      mc('Andar pelo acostamento para fugir do congestionamento é…', ['Permitido', 'Média', 'Gravíssima ×3', 'Leve'], 2),
      mc('Parar o carro sobre a faixa de pedestres quando o semáforo fecha é infração…', ['Leve', 'Média', 'Grave', 'Gravíssima'], 1),
      tf('Dirigir com CNH de categoria diferente da exigida pelo veículo é infração gravíssima.', true),
      mc('Direção agressiva, ameaçando pedestres ou outros veículos, é infração…', ['Leve', 'Média', 'Grave', 'Gravíssima'], 3),
    ]),
  ],

  'dir-sin': [
    L('dir-sin-5', 'Mais placas de regulamentação', [
      card('Proibições de manobra e circulação', '- **Proibido retornar** (à esquerda ou à direita)\n- **Proibido mudar de faixa** (da esquerda para a direita ou o contrário)\n- **Proibido trânsito** de caminhões, de motocicletas, de bicicletas, de pedestres, de veículos de tração animal ou de veículos automotores\n\nTodas seguem o padrão: círculo branco, orla vermelha, símbolo preto e tarja vermelha.'),
      card('Obrigações (placas sem tarja)', '- **Sentido de circulação** da via (seta)\n- **Vire à esquerda / à direita** e **siga em frente**\n- **Sentido circular obrigatório** (rotatória)\n- **Passagem obrigatória** (pela esquerda ou direita de um obstáculo)\n- **Uso obrigatório de corrente** (em regiões de neve)'),
      card('Limites físicos', 'Placas de regulamentação também limitam o veículo:\n\n- **Altura máxima** permitida (ex.: 3,5 m em viadutos)\n- **Largura máxima**\n- **Peso bruto total máximo**\n- **Peso máximo por eixo**\n- **Comprimento máximo**\n\nUltrapassar esses limites pode causar acidentes graves com pontes e túneis.'),
      card('Regulamentação de estacionamento e velocidade', '- **Estacionamento regulamentado**: "E" sem tarja, geralmente com informação complementar (horário, tipo de veículo)\n- **Velocidade máxima** permitida: número em km/h\n- **Duplo sentido de circulação**: duas setas opostas\n- **Pedestre, ande pela esquerda / direita**'),
    ], [
      tf('Placas de regulamentação que indicam obrigação (como "siga em frente") não têm tarja vermelha.', true),
      mc('Uma placa circular com um caminhão e tarja vermelha significa…', ['Caminhões têm preferência', 'Proibido trânsito de caminhões', 'Área de carga e descarga', 'Velocidade máxima para caminhões'], 1),
      mc('Uma placa com "3,5 m" antes de um viaduto indica…', ['Velocidade mínima', 'Altura máxima permitida', 'Distância até o viaduto', 'Largura da faixa'], 1),
      mc('A placa de sentido circular obrigatório aparece em…', ['Rotatórias', 'Pontes', 'Estacionamentos', 'Rodovias retas'], 0),
      match('Ligue a placa ao tipo', [['Proibido retornar', 'Proibição'], ['Siga em frente', 'Obrigação'], ['Peso máximo por eixo', 'Limite físico']]),
      mc('"E" dentro de círculo de orla vermelha, sem tarja, significa…', ['Proibido estacionar', 'Estacionamento regulamentado', 'Escola', 'Entrada'], 1, '', 'R-6b'),
    ]),
    L('dir-sin-6', 'Mais placas de advertência', [
      card('Pista e traçado', '- **Curva** acentuada, curva suave, curva em "S", pista sinuosa\n- **Estreitamento** de pista (ao centro, à esquerda, à direita)\n- **Pista irregular**, **saliência ou lombada**, **depressão**\n- **Pista escorregadia**\n- **Declive** e **aclive** acentuados'),
      card('Cruzamentos e interseções', '- **Cruzamento** de vias\n- Via lateral à esquerda ou à direita\n- **Interseção em "T"**, em "Y" (bifurcação)\n- **Junções sucessivas**\n- **Parada obrigatória à frente** e **semáforo à frente**'),
      card('Usuários e situações', '- **Passagem de pedestres**, **escolares**, **ciclistas**\n- **Animais** domésticos ou selvagens na pista\n- **Passagem de nível** com ou sem barreira (trem)\n- **Cruz de Santo André**: indica o local exato do cruzamento com a linha férrea\n- **Obras**: fundo **laranja**'),
      card('Dica de prova', 'Se a placa é **amarela em losango**, ela **avisa** de um perigo. A conduta esperada é sempre a mesma: **reduzir a velocidade e redobrar a atenção**. Memorize o desenho pelo que ele representa, não pelo código.'),
    ], [
      mc('Placas de advertência de obras têm fundo…', ['Amarelo', 'Laranja', 'Azul', 'Verde'], 1),
      mc('A Cruz de Santo André indica…', ['Hospital próximo', 'O local exato do cruzamento com a linha férrea', 'Proibido virar', 'Igreja'], 1),
      tf('Diante de uma placa de advertência, a conduta esperada é reduzir a velocidade e redobrar a atenção.', true),
      mc('Uma placa amarela com um carro derrapando indica…', ['Pista escorregadia', 'Proibido ultrapassar', 'Oficina mecânica', 'Fim de pista'], 0),
      match('Ligue', [['Duas faixas viram uma', 'Estreitamento de pista'], ['Trem cruzando', 'Passagem de nível'], ['Crianças atravessando', 'Passagem de escolares']]),
      mc('O que significa esta placa?', ['Saliência ou lombada', 'Ponte móvel', 'Área de lazer', 'Pista dupla'], 0, '', 'A-18'),
    ]),
    L('dir-sin-7', 'Indicação, educativas e dispositivos auxiliares', [
      card('Placas de indicação', '- **Identificação**: nome de rodovia, quilômetro, limite de municípios\n- **Orientação de destino**: setas com cidades ou bairros (verde em rodovias, azul nas cidades)\n- **Educativas**: mensagens como "Use o cinto" (fundo branco)\n- **Serviços auxiliares**: pictogramas de posto, hospital, borracharia, restaurante (fundo azul)\n- **Atrativos turísticos**: fundo marrom'),
      card('Dispositivos auxiliares', 'Elementos que aumentam a percepção da via:\n\n- **Tachas e tachões** (os "olhos de gato")\n- **Balizadores** e delineadores\n- **Cones**, cavaletes, barreiras\n- **Ondulações transversais** (lombadas) e sonorizadores\n- **Marcadores de obstáculo** com listras inclinadas'),
      card('Sinalização temporária', 'Em obras e eventos, a sinalização temporária (laranja e branca) **prevalece** sobre a permanente. Se a placa de obra pede 40 km/h numa via de 80 km/h, vale **40 km/h**.'),
    ], [
      mc('Placa de fundo azul com o desenho de uma bomba de combustível é de…', ['Regulamentação', 'Advertência', 'Serviços auxiliares', 'Atrativo turístico'], 2),
      mc('Placas de orientação de destino em rodovias têm fundo…', ['Azul', 'Verde', 'Marrom', 'Laranja'], 1),
      tf('Em obras, a sinalização temporária prevalece sobre a sinalização permanente.', true),
      mc('Tachas refletivas no chão são exemplos de…', ['Sinalização sonora', 'Dispositivos auxiliares', 'Placas de indicação', 'Gestos do agente'], 1),
      match('Ligue a placa à cor de fundo', [['Educativa', 'Branco'], ['Atrativo turístico', 'Marrom'], ['Orientação em vias urbanas', 'Azul']]),
    ]),
  ],

  'dir-circ': [
    L('dir-circ-4', 'Rodovias, faixas e retornos', [
      card('Uso das faixas (art. 29, IV)', 'Em pistas com várias faixas no mesmo sentido:\n\n- **Faixas da direita**: veículos **mais lentos e de maior porte**\n- **Faixas da esquerda**: **ultrapassagem** e veículos de maior velocidade\n\nFicar na esquerda devagar, atrapalhando a fluidez, é falta de cortesia e pode ser infração.'),
      card('Conversão à esquerda e retorno em rodovia (art. 37)', 'Nas vias com acostamento, a conversão à esquerda e o retorno devem ser feitos nos **locais apropriados**. Onde não existirem, o condutor deve **aguardar no acostamento, à direita**, para cruzar a pista com segurança.\n\nNunca pare na faixa da esquerda da rodovia para esperar o retorno.'),
      card('Velocidade e distância em rodovia', '- Em pista simples, **luz baixa** acesa também de dia (veículos sem DRL)\n- Mantenha **distância maior** que na cidade (a velocidade é maior)\n- Ultrapasse só com **visibilidade e espaço**, nunca em faixa contínua\n- Respeite a **velocidade mínima**: metade da máxima'),
    ], [
      mc('Em uma pista com várias faixas no mesmo sentido, veículos lentos devem usar…', ['As faixas da esquerda', 'As faixas da direita', 'O acostamento', 'Qualquer faixa'], 1),
      mc('Sem local apropriado para retorno numa rodovia com acostamento, o condutor deve…', ['Parar na faixa da esquerda', 'Aguardar no acostamento à direita e cruzar com segurança', 'Fazer o retorno em qualquer ponto', 'Dar ré'], 1),
      tf('As faixas da esquerda são destinadas à ultrapassagem e aos veículos mais rápidos.', true),
      mc('Velocidade mínima numa rodovia de máxima 100 km/h:', ['30 km/h', '50 km/h', '70 km/h', 'Não existe'], 1),
      tf('É permitido parar na faixa da esquerda da rodovia para esperar um retorno.', false),
    ]),
    L('dir-circ-5', 'Pedestres, ciclistas e motos', [
      card('Pedestres (arts. 68 a 71)', '- O pedestre deve usar **calçadas e passeios**; atravessar na faixa, passarela ou onde houver sinalização\n- Onde não houver calçada nem acostamento (área rural), anda pelos **bordos da pista, em fila única**, no **sentido contrário** ao dos veículos\n- Na faixa sem semáforo, o pedestre tem **prioridade**'),
      card('Ciclistas (arts. 58 e 59)', '- Circulam em ciclovia ou ciclofaixa; sem elas, nos **bordos da pista**, no **mesmo sentido** dos veículos, com preferência sobre os automotores\n- Andar de bicicleta na calçada só quando **permitido e sinalizado**\n- Ao ultrapassar ciclista: **1,5 m** de distância lateral e velocidade reduzida'),
      card('Motociclistas', '- Atenção redobrada ao **ponto cego**: motos aparecem de repente nos espelhos\n- Antes de mudar de faixa no trânsito lento, **olhe por cima do ombro**\n- Abrir a porta do carro sem olhar (o "dooring") é causa frequente de acidentes com ciclistas e motociclistas'),
    ], [
      mc('Em uma rodovia sem acostamento, o pedestre deve andar…', ['No meio da pista', 'No bordo, em fila única, em sentido contrário ao dos veículos', 'No mesmo sentido dos carros', 'Onde quiser'], 1),
      mc('Sem ciclovia, o ciclista circula…', ['Na contramão', 'Nos bordos da pista, no mesmo sentido dos veículos', 'Sempre na calçada', 'No canteiro central'], 1),
      tf('Andar de bicicleta na calçada é permitido em qualquer situação.', false, 'Só quando autorizado e sinalizado pelo órgão de trânsito.'),
      mc('Abrir a porta do carro sem olhar para trás pode causar…', ['Aquaplanagem', 'Acidente com ciclistas e motociclistas', 'Pane elétrica', 'Nada'], 1),
      tf('Na faixa de pedestres sem semáforo, o pedestre tem prioridade.', true),
    ]),
    L('dir-circ-6', 'Rotatórias e cruzamentos a fundo', [
      card('Rotatória passo a passo', '1. Reduza e observe a sinalização (geralmente "Dê a preferência")\n2. **Dê preferência a quem já está circulando**\n3. Entre pela **direita** e circule no sentido **anti-horário**\n4. Para sair, sinalize **à direita** e saia pela faixa da direita\n\nSe for dar mais de meia volta, posicione-se na faixa interna e vá para a externa antes de sair.'),
      card('Cruzamento sem sinalização', 'Preferência de quem vem **pela direita** (art. 29, III, c). Mesmo tendo preferência, **reduza e confira**: ter razão não evita uma colisão.'),
      card('Cruzamento com semáforo', '- No verde, só entre se houver espaço para **sair do outro lado** (não "tranque" o cruzamento)\n- Ao converter, dê preferência a **pedestres** que atravessam a via para onde você vai\n- Semáforo apagado ou piscando amarelo: trate como cruzamento **sem sinalização** e redobre a atenção'),
    ], [
      order('Ordene como entrar e sair de uma rotatória', ['Reduzir e observar', 'Dar preferência a quem circula', 'Entrar pela direita e circular', 'Sinalizar à direita e sair']),
      mc('Numa rotatória, o sentido de circulação é…', ['Horário', 'Anti-horário', 'Qualquer um', 'Depende do dia'], 1),
      mc('Com semáforo verde mas o cruzamento congestionado do outro lado, você deve…', ['Entrar mesmo assim', 'Aguardar até haver espaço para atravessar', 'Buzinar', 'Subir na calçada'], 1),
      mc('Semáforo piscando em amarelo indica…', ['Siga sem cuidado', 'Atenção: trate como cruzamento sem sinalização', 'Pare definitivamente', 'Via fechada'], 1),
      tf('Ter a preferência dispensa reduzir a velocidade no cruzamento.', false),
    ]),
  ],

  'dir-def': [
    L('dir-def-4', 'Chuva, neblina e noite', [
      card('Chuva', '- **Reduza a velocidade** e **dobre a distância** de seguimento\n- Luz **baixa** acesa\n- Os primeiros minutos de chuva são os mais perigosos: a água mistura com óleo e poeira e o asfalto fica escorregadio\n- Evite poças: podem esconder buracos e causar aquaplanagem\n- Desembaçe o vidro com o ar-condicionado ou ventilação'),
      card('Neblina e fumaça', '- **Luz baixa** e farol de neblina, se houver; **nunca luz alta** (reflete nas gotículas)\n- Guie-se pelas **marcas da pista**, à direita\n- **Não pare na pista**; se precisar parar, saia para um local seguro fora da via\n- **Pisca-alerta em movimento não é permitido** (é para imobilizações e emergências)'),
      card('Noite', '- A visibilidade cai e a **distância de visão** fica limitada ao alcance dos faróis\n- Mantenha velocidade que permita **parar dentro da área iluminada**\n- Faróis limpos e regulados\n- Use a luz alta só em vias sem iluminação e sem veículos à frente ou vindo em sentido contrário'),
    ], [
      mc('Quando a chuva acaba de começar, o asfalto fica…', ['Mais aderente', 'Mais escorregadio, por causa do óleo e da poeira', 'Igual', 'Seco'], 1),
      tf('Na neblina, deve-se usar a luz alta para enxergar mais longe.', false),
      mc('Usar o pisca-alerta com o carro em movimento na neblina é…', ['Obrigatório', 'Não permitido, pois o pisca-alerta é para imobilizações e emergências', 'Recomendado sempre', 'Só de dia'], 1),
      mc('À noite, a velocidade deve permitir…', ['Chegar mais rápido', 'Parar dentro da área iluminada pelos faróis', 'Ultrapassar sempre', 'Usar só a luz alta'], 1),
      mc('Na neblina densa, você deve se guiar…', ['Pelo carro da frente bem colado', 'Pelas marcas da pista à direita', 'Pelo centro da pista', 'Pelo GPS apenas'], 1),
    ]),
    L('dir-def-5', 'O fator humano', [
      card('Distração', 'Olhar o celular por **2 segundos a 80 km/h** significa percorrer cerca de **44 metros** sem ver a pista. Mensagens, GPS manuseado, comer e conversas intensas também tiram a atenção.'),
      card('Sono e fadiga', '- Sinais: bocejos, piscar pesado, esquecer os últimos quilômetros, sair da faixa\n- O **microssono** dura poucos segundos e é suficiente para um acidente grave\n- Café e janela aberta **não resolvem**: a única solução é **parar e descansar**\n- Para motoristas profissionais, o CTB proíbe dirigir mais de **5 horas e meia** ininterruptas (art. 67-C)'),
      card('Álcool, drogas e remédios', '- O álcool reduz reflexos e visão periférica e **aumenta a confiança**, uma combinação perigosa\n- Não existe truque para "baixar" o álcool no sangue: só o tempo\n- Remédios como antialérgicos, calmantes e relaxantes musculares podem causar sono: leia a bula'),
      card('Emoções', 'Raiva, pressa e ansiedade levam a decisões arriscadas. Se alguém te provocar no trânsito, **não revide**: reduza, dê espaço e siga.'),
    ], [
      mc('A 80 km/h, 2 segundos olhando o celular equivalem a percorrer cerca de…', ['4 metros', '20 metros', '44 metros', '200 metros'], 2, '80 km/h ≈ 22 m por segundo.'),
      tf('Café e janela aberta resolvem o sono ao volante.', false),
      mc('A única solução eficaz para a fadiga ao volante é…', ['Aumentar o som', 'Parar e descansar', 'Dirigir mais rápido para chegar logo', 'Mascar chiclete'], 1),
      mc('Pelo CTB, o motorista profissional não pode dirigir ininterruptamente por mais de…', ['2 horas', '4 horas', '5 horas e meia', '10 horas'], 2),
      tf('Alguns remédios, como antialérgicos, podem causar sonolência e afetar a direção.', true),
      mc('Diante de um motorista agressivo, o melhor é…', ['Revidar', 'Reduzir, dar espaço e seguir', 'Frear na frente dele', 'Persegui-lo'], 1),
    ]),
    L('dir-def-6', 'Ultrapassagem e colisões evitáveis', [
      card('Antes de ultrapassar, pergunte', '1. É **permitido** aqui? (linha tracejada, sem curva, ponte ou cruzamento)\n2. Tenho **visibilidade** suficiente?\n3. Tenho **espaço e potência** para completar?\n4. Alguém **atrás de mim** já está ultrapassando?\n\nSe qualquer resposta for "não", espere.'),
      card('Colisão traseira', 'É o tipo mais comum. Evite com **distância de seguimento**, atenção ao trânsito à frente (olhe dois ou três carros adiante) e freadas suaves e antecipadas.'),
      card('Colisão frontal e com moto', '- **Frontal**: quase sempre por ultrapassagem indevida ou invasão da contramão em curva. É a mais violenta.\n- **Com motos**: muitas acontecem em **conversões à esquerda**, quando o motorista não percebe a moto vindo em sentido contrário. Olhe duas vezes.'),
    ], [
      order('Ordene as perguntas antes de ultrapassar', ['É permitido aqui?', 'Tenho visibilidade?', 'Tenho espaço e potência?', 'Alguém atrás já está ultrapassando?']),
      mc('O tipo de colisão mais comum é…', ['Frontal', 'Traseira', 'Capotamento', 'Com trem'], 1),
      mc('Para evitar colisão traseira, ajuda…', ['Olhar só para o carro imediatamente à frente', 'Olhar dois ou três carros adiante', 'Andar colado', 'Frear bruscamente'], 1),
      tf('Muitas colisões com motos acontecem em conversões à esquerda.', true),
      mc('A colisão frontal costuma resultar de…', ['Distância grande', 'Ultrapassagem indevida ou invasão da contramão', 'Estacionar errado', 'Usar luz baixa'], 1),
    ]),
  ],

  'dir-ps': [
    L('dir-ps-3', 'Avaliação da vítima e RCP', [
      card('Avaliação primária', '1. **Segurança da cena** primeiro\n2. **Responsividade**: toque nos ombros e chame em voz alta\n3. **Respiração**: observe o peito por **até 10 segundos**\n4. **Acione o 192** (ou peça a alguém) e informe o estado da vítima'),
      card('RCP para leigos', 'Se a vítima **não responde e não respira** normalmente:\n\n- Mãos sobrepostas no **centro do peito**\n- Braços esticados, compressões fortes de **5 a 6 cm**\n- Ritmo de **100 a 120 por minuto**\n- Deixe o tórax **voltar** totalmente entre as compressões\n- Leigos podem fazer **só compressões**, sem parar, até o socorro chegar ou um **DEA** (desfibrilador) estar disponível'),
      card('Vítima consciente', '- Converse, tranquilize, mantenha aquecida\n- Não dê comida, água ou remédio\n- Não a deixe sozinha\n- Observe mudanças (sonolência, confusão, palidez) e informe o socorro'),
    ], [
      order('Ordene a avaliação primária', ['Segurança da cena', 'Checar responsividade', 'Checar respiração', 'Acionar o socorro']),
      mc('Por quanto tempo observar a respiração?', ['Até 10 segundos', '1 minuto', '5 minutos', 'Não precisa'], 0),
      mc('Profundidade das compressões em adultos:', ['1 a 2 cm', '5 a 6 cm', '10 a 12 cm', 'O máximo possível'], 1),
      tf('Leigos podem fazer apenas compressões torácicas, sem ventilações, até o socorro chegar.', true),
      mc('DEA é…', ['Um tipo de maca', 'O desfibrilador externo automático', 'Um documento do carro', 'Um remédio'], 1),
      tf('Entre as compressões, o tórax deve voltar totalmente à posição normal.', true),
    ]),
  ],

  'dir-mec': [
    L('dir-mec-3', 'Freios, suspensão e direção', [
      card('Freios', '- **Fluido de freio** absorve umidade com o tempo e perde eficiência: troque conforme o manual\n- **Pedal "borrachudo"** ou que desce demais: possível ar no sistema ou fluido baixo\n- **Chiado metálico**: pastilhas no fim\n- Luz do freio no painel acesa com o freio de mão baixado: verifique o fluido'),
      card('Suspensão', 'Amortecedores gastos fazem o carro **balançar**, perder aderência nas curvas e **aumentam a distância de frenagem**. Sinais: carro "quicando" após lombadas, desgaste irregular dos pneus.'),
      card('Direção, alinhamento e balanceamento', '- **Carro puxando para um lado**: alinhamento ou calibragem desigual\n- **Volante vibrando** em certa velocidade: balanceamento das rodas\n- **Volante duro** de repente: problema na direção hidráulica ou elétrica'),
    ], [
      mc('Pedal de freio "borrachudo" pode indicar…', ['Pneu careca', 'Ar no sistema ou fluido baixo', 'Bateria fraca', 'Óleo do motor alto'], 1),
      mc('Volante vibrando a partir de certa velocidade costuma ser problema de…', ['Balanceamento', 'Combustível', 'Bateria', 'Ar-condicionado'], 0),
      mc('Carro puxando para um lado pode ser…', ['Alinhamento ou calibragem desigual', 'Óleo vencido', 'Farol queimado', 'Rádio ligado'], 0),
      tf('Amortecedores gastos aumentam a distância de frenagem.', true),
      tf('O fluido de freio nunca precisa ser trocado.', false),
      match('Ligue o sintoma à causa provável', [['Chiado metálico ao frear', 'Pastilhas no fim'], ['Carro quicando após lombada', 'Amortecedores gastos'], ['Volante duro de repente', 'Falha na direção assistida']]),
    ]),
    L('dir-mec-4', 'Pane e emergências na estrada', [
      card('Pane: o que fazer', '1. Ligue o **pisca-alerta**\n2. Leve o carro para o **acostamento** ou local seguro, o mais à direita possível\n3. Coloque o **triângulo** a uma distância segura (cerca de 1 passo longo por km/h da via)\n4. Saia do carro pelo **lado oposto ao trânsito** e fique fora da pista, atrás da defensa se houver\n5. Chame ajuda (seguradora, concessionária da rodovia, 191 em rodovias federais)'),
      card('Pneu furado andando', 'Segure o volante **firme**, **não freie bruscamente**, tire o pé do acelerador e deixe o carro perder velocidade em linha reta antes de ir para o acostamento.'),
      card('Superaquecimento e incêndio', '- Luz de temperatura acesa: pare em local seguro e desligue o motor. **Não abra o reservatório quente**.\n- Fumaça ou fogo: pare, desligue, **saia com todos**, afaste-se e chame o **193**. Não abra o capô se houver chamas.'),
    ], [
      order('Ordene o que fazer numa pane', ['Ligar o pisca-alerta', 'Ir para o acostamento', 'Colocar o triângulo', 'Sair pelo lado oposto ao trânsito', 'Chamar ajuda']),
      mc('Se um pneu furar com o carro andando, você deve…', ['Frear forte imediatamente', 'Segurar firme o volante e reduzir aos poucos', 'Virar rápido para o acostamento', 'Acelerar'], 1),
      tf('Se o motor superaquecer, deve-se abrir logo a tampa do reservatório para esfriar.', false),
      mc('Com fogo no motor, você deve…', ['Abrir o capô para apagar', 'Sair com todos, afastar-se e chamar o 193', 'Continuar dirigindo até um posto', 'Jogar água no motor ligado'], 1),
      mc('Depois de parar no acostamento, os ocupantes devem esperar…', ['Dentro do carro', 'Fora da pista, em local protegido', 'Na faixa da direita', 'Sentados no capô'], 1),
    ]),
  ],

  'dir-pratica': [
    L('dir-prat-3', 'Percurso na via pública', [
      card('O que a banca observa', '- **Respeito à sinalização**: placas, semáforos, faixas\n- **Uso da seta** com antecedência em toda conversão e mudança de faixa\n- **Posição na via** e trajetória nas conversões\n- **Velocidade** compatível\n- **Preferência** de pedestres e outros veículos\n- **Uso dos espelhos** e atenção geral'),
      card('Hábitos que contam pontos', '- Esquecer a seta: **grave** (4 pontos no exame)\n- Não usar o cinto: **grave**\n- Avançar parada obrigatória ou sinal vermelho: **gravíssima** (6 pontos)\n- Não dar preferência ao pedestre na faixa: **gravíssima**\n- Parar sobre a faixa de pedestres: **média** (2 pontos)\n\nLembre: aprovado quem **não ultrapassar 10 pontos**.'),
      card('Estratégia', 'Fale baixinho para si o que vai fazer ("seta, espelho, reduzo, viro"). Isso cria uma **rotina** que diminui esquecimentos sob nervosismo. Se errar, **não desista**: o exame é por pontuação e ainda dá para passar.'),
    ], [
      mc('Esquecer a seta numa conversão, no novo exame, soma…', ['1 ponto', '2 pontos', '4 pontos', '6 pontos'], 2, 'Deixar de sinalizar é infração grave (art. 196), que vale 4 pontos no exame.'),
      mc('Avançar uma placa de parada obrigatória soma…', ['1 ponto', '2 pontos', '4 pontos', '6 pontos'], 3),
      mc('Parar sobre a faixa de pedestres soma…', ['1 ponto', '2 pontos', '4 pontos', '6 pontos'], 1),
      tf('Depois de um erro no exame prático, ainda é possível ser aprovada, desde que não passe de 10 pontos.', true),
      mc('Um candidato esqueceu a seta (4) e parou sobre a faixa (2). Total e resultado:', ['6 pontos, aprovado', '6 pontos, reprovado', '10 pontos, reprovado', '12 pontos, reprovado'], 0),
      order('Ordene a rotina antes de virar', ['Seta', 'Espelho', 'Reduzir', 'Virar']),
    ]),
  ],

  'dir-moto': [
    L('dir-moto-2', 'Pilotagem defensiva de moto', [
      card('Seja visto', '- Farol aceso sempre (obrigatório) e roupas claras ou refletivas\n- Evite ficar no **ponto cego** dos carros e caminhões\n- Posicione-se na faixa de forma que o motorista à frente **te veja no espelho**'),
      card('Frenagem e curvas', '- Use **os dois freios**; o dianteiro responde pela maior parte da frenagem\n- Freie **antes** da curva, em linha reta\n- Na curva, **olhe para a saída**: a moto vai para onde você olha\n- Com piso molhado, frenagens mais suaves e distâncias maiores'),
      card('Riscos típicos', '- Carro convertendo à esquerda na sua frente\n- Portas de carro abrindo\n- Faixas pintadas, tampas de bueiro e areia: ficam **escorregadias**\n- Corredor entre carros: a velocidade relativa precisa ser **baixa**'),
    ], [
      mc('Na moto, qual freio faz a maior parte da frenagem?', ['O traseiro', 'O dianteiro', 'O motor', 'Nenhum'], 1),
      mc('Quando frear numa curva?', ['No meio da curva, com força', 'Antes da curva, em linha reta', 'Na saída', 'Nunca'], 1),
      tf('Na curva, a moto tende a ir para onde o piloto olha.', true),
      mc('Faixas pintadas e tampas de bueiro molhadas ficam…', ['Mais aderentes', 'Escorregadias', 'Iguais ao asfalto', 'Quentes'], 1),
      tf('Ficar no ponto cego de um caminhão é uma posição segura para a moto.', false),
    ]),
  ],
}
