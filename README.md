# Missão Solo 🌱

Site educativo interativo de Ciências para crianças do 3º ano do Ensino Fundamental. O projeto usa HTML, CSS, JavaScript e ilustrações SVG próprias, sem framework ou back-end.

## Como executar

1. Abra a pasta `missao-solo` no Visual Studio Code.
2. Instale a extensão **Live Server**, caso ainda não a tenha.
3. Clique com o botão direito em `index.html` e selecione **Open with Live Server**.

Também é possível abrir `index.html` diretamente no navegador. O projeto não exige instalação de dependências. A fonte decorativa pode carregar do Google Fonts quando houver conexão; fontes locais alternativas já estão configuradas.

## O que está incluído

- Exploração interativa dos solos arenoso, argiloso, humoso e calcário, com lupa.
- Laboratório virtual para comparar a passagem da água em cada amostra.
- A missão “O Mundo Debaixo da Terra”, com a Lola, cenário animado, cinco descobertas clicáveis, contador e reinício.
- Narração opcional da Lola com MP3s locais, controles para ativar/desativar, repetir e interromper; a preferência fica salva no navegador.
- Hortinha com escolha de solo, plantio, rega e etapas de crescimento.
- Quiz com oito questões, feedback, estrelas e medalha de Explorador da Natureza.
- Certificado de Pequeno Cientista, desbloqueado ao concluir as cinco atividades principais, personalizável e pronto para imprimir em A4 horizontal ou salvar como PDF.
- Modo professora, exibição de respostas, tela cheia e reinício das atividades.
- Navegação por teclado, layout responsivo e suporte a movimento reduzido.

## Organização

- `index.html`: estrutura semântica e seções da experiência.
- `css/style.css`: identidade visual, ilustrações em CSS, animações e responsividade.
- `js/script.js`: interações, atividades e estado do jogo.
- `data/content.js`: conteúdo educativo e banco de perguntas.
- `assets/images/`: ilustrações SVG originais.
- `assets/icons/`: ícones SVG.
- `assets/audio/{inicio,solos,laboratorio,subterraneo,hortinha,quiz,certificado}/`: falas MP3 locais da Lola.

Os áudios são reproduzidos por um único elemento de áudio e só começam após uma interação. O quiz usa gravações específicas nas oito perguntas. Não há um MP3 de introdução do quiz, e nenhuma voz sintética é usada como substituta.
Os áudios de resultado do laboratório são reproduzidos após a animação de cada experimento, e a conclusão só é reproduzida depois que os quatro solos forem testados.
A hortinha usa falas distintas para escolher, plantar, regar, germinar, desenvolver folhas e apresentar o resultado determinístico da combinação entre espécie e solo. A gravação `pouca-energia.mp3` é usada quando a combinação é boa, mas não ideal. Os textos do balão são mantidos junto ao mapeamento dos eventos em `js/script.js`.
O certificado acompanha no navegador as descobertas dos quatro solos, os quatro experimentos, os cinco segredos subterrâneos, um cultivo concluído e o resultado do quiz (sem exigir nota mínima). O Modo professora permite emitir certificados sem concluir essas atividades. Os quatro áudios do certificado são locais; o nome não é enviado a nenhum servidor.

O conteúdo foi preparado a partir das características pedagógicas especificadas no pedido. Nenhum PDF didático estava disponível entre os arquivos recebidos.
