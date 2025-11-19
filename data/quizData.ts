
import type { Question } from '../types';

// Scoring: Far Left (-3), Left (-2), Center-Left (-1), Center (0), Center-Right (1), Right (2), Far Right (3)
// This mapping is designed to make positive scores align with the right side of the political spectrum, matching the UI.
export const quizQuestions: Question[] = [
    // Bloco 1: Dados Demográficos (Sem pontuação)
    { id: 1, block: "Dados Demográficos", question: "Qual é a sua idade?", isDemographic: true, answers: [ { text: "Menos de 18 anos", score: 0 }, { text: "18 a 24 anos", score: 0 }, { text: "25 a 30 anos", score: 0 }, { text: "31 a 40 anos", score: 0 }, { text: "41 a 50 anos", score: 0 }, { text: "51 a 60 anos", score: 0 }, { text: "Mais de 60 anos", score: 0 } ] },
    { id: 2, block: "Dados Demográficos", question: "Qual é o seu gênero?", isDemographic: true, answers: [ { text: "Masculino", score: 0 }, { text: "Feminino", score: 0 }, { text: "Outro", score: 0 } ] },

    // Bloco 2: Questões Sociais
    { id: 3, block: "Questões Sociais", question: "Homossexuais devem ter o direito de se casar no civil e no religioso?", answers: [ { text: "Sim no civil, não no religioso", score: 1 }, { text: "Sim no civil e no religioso", score: -2 }, { text: "Não no civil e no religioso", score: 2 }, { text: "O casamento não deveria existir", score: 2 }, { text: "Sim no civil, no religioso fica a critério de cada religião", score: 1 } ] },
    { id: 4, block: "Questões Sociais", question: "Sobre a agenda woke (movimentos por diversidade, equidade e inclusão):", answers: [ { text: "Apoio total; é essencial", score: -3 }, { text: "Apoio parcial, mas sem imposições", score: -1 }, { text: "Neutro; foco em meritocracia", score: 0 }, { text: "Oposição; promove divisão e censura", score: 2 }, { text: "Oposição total; é uma ameaça", score: 3 } ] },
    { id: 5, block: "Questões Sociais", question: "O aborto deve ser legalizado?", answers: [ { text: "Sim, em todos os casos", score: -2 }, { text: "Sim, mas apenas em casos específicos", score: 0 }, { text: "Não, em nenhum caso", score: 2 } ] },
    { id: 6, block: "Questões Sociais", question: "Prostituição deve ser liberada?", answers: [ { text: "Sim, é resultado da libertação da mulher", score: -2 }, { text: "Sim, as pessoas têm direito de vender o corpo", score: 2 }, { text: "Não, é imoral e deve ser proibido", score: 2 }, { text: "Sim, mas com regulação estatal para proteção", score: -1 } ] },
    { id: 7, block: "Questões Sociais", question: "Você concorda com a frase: \"O ser humano é bom, a sociedade o corrompe\"?", answers: [ { text: "Sim, somos bons, o capitalismo nos impede", score: -3 }, { text: "Sim, somos bons, mas o capitalismo exclui minorias", score: -2 }, { text: "Não, somos maus por natureza", score: 2 }, { text: "Sim, e o capitalismo pode ser aprimorado", score: 1 }, { text: "Não, apenas nossos compatriotas são bons", score: 3 } ] },

    // Bloco 3: Economia e Estado
    { id: 8, block: "Economia e Estado", question: "O Estado deve fornecer assistencialismo?", answers: [ { text: "Sim, por tempo indeterminado como direito básico", score: -3 }, { text: "Sim, mas temporário e aliado a educação", score: -1 }, { text: "Não, cria dependência estatal e desestimula o trabalho", score: 2 }, { text: "Sim, mas restrito a interesses nacionais estratégicos", score: 1 } ] },
    { id: 9, block: "Economia e Estado", question: "O Estado deve intervir na economia?", answers: [ { text: "Sim, centralizar tudo", score: -3 }, { text: "Sim, humanizar o capitalismo via distribuição de renda", score: -2 }, { text: "Sim, mas só combater monopólios", score: 0 }, { text: "Não, o mercado se autorregula", score: 2 }, { text: "Não, o Estado deve ser extirpado", score: 3 } ] },
    { id: 10, block: "Economia e Estado", question: "Você apoia um salário mínimo?", answers: [ { text: "Sim, totalmente", score: -2 }, { text: "Não, deve ser negociado livremente", score: 2 }, { text: "Não, mas simbólico para guiar negociações", score: 1 } ] },
    { id: 11, block: "Economia e Estado", question: "Qual a melhor lógica para a cobrança de impostos?", answers: [ { text: "Flat Tax: Uma alíquota única e igual para todos, garantindo igualdade jurídica", score: 2 }, { text: "Progressiva: Quem tem maior renda paga alíquota maior para reduzir desigualdades", score: -2 }, { text: "Grandes Fortunas: Foco em taxar pesadamente heranças e acúmulo de capital", score: -3 }, { text: "Consumo: Desonerar a renda e produção, focando a tributação no consumo", score: 1 } ] },
    { id: 12, block: "Economia e Estado", question: "Congelamento de preços combate a inflação?", answers: [ { text: "Sim, é necessário para conter abusos de poder econômico", score: -3 }, { text: "Sim, protege o poder de compra do trabalhador", score: -1 }, { text: "Não, cria distorções e desabastecimento", score: 2 } ] },
    { id: 13, block: "Economia e Estado", question: "Sobre protecionismo: aumentar impostos sobre importados protege a indústria nacional?", answers: [ { text: "Sim, equilibra preços e soberania", score: 1 }, { text: "Não, prejudica o mercado e o consumidor", score: 2 } ] },
    { id: 14, block: "Economia e Estado", question: "Você é a favor de leis trabalhistas?", answers: [ { text: "Sim, fortes contra exploração", score: -2 }, { text: "Sim, flexíveis para negociação", score: 0 }, { text: "Não, acordo livre entre patrão e empregado", score: 2 } ] },

    // Bloco 4: Política Externa e Segurança
    { id: 15, block: "Política Externa e Segurança", question: "Sobre a política de \"fronteira aberta\" da UE:", answers: [ { text: "Apoio; promove solidariedade global", score: -3 }, { text: "Apoio parcial, com controles humanitários", score: -1 }, { text: "Oposição; ameaça soberania", score: 2 }, { text: "Neutro; foco em acordos bilaterais", score: 0 } ] },
    { id: 16, block: "Política Externa e Segurança", question: "Sanções Magnitsky dos EUA contra autoridades brasileiras:", answers: [ { text: "Apoio; punem corrupção e abusos", score: 1 }, { text: "Oposição; viola soberania", score: 2 }, { text: "Neutro; EUA exageram", score: 0 } ] },
    { id: 17, block: "Política Externa e Segurança", question: "O tarifaço de 50% dos EUA sobre exportações brasileiras em 2025:", answers: [ { text: "Culpa do STF; sanção justa", score: 2 }, { text: "Culpa de Trump; Brasil deve retaliar", score: 1 }, { text: "Neutro; comércio global é assim", score: 0 } ] },
    { id: 18, block: "Política Externa e Segurança", question: "Atuação de Eduardo Bolsonaro nos EUA em 2025 (articulando sanções contra o Brasil):", answers: [ { text: "Apoio; defende família", score: 3 }, { text: "Oposição; traição à pátria", score: -3 }, { text: "Neutro; prejudicial ao país", score: 0 } ] },
    { id: 19, block: "Política Externa e Segurança", question: "É lícito guerra contra países com ideias totalitárias?", answers: [ { text: "Sim", score: 1 }, { text: "Não", score: 0 }, { text: "Sim, só se extrema-esquerda", score: 2 }, { text: "Sim, só se extrema-direita", score: -2 } ] },
    { id: 20, block: "Política Externa e Segurança", question: "Alistamento militar obrigatório?", answers: [ { text: "Sim, para ambos sexos", score: 1 }, { text: "Sim, só homens", score: 2 }, { text: "Não para ambos", score: -1 }, { text: "Não deveriam haver exércitos", score: -3 } ] },

    // Bloco 5: Liberdades e Mídia
    { id: 21, block: "Liberdades e Mídia", question: "Drogas devem ser legalizadas?", answers: [ { text: "Sim, todas", score: -2 }, { text: "Não, nenhuma", score: 2 }, { text: "Sim, algumas", score: 0 } ] },
    { id: 22, block: "Liberdades e Mídia", question: "Sobre armas de fogo: podem ser comercializadas livremente?", answers: [ { text: "Sim, como qualquer mercadoria", score: 2 }, { text: "Sim, mas em locais reservados", score: 1 }, { text: "Não, proibido", score: -2 }, { text: "Não, só pequeno porte", score: 1 } ] },
    { id: 23, block: "Liberdades e Mídia", question: "O Estado pode proibir propagandas de cigarro, cerveja ou armas?", answers: [ { text: "Sim, incentiva vícios e violência", score: -1 }, { text: "Não, liberdade de empresa", score: 2 }, { text: "Sim, só em horários", score: 0 }, { text: "Não, corpo e dinheiro são livres", score: 2 } ] },
    { id: 24, block: "Liberdades e Mídia", question: "Órgãos de mídia governamentais?", answers: [ { text: "Sim, todos estatais para proletariado", score: -3 }, { text: "Sim, para nação", score: 1 }, { text: "Sim, só um para fatos oficiais", score: 0 }, { text: "Não, todos privados", score: 2 } ] },
    { id: 25, block: "Liberdades e Mídia", question: "Voto obrigatório?", answers: [ { text: "Sim", score: -1 }, { text: "Não, facultativo", score: 1 } ] },

    // Bloco 6: Autores, Partidos e Internacional
    { id: 26, block: "Autores e Partidos", question: "Com qual autor você se identifica mais?", answers: [ { text: "Olavo de Carvalho", score: 2 }, { text: "Luiz Felipe Pondé", score: 2 }, { text: "Hayek", score: 2 }, { text: "Karl Marx", score: -3 }, { text: "Murray Rothbard", score: 3 }, { text: "Gustavo Barroso", score: 2 } ] },
    { id: 27, block: "Autores e Partidos", question: "Qual partido brasileiro representa melhor seu pensamento?", answers: [ { text: "PL", score: 2 }, { text: "PCdoB", score: -3 }, { text: "PT", score: -2 }, { text: "PSDB", score: 1 }, { text: "União Brasil", score: 1 }, { text: "Missão/MBL", score: 2 }, { text: "Novo", score: 2 }, { text: "Nenhum", score: 0 } ] },
    { id: 28, block: "Autores e Partidos", question: "No exterior, qual partido?", answers: [ { text: "Conservative Party (UK)", score: 2 }, { text: "CDU (Alemanha)", score: 1 }, { text: "Democratas (EUA)", score: -2 }, { text: "Republicanos (EUA)", score: 2 }, { text: "Comunista de Cuba", score: -3 }, { text: "Social Democrata (Suécia)", score: -1 }, { text: "Nenhum", score: 0 } ] },
    { id: 29, block: "Autores e Partidos", question: "O Estado é um mal a ser extirpado?", answers: [ { text: "Sim", score: 3 }, { text: "Não", score: 0 } ] },
    { id: 30, block: "Autores e Partidos", question: "Como entende: \"Não tenho problema com homossexuais, mas não é conduta correta...\"?", answers: [ { text: "Preconceituosa, proibir por lei", score: -3 }, { text: "Liberdade de opinião", score: 2 }, { text: "Irrelevante", score: 0 } ] },

    // Bloco 7: Leis e Candidatos
    { id: 31, block: "Leis e Candidatos", question: "Leis trabalhistas:", answers: [ { text: "Não, acordo livre", score: 2 }, { text: "Sim, flexíveis", score: 0 }, { text: "Sim, fortes contra exploração", score: -2 } ] },
    { id: 32, block: "Leis e Candidatos", question: "Sobre o julgamento de Bolsonaro em 2025:", answers: [ { text: "Justo; defendeu democracia", score: -3 }, { text: "Injusto; perseguição política", score: 2 }, { text: "Neutro; Judiciário errou", score: 0 } ] },
    { id: 33, block: "Leis e Candidatos", question: "Políticas econômicas de Lula III em 2025:", answers: [ { text: "Apoio; colheita de investimentos sociais", score: -2 }, { text: "Crítica; arcabouço fiscal trava crescimento", score: 2 }, { text: "Neutro; equilíbrio", score: 0 } ] },
    { id: 34, block: "Leis e Candidatos", question: "Assassinato de Charlie Kirk em 2025:", answers: [ { text: "Tragédia da polarização; culpa esquerda radical", score: 2 }, { text: "Isolado; foco em controle de armas", score: -2 }, { text: "Neutro; violência política crescente", score: 0 } ] },
    { id: 35, block: "Leis e Candidatos", question: "Bancos centrais?", answers: [ { text: "Sim", score: 0 }, { text: "Não", score: 2 } ] },
    { id: 36, block: "Leis e Candidatos", question: "Privatizações?", answers: [ { text: "Tudo", score: 2 }, { text: "Nada", score: -3 }, { text: "Algumas áreas", score: 0 }, { text: "Só para nacionais", score: 1 } ] },
    { id: 37, block: "Leis e Candidatos", question: "Raça superior? Frase racista deve ser:", answers: [ { text: "Criminalizada", score: -2 }, { text: "Censurada moralmente", score: 0 }, { text: "Correta", score: 3 }, { text: "Livre, se não viola não-agressão", score: 2 } ] },
    { id: 38, block: "Leis e Candidatos", question: "Saúde e educação estatais?", answers: [ { text: "Totalmente estatal", score: -2 }, { text: "Coexistir com privadas", score: 0 }, { text: "Totalmente privadas", score: 2 } ] },
    { id: 39, block: "Leis e Candidatos", question: "Capitalismo explorador? Substituir por socialismo?", answers: [ { text: "Sim", score: -3 }, { text: "Não", score: 2 } ] },
    { id: 40, block: "Leis e Candidatos", question: "Dos pré-candidatos a 2026, em quem votaria?", answers: [ { text: "Lula (PT)", score: -2 }, { text: "Jair Bolsonaro (PL)", score: 2 }, { text: "Eduardo Bolsonaro (PL)", score: 3 }, { text: "Tarcísio de Freitas (Republicanos)", score: 1 }, { text: "Ronaldo Caiado (União Brasil)", score: 1 }, { text: "Romeu Zema (Novo)", score: 2 }, { text: "Ratinho Júnior (PSD)", score: 0 }, { text: "Flávio/Michelle Bolsonaro (PL)", score: 2 }, { text: "MBL/Missão", score: 2 }, { text: "PCB/PCdoB/UP", score: -3 }, { text: "PCO/PSTU", score: -3 } ] },
];

const scorableQuestions = quizQuestions.filter(q => !q.isDemographic);

const getMaxScore = () => {
    return scorableQuestions.reduce((total, q) => {
        const max = Math.max(...q.answers.map(a => a.score));
        return total + (max > 0 ? max : 0);
    }, 0);
};

const getMinScore = () => {
    return scorableQuestions.reduce((total, q) => {
        const min = Math.min(...q.answers.map(a => a.score));
        return total + (min < 0 ? min : 0);
    }, 0);
};

export const MAX_SCORE = getMaxScore(); // Approx 79
export const MIN_SCORE = getMinScore(); // Approx -77
