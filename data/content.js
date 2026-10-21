/* Conteúdo pedagógico das atividades. Textos adaptados para crianças do 3º ano. */
window.MISSAO_SOLO = {
  soils: [
    {
      id: "arenoso", name: "Arenoso", short: "Grãos maiores e soltinhos.", color: "#e7ab4c", light: "#fff0c8",
      facts: ["É formado principalmente por grãos de areia.", "A água passa rapidamente entre os grãos.", "Costuma reter pouca água e poucos nutrientes.", "É comum em praias e desertos."],
      detail: "Imagine muitos grãozinhos de areia juntos! Como há espaços entre eles, a água consegue passar com facilidade."
    },
    {
      id: "argiloso", name: "Argiloso", short: "Partículas pequenas e juntinhas.", color: "#bd5937", light: "#ffe1d6",
      facts: ["Possui partículas muito pequenas.", "Retém água por mais tempo.", "Pode ficar compacto e pegajoso quando molhado.", "A argila pode ser usada para fazer vasos e objetos de barro."],
      detail: "Os pedacinhos de argila são bem pequenos e ficam juntinhos. Por isso, a água costuma se infiltrar mais devagar."
    },
    {
      id: "humoso", name: "Humoso", short: "Escuro e rico em matéria orgânica.", color: "#64462f", light: "#eee2d2",
      facts: ["Tem coloração escura.", "É rico em matéria orgânica e nutrientes.", "Pode reter bem a água.", "Ajuda muitas plantas a crescer."],
      detail: "Folhas e outros restos de seres vivos se transformam em matéria orgânica. Ela ajuda a deixar este solo rico em nutrientes."
    },
    {
      id: "calcario", name: "Calcário", short: "Pode ter muitas pedras.", color: "#b6a98c", light: "#f1eee6",
      facts: ["Na nossa aula, vamos observá-lo como um solo com muitas pedras.", "As pedras podem dificultar o crescimento das raízes.", "Materiais calcários podem ajudar a corrigir a acidez do solo."],
      detail: "Pedras grandes podem deixar menos espaço para as raízes. O solo calcário não tem uma velocidade de infiltração fixa: ela depende de suas características."
    }
  ],
  quiz: [
    { type: "choice", illustration: "🏖️", question: "Qual solo é formado principalmente por grãos de areia?", choices: ["Humoso", "Arenoso", "Argiloso"], answer: 1, explanation: "Isso mesmo! O solo arenoso é formado principalmente por grãos de areia." },
    { type: "truefalse", illustration: "💧", question: "A água costuma passar rapidamente pelo solo arenoso.", choices: ["Verdadeiro", "Falso"], answer: 0, explanation: "Os espaços entre os grãos de areia ajudam a água a passar rapidamente." },
    { type: "choice", illustration: "🏺", question: "Qual solo pode ficar pegajoso quando está molhado?", choices: ["Argiloso", "Arenoso", "Calcário"], answer: 0, explanation: "As partículas muito pequenas da argila ficam juntinhas e podem deixar o solo pegajoso." },
    { type: "truefalse", illustration: "🍂", question: "O solo humoso é escuro e rico em matéria orgânica.", choices: ["Verdadeiro", "Falso"], answer: 0, explanation: "Muito bem! A matéria orgânica ajuda a deixar o solo humoso rico em nutrientes." },
    { type: "choice", illustration: "🪨", question: "Na nossa aula, qual solo é apresentado com muitas pedras?", choices: ["Humoso", "Calcário", "Arenoso"], answer: 1, explanation: "O solo calcário é apresentado com muitas pedras nesta aula." },
    { type: "truefalse", illustration: "🌱", question: "As pedras podem dificultar o desenvolvimento das raízes.", choices: ["Verdadeiro", "Falso"], answer: 0, explanation: "Isso mesmo. As pedras podem atrapalhar o caminho e o espaço para as raízes." },
    { type: "choice", illustration: "🔬", question: "Na experiência, qual solo permite que a água passe mais depressa?", choices: ["Argiloso", "Arenoso", "Todos sempre igual"], answer: 1, explanation: "O arenoso deixa a água passar depressa. Cada solo tem características diferentes." },
    { type: "truefalse", illustration: "🌼", question: "Todas as plantas precisam exatamente dos mesmos cuidados.", choices: ["Verdadeiro", "Falso"], answer: 1, explanation: "Cada tipo de planta pode ter necessidades diferentes de água, luz e solo." }
  ]
};
