(() => {
  "use strict";

  const { soils, quiz } = window.MISSAO_SOLO;
  const soilMap = Object.fromEntries(soils.map((soil) => [soil.id, soil]));
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const toast = $("#toast");

  // Opções de plantas e falas gravadas da Lola.
  const plantProfiles = {
    girassol: { label: "Girassol", article: "o", emoji: "🌻", ideal: "humoso", good: ["argiloso"], okay: ["arenoso"], poor: ["calcario"] },
    feijao: { label: "Feijão", article: "o", emoji: "🌱", ideal: "humoso", good: ["argiloso"], okay: ["arenoso"], poor: ["calcario"] },
    cacto: { label: "Cacto", article: "o", emoji: "🌵", ideal: "arenoso", good: ["calcario"], okay: ["argiloso"], poor: ["humoso"] },
    florzinha: { label: "Florzinha", article: "a", emoji: "🌸", ideal: "humoso", good: ["argiloso"], okay: ["arenoso"], poor: ["calcario"] }
  };
  const lolaAudio = {
    welcome: "assets/audio/inicio/boas-vindas.mp3",
    start: "assets/audio/inicio/comecar-aventura.mp3",
    soils: {
      arenoso: "assets/audio/solos/arenoso.mp3",
      argiloso: "assets/audio/solos/argiloso.mp3",
      humoso: "assets/audio/solos/humoso.mp3",
      calcario: "assets/audio/solos/calcario.mp3"
    },
    lab: {
      intro: "assets/audio/laboratorio/introducao.mp3",
      arenoso: "assets/audio/laboratorio/agua-arenoso.mp3",
      argiloso: "assets/audio/laboratorio/agua-argilosa.mp3",
      humoso: "assets/audio/laboratorio/agua-humoso.mp3",
      calcario: "assets/audio/laboratorio/agua-calcario.mp3",
      conclusion: "assets/audio/laboratorio/conclusao.mp3"
    },
    underworld: {
      intro: "assets/audio/subterraneo/introducao-subterraneo.mp3",
      worm: "assets/audio/subterraneo/minhoca.mp3",
      roots: "assets/audio/subterraneo/raizes.mp3",
      ants: "assets/audio/subterraneo/formigas.mp3",
      stones: "assets/audio/subterraneo/pedrinhas.mp3",
      water: "assets/audio/subterraneo/agua.mp3",
      conclusion: "assets/audio/subterraneo/segredos.mp3"
    },
    garden: {
      choice: {
        path: "assets/audio/hortinha/escolha.mp3",
        transcript: "Que escolha legal! Agora vamos encontrar um solo para ela!",
        mood: "happy",
        moment: "Quando uma nova planta é escolhida."
      },
      plant: {
        path: "assets/audio/hortinha/plantar.mp3",
        transcript: "Prontinho! Nossa sementinha está plantada! Vamos cuidar dela?",
        mood: "happy",
        moment: "Quando a semente é plantada."
      },
      water: {
        path: "assets/audio/hortinha/regar.mp3",
        transcript: "Água chegando! Agora vamos observar como nossa planta reage!",
        mood: "curious",
        moment: "Na primeira rega da tentativa."
      },
      growth: {
        path: "assets/audio/hortinha/crescimento.mp3",
        transcript: "A nossa plantinha está começando a crescer! Olha só que bonitinha!",
        mood: "surprised",
        moment: "Quando surge o primeiro brotinho."
      },
      leaves: {
        path: "assets/audio/hortinha/folhas.mp3",
        transcript: "As folhinhas já surgiram? Nossa plantinha está recebendo energia e força.",
        mood: "happy",
        moment: "Quando aparecem as primeiras folhas."
      },
      healthy: {
        path: "assets/audio/hortinha/planta-saudavel.mp3",
        transcript: "Obaaa! Sua plantinha cresceu linda e saudável! Você cuidou muito bem dela!",
        mood: "celebrating",
        moment: "Ao concluir uma combinação saudável."
      },
      lowEnergy: {
        path: "assets/audio/hortinha/pouca-energia.mp3",
        transcript: "Ela cresceu, mas com um pouco menos de energia. O solo foi bom, mas não foi o ideal.",
        mood: "thinking",
        moment: "Ao concluir uma combinação boa, mas não ideal."
      },
      difficulty: {
        path: "assets/audio/hortinha/planta-dificuldade.mp3",
        transcript: "Humm, nossa plantinha encontrou algumas dificuldades! Que tal experimentar outro solo?",
        mood: "thinking",
        moment: "Ao concluir uma combinação com dificuldades."
      },
      poor: {
        path: "assets/audio/hortinha/planta-ruim.mp3",
        transcript: "Dessa vez não deu muito certo, mas faz parte de ser cientista! Vamos tentar uma combinação diferente?",
        mood: "thinking",
        moment: "Ao concluir uma combinação desfavorável."
      }
    },
    quiz: {
      correct: [
        "assets/audio/quiz/acerto-muito-bem.mp3",
        "assets/audio/quiz/acerto-resposta-certa.mp3",
        "assets/audio/quiz/acerto-uau-explorador.mp3",
        "assets/audio/quiz/acerto-isso-mesmo.mp3"
      ],
      incorrect: [
        "assets/audio/quiz/erro-quase.mp3",
        "assets/audio/quiz/erro-boa-tentativa.mp3",
        "assets/audio/quiz/erro-continue.mp3"
      ],
      conclusion: "assets/audio/quiz/conclusao.mp3",
      questions: [
        "assets/audio/quiz/solo-areia.mp3",
        "assets/audio/quiz/agua-verdadeiro.mp3",
        "assets/audio/quiz/solo-argiloso.mp3",
        "assets/audio/quiz/humoso-verdadeiro.mp3",
        "assets/audio/quiz/solo-calcario.mp3",
        "assets/audio/quiz/pedras-verdadeiro.mp3",
        "assets/audio/quiz/experiencia-arenoso.mp3",
        "assets/audio/quiz/plantas-falso.mp3"
      ]
    },
    certificate: {
      conclusion: {
        id: "certificate.conclusion",
        path: "assets/audio/certificado/certificado-conclusao.mp3",
        transcript: "Uhuuul! Parabéns, pequeno cientista! Você completou todas as aventuras do Missão Solo! Estou tão orgulhosa de você! Agora chegou a hora de receber seu certificado!",
        mood: "celebrating"
      },
      name: {
        id: "certificate.name",
        path: "assets/audio/certificado/certificado-nome.mp3",
        transcript: "Obaaa! Vamos preparar seu certificado! Primeiro, escreva seu nome bem bonitinho aqui, para todo mundo saber quem é o nosso grande explorador da natureza!",
        mood: "happy"
      },
      ready: {
        id: "certificate.ready",
        path: "assets/audio/certificado/certificado-pronto.mp3",
        transcript: "Tcharam! Olha só que lindo ficou seu certificado! Agora você é oficialmente um Guardião da Natureza! Você aprendeu tanta coisa sobre o solo! Meus parabéns!",
        mood: "celebrating"
      },
      print: {
        id: "certificate.print",
        path: "assets/audio/certificado/certificado-imprimir.mp3",
        transcript: "Que alegria! Agora você pode guardar seu certificado como lembrança dessa aventura incrível! Continue sempre curioso e cuidando da natureza! Até a próxima, pequeno explorador!",
        mood: "happy"
      }
    }
  };

  // Estado compartilhado pelas atividades.
  const certificateProgressKey = "missao-solo-certificate-progress";
  let toastTimer;
  const certificateProgress = readCertificateProgress();
  let labTimer;
  let gardenStage = "ready";
  let selectedPlant = "";
  let gardenTransitionTimer;
  let gardenTransitionLocked = false;
  let voiceEnabled = readVoicePreference();
  const lolaPlayer = new Audio();
  lolaPlayer.preload = "none";
  let lastSpoken = null;
  let speechActive = false;
  let pendingLolaSpeeches = [];
  let lolaPlaybackToken = 0;
  let activeSectionId = "inicio";
  let speechSectionId = "inicio";
  let unavailableAudio = "";
  let audioErrorNotified = false;
  let certificateStorageWarningShown = false;

  // Mostra avisos rápidos para a criança.
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  // Lê, atualiza e salva o progresso do certificado.
  function emptyCertificateProgress() {
    return { soils: [], lab: [], underworld: [], garden: false, quiz: false, unlocked: false, completedAt: "" };
  }

  function readCertificateProgress() {
    try {
      const saved = window.localStorage.getItem(certificateProgressKey);
      if (!saved) return emptyCertificateProgress();
      const parsed = JSON.parse(saved);
      const knownSoils = soils.map((soil) => soil.id);
      return {
        soils: Array.isArray(parsed.soils) ? [...new Set(parsed.soils.filter((id) => knownSoils.includes(id)))] : [],
        lab: Array.isArray(parsed.lab) ? [...new Set(parsed.lab.filter((id) => knownSoils.includes(id)))] : [],
        underworld: Array.isArray(parsed.underworld) ? [...new Set(parsed.underworld.filter((id) => ["worm", "roots", "ants", "stones", "water"].includes(id)))] : [],
        garden: parsed.garden === true,
        quiz: parsed.quiz === true,
        unlocked: parsed.unlocked === true,
        completedAt: typeof parsed.completedAt === "string" ? parsed.completedAt : ""
      };
    } catch (error) {
      showToast("Não foi possível ler o progresso do certificado salvo neste navegador.");
      return emptyCertificateProgress();
    }
  }

  function saveCertificateProgress() {
    try {
      window.localStorage.setItem(certificateProgressKey, JSON.stringify(certificateProgress));
    } catch (error) {
      if (!certificateStorageWarningShown) {
        certificateStorageWarningShown = true;
        showToast("O progresso do certificado não pôde ser salvo neste navegador.");
      }
    }
  }

  function isCertificateUnlocked() {
    return certificateProgress.soils.length === soils.length
      && certificateProgress.lab.length === soils.length
      && certificateProgress.underworld.length === 5
      && certificateProgress.garden
      && certificateProgress.quiz;
  }

  function renderCertificateProgress() {
    const count = Number(certificateProgress.soils.length === soils.length)
      + Number(certificateProgress.lab.length === soils.length)
      + Number(certificateProgress.underworld.length === 5)
      + Number(certificateProgress.garden)
      + Number(certificateProgress.quiz);
    const countLabel = $("#certificate-progress-count");
    if (!countLabel) return;

    countLabel.textContent = `${count} de 5 atividades concluídas`;
    const progressbar = $(".certificate-progress-track");
    progressbar.setAttribute("aria-valuenow", String(count));
    $("#certificate-progress-bar").style.width = `${count * 20}%`;
    const completed = {
      soils: certificateProgress.soils.length === soils.length,
      lab: certificateProgress.lab.length === soils.length,
      underworld: certificateProgress.underworld.length === 5,
      garden: certificateProgress.garden,
      quiz: certificateProgress.quiz
    };
    $$("[data-certificate-activity]").forEach((item) => {
      const done = completed[item.dataset.certificateActivity];
      item.classList.toggle("is-complete", done);
      item.setAttribute("aria-label", `${item.textContent.trim()}${done ? ", concluída" : ", pendente"}`);
    });
    const unlocked = isCertificateUnlocked();
    $("#certificate-status").textContent = unlocked
      ? "Todas as aventuras foram concluídas. Seu certificado está desbloqueado!"
      : "Conclua as atividades principais para desbloquear seu certificado.";
    $("#certificate-celebration").hidden = !unlocked;
    $("#certificate-receive").disabled = !unlocked;
  }

  function speakCertificateLine(eventId, onEnd = null) {
    const line = lolaAudio.certificate[eventId];
    if (!line) {
      console.error(`Evento de áudio do certificado não encontrado: ${eventId}`);
      return false;
    }
    stopLolaSpeech();
    const started = lolaSpeak(line.transcript, line.mood, onEnd, line.path);
    $("#lola-voice-status").textContent = voiceEnabled ? (speechActive ? "Lola está falando" : "Fala da Lola") : "Fala da Lola";
    $("#lola-voice-text").textContent = line.transcript;
    $("#lola-voice-dialog").hidden = false;
    $("#lola-repeat").disabled = !voiceEnabled;
    $("#lola-stop").disabled = !speechActive;
    return started;
  }

  function markCertificateProgress(activity, subject = "") {
    let changed = false;
    if (activity === "soils" || activity === "lab" || activity === "underworld") {
      const collection = certificateProgress[activity];
      if (subject && !collection.includes(subject)) {
        collection.push(subject);
        changed = true;
      }
    } else if ((activity === "garden" || activity === "quiz") && !certificateProgress[activity]) {
      certificateProgress[activity] = true;
      changed = true;
    }
    if (!changed) return;
    renderCertificateProgress();
    if (isCertificateUnlocked() && !certificateProgress.unlocked) {
      certificateProgress.unlocked = true;
      certificateProgress.completedAt = new Date().toISOString();
      saveCertificateProgress();
      renderCertificateProgress();
      $("#certificate-celebration").scrollIntoView({ behavior: "smooth", block: "center" });
      speakCertificateLine("conclusion");
    } else {
      saveCertificateProgress();
    }
  }

  function resetCertificateProgress() {
    Object.assign(certificateProgress, emptyCertificateProgress());
    saveCertificateProgress();
    renderCertificateProgress();
    $("#certificate-name-panel").hidden = true;
    $("#certificate-output").hidden = true;
    $("#certificate-print-confirmation").hidden = true;
    $("#certificate-continue-print").hidden = true;
    $("#certificate-name").value = "";
    $("#lola-voice-dialog").hidden = true;
    lastSpoken = null;
    $("#lola-repeat").disabled = true;
    setLolaMood("normal");
  }

  // Controla os áudios da Lola e as falas exibidas nos balões.
  function readVoicePreference() {
    try {
      return window.localStorage.getItem("missao-solo-lola-voice") === "true";
    } catch (error) {
      return false;
    }
  }

  function storeVoicePreference(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      showToast("Não foi possível salvar essa preferência neste navegador.");
    }
  }

  function setLolaMood(mood) {
    document.body.dataset.lolaMood = mood;
  }

  function setSpeechUi(isSpeaking) {
    document.body.classList.toggle("lola-speaking", isSpeaking);
    $("#lola-voice-status").textContent = isSpeaking ? "Lola está falando" : "Fala da Lola";
    $("#lola-stop").disabled = !isSpeaking;
    $("#lola-repeat").disabled = !lastSpoken || !voiceEnabled;
  }

  function stopLolaSpeech() {
    pendingLolaSpeeches = [];
    lolaPlaybackToken += 1;
    lolaPlayer.onended = null;
    lolaPlayer.onerror = null;
    lolaPlayer.pause();
    lolaPlayer.currentTime = 0;
    speechActive = false;
    setSpeechUi(false);
    const printButton = $("#certificate-continue-print");
    if (printButton && !printButton.hidden) printButton.disabled = false;
  }

  function finishLolaAudio() {
    speechActive = false;
    setSpeechUi(false);
    let next = pendingLolaSpeeches.shift();
    while (next && next.sectionId !== activeSectionId) next = pendingLolaSpeeches.shift();
    if (next && voiceEnabled) {
      const remaining = pendingLolaSpeeches;
      pendingLolaSpeeches = [];
      lolaSpeak(next.text, next.mood, next.onEnd, next.audioPath);
      pendingLolaSpeeches = remaining;
    }
  }

  function lolaSpeak(text, mood = "happy", onEnd = null, audioPath = "") {
    const cleanText = String(text || "").trim();
    if (!cleanText) return false;
    lastSpoken = { text: cleanText, mood, audioPath, onEnd };
    speechSectionId = activeSectionId;
    setLolaMood(mood);
    if (!voiceEnabled) return false;
    $("#lola-voice-text").textContent = cleanText;
    $("#lola-voice-dialog").hidden = false;
    $("#lola-repeat").disabled = !voiceEnabled;
    if (!audioPath) {
      if (!audioErrorNotified) {
        audioErrorNotified = true;
        showToast("Esta fala ainda não tem áudio gravado. As instruções continuam disponíveis por escrito.");
      }
      if (typeof onEnd === "function") onEnd();
      return false;
    }

    pendingLolaSpeeches = [];
    const token = ++lolaPlaybackToken;
    lolaPlayer.onended = null;
    lolaPlayer.onerror = null;
    lolaPlayer.pause();
    lolaPlayer.currentTime = 0;
    lolaPlayer.src = audioPath;
    speechActive = true;
    setSpeechUi(true);
    lolaPlayer.onended = () => {
      if (token !== lolaPlaybackToken) return;
      if (typeof onEnd === "function") onEnd();
      finishLolaAudio();
    };
    lolaPlayer.onerror = () => {
      if (token !== lolaPlaybackToken) return;
      speechActive = false;
      setSpeechUi(false);
      if (unavailableAudio !== audioPath) {
        unavailableAudio = audioPath;
        showToast("Não foi possível reproduzir um áudio da Lola. Confira se o arquivo existe e tente novamente.");
      }
      if (typeof onEnd === "function") onEnd();
      finishLolaAudio();
    };
    const playback = lolaPlayer.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {
        if (token !== lolaPlaybackToken || !speechActive) return;
        speechActive = false;
        setSpeechUi(false);
        if (unavailableAudio !== audioPath) {
          unavailableAudio = audioPath;
          showToast("O navegador não conseguiu iniciar este áudio. Tente novamente.");
        }
        if (typeof onEnd === "function") onEnd();
        finishLolaAudio();
      });
    }
    return true;
  }

  function queueLolaSpeech(text, mood = "happy", audioPath = "") {
    if (!voiceEnabled || !audioPath) return false;
    if (!speechActive) return lolaSpeak(text, mood, null, audioPath);
    pendingLolaSpeeches.push({ text, mood, audioPath, sectionId: activeSectionId });
    return true;
  }

  function repeatLolaSpeech() {
    if (!lastSpoken) return;
    if (!voiceEnabled) {
      showToast("Ative a voz da Lola para ouvir esta fala.");
      return;
    }
    const continuePrint = $("#certificate-continue-print");
    const printPromptVisible = !continuePrint.hidden;
    if (printPromptVisible) continuePrint.disabled = true;
    const started = lolaSpeak(lastSpoken.text, lastSpoken.mood, printPromptVisible ? () => {
      continuePrint.disabled = false;
    } : null, lastSpoken.audioPath);
    if (printPromptVisible && !started) continuePrint.disabled = false;
  }

  function detectActiveSection() {
    if (window.scrollY < 100) return "inicio";
    const marker = window.innerHeight * 0.32;
    const section = $$("main > section").find((item) => {
      const bounds = item.getBoundingClientRect();
      return bounds.top <= marker && bounds.bottom > marker;
    });
    return section?.id || activeSectionId;
  }

  function setupLolaVoice() {
    const button = $("#lola-voice-toggle");
    function updateVoiceToggle() {
      button.setAttribute("aria-pressed", String(voiceEnabled));
      button.setAttribute("aria-label", voiceEnabled ? "Desativar a voz da Lola" : "Ativar a voz da Lola");
      button.title = voiceEnabled ? "Voz da Lola ativada" : "Voz da Lola desativada";
      button.textContent = voiceEnabled ? "🔊" : "🔇";
      $("#lola-repeat").disabled = !lastSpoken || !voiceEnabled;
    }

    button.addEventListener("click", () => {
      voiceEnabled = !voiceEnabled;
      storeVoicePreference("missao-solo-lola-voice", String(voiceEnabled));
      updateVoiceToggle();
      if (!voiceEnabled) {
        stopLolaSpeech();
        setLolaMood("normal");
        showToast("Voz da Lola desativada. As explicações continuam disponíveis por escrito.");
        return;
      }
      activeSectionId = detectActiveSection();
      if (activeSectionId === "inicio") {
        const greeting = "Olá, pequeno explorador! Eu sou a Lola! Que tal descobrirmos juntos os segredos que estão debaixo dos nossos pés?";
        $("#hero-speech-text").textContent = greeting;
        lolaSpeak(greeting, "happy", null, lolaAudio.welcome);
      } else {
        showToast("Voz ativada! A Lola falará quando você explorar as atividades.");
      }
    });
    $("#lola-repeat").addEventListener("click", repeatLolaSpeech);
    $("#lola-stop").addEventListener("click", () => {
      stopLolaSpeech();
      setLolaMood("normal");
    });
    $("#lola-close").addEventListener("click", () => {
      $("#lola-voice-dialog").hidden = true;
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && speechActive) {
        stopLolaSpeech();
        setLolaMood("normal");
      }
    });
    updateVoiceToggle();
  }

  // Cria os desenhos dos solos e controla sua exploração.
  function soilIllustration(soil, large = false) {
    const stone = soil.id === "calcario";
    const colors = {
      arenoso: ["#f2c66e", "#ce8d39"],
      argiloso: ["#c95836", "#873821"],
      humoso: ["#5d3e2c", "#33251e"],
      calcario: ["#d9d1bf", "#9a8d78"]
    }[soil.id];
    const particles = Array.from({ length: stone ? 11 : 25 }, (_, i) => {
      const x = 18 + ((i * 37) % 264);
      const y = 115 + ((i * 29) % 92);
      const radius = stone ? 8 + (i % 4) * 2 : 2 + (i % 3);
      const fill = stone ? (i % 2 ? "#f8f5eb" : "#b0a48e") : colors[i % 2];
      return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="${stone ? "#8b806d" : "none"}" stroke-width="2"/>`;
    }).join("");
    const roots = soil.id === "humoso"
      ? '<path d="M150 54v54m0-26-22 20m22-10 22 17" fill="none" stroke="#5d943c" stroke-width="7" stroke-linecap="round"/><path d="M150 108v45m0-29-15 15m15-4 15 13" fill="none" stroke="#f4d5a0" stroke-width="4"/>'
      : "";
    return `<svg viewBox="0 0 300 220" role="img" aria-label="Ilustração do solo ${soil.name.toLowerCase()}">
      <path d="M20 120 Q65 104 105 117 T190 114 T280 119 V205 H20Z" fill="${colors[0]}"/>
      <path d="M20 150 Q75 136 125 153 T220 146 T280 151 V205 H20Z" fill="${colors[1]}" opacity=".7"/>
      ${particles}${roots}
      <path d="M31 118 Q72 101 104 116 T177 112 T268 117" fill="none" stroke="#755033" stroke-width="5" stroke-linecap="round"/>
      ${large ? '<circle cx="239" cy="53" r="24" fill="#fff2bb" stroke="#e2aa38" stroke-width="4"/><path d="m253 69 21 21" stroke="#8a5b24" stroke-width="8" stroke-linecap="round"/>' : ""}
    </svg>`;
  }

  function renderSoilCards() {
    $("#soil-cards").innerHTML = soils.map((soil) => `
      <button class="soil-card" type="button" data-soil="${soil.id}" aria-expanded="false"
        style="background:${soil.light};--soil-color:${soil.color}" aria-controls="soil-detail">
        <h3>Solo ${soil.name.toLowerCase()}</h3><p>${soil.short}</p>
        <span class="soil-art" aria-hidden="true">${soilIllustration(soil)}</span>
        <span class="discover" aria-hidden="true">➜</span>
      </button>`).join("");
    $("#soil-cards").addEventListener("click", (event) => {
      const card = event.target.closest(".soil-card");
      if (card) openSoilDetail(card.dataset.soil);
    });
  }

  function openSoilDetail(id) {
    const soil = soilMap[id];
    const spokenDetails = {
      arenoso: "Esse é o solo arenoso! Ele tem muitos grãozinhos de areia, e a água passa rapidinho entre eles!",
      argiloso: "Esse é o solo argiloso! Suas partículas são bem pequenas, por isso a água costuma passar mais devagar!",
      humoso: "Olha só esse solo escurinho! Ele é rico em matéria orgânica e nutrientes, ajudando muitas plantas a crescer!",
      calcario: "Neste exemplo, podemos ver várias pedras! Elas podem dificultar o crescimento das raízes. Materiais calcários também podem ajudar a diminuir a acidez do solo!"
    };
    const detail = $("#soil-detail");
    const alreadyOpen = !detail.hidden && detail.dataset.soil === id;
    $$(".soil-card").forEach((card) => card.setAttribute("aria-expanded", String(card.dataset.soil === id && !alreadyOpen)));
    if (alreadyOpen) {
      detail.hidden = true;
      return;
    }
    detail.dataset.soil = id;
    detail.innerHTML = `<div class="soil-detail-visual">${soilIllustration(soil, true)}</div>
      <div class="soil-detail-copy"><p class="eyebrow">Pista encontrada!</p><h3>Solo ${soil.name.toLowerCase()}</h3>
      <p>${soil.detail}</p><ul>${soil.facts.map((fact) => `<li>${fact}</li>`).join("")}</ul>
      <div class="soil-detail-actions">
        <button class="magnify-button" type="button" aria-pressed="false">🔍 Usar lupa</button>
        <button class="lola-replay-button" type="button">🔊 Ouvir novamente</button>
      </div></div>`;
    detail.hidden = false;
    lolaSpeak(spokenDetails[id], "surprised", null, lolaAudio.soils[id]);
    markCertificateProgress("soils", id);
    $(".lola-replay-button", detail).addEventListener("click", () => {
      if (voiceEnabled) lolaSpeak(spokenDetails[id], "surprised", null, lolaAudio.soils[id]);
      else showToast("Ative a voz da Lola para ouvir esta explicação.");
    });
    $(".magnify-button", detail).addEventListener("click", (event) => {
      const button = event.currentTarget;
      const zoomed = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(zoomed));
      $(".soil-detail-visual", detail).classList.toggle("is-zoomed", zoomed);
      button.textContent = zoomed ? "🔎 Diminuir lupa" : "🔍 Usar lupa";
    });
  }

  // Controla os experimentos de passagem da água.
  function setupLab() {
    const selected = new Set();
    const tested = new Set();
    const resultsPlayed = new Set();
    let revealedThrough = -1;
    let introSpoken = false;
    let conclusionPlayed = false;
    const explanations = {
      arenoso: "A água passa depressa pelos espaços entre os grãos de areia.",
      argiloso: "As partículas bem pequenas ficam juntinhas; por isso a infiltração costuma ser mais lenta.",
      humoso: "A matéria orgânica ajuda este solo a reter parte da água.",
      calcario: "A passagem pode variar. Ter pedras não significa que este solo sempre bloqueia a água."
    };
    const observations = {
      arenoso: "Nesta simulação, mais água chegou rapidamente ao fundo.",
      argiloso: "No mesmo intervalo, menos água chegou ao fundo.",
      humoso: "O resultado foi intermediário: parte da água ficou retida.",
      calcario: "Nesta simulação, uma quantidade moderada chegou ao fundo."
    };
    const spokenResults = {
      arenoso: "Uau! A água passou rapidamente pelos espaços entre os grãos de areia!",
      argiloso: "Percebeu a diferença? A água costuma atravessar esse solo mais devagar!",
      humoso: "O solo humoso reteve parte da água, com um resultado intermediário.",
      calcario: "Uma quantidade moderada de água chegou ao fundo neste exemplo de solo calcário."
    };

    $("#lab-soil-select").innerHTML = soils.map((soil) =>
      `<button class="lab-pick" type="button" data-soil="${soil.id}" aria-pressed="false">${soil.name}</button>`).join("");
    $("#lab-vessels").innerHTML = soils.map((soil) => `
      <div class="vessel" data-soil="${soil.id}" style="--sample-color:${soil.color}">
        <span class="water-drop" aria-hidden="true">💧</span>
        <div class="glass" aria-hidden="true"><div class="sample"></div><div class="water-level"></div></div>
        <h4>${soil.name}</h4>
      </div>`).join("");
    $("#lab-soil-select").addEventListener("click", (event) => {
      const button = event.target.closest(".lab-pick");
      if (!button) return;
      const { soil } = button.dataset;
      revealedThrough = Math.max(revealedThrough, soils.findIndex((item) => item.id === soil));
      if (selected.has(soil)) {
        selected.delete(soil);
      } else {
        selected.add(soil);
      }
      button.setAttribute("aria-pressed", String(selected.has(soil)));
      updateSelectedVessels(selected);
      renderLabInsights();
      $("#lab-message").textContent = selected.size ? `Ótimo! ${selected.size} ${selected.size === 1 ? "solo escolhido" : "solos escolhidos"}. Agora despeje água.` : "Escolha um ou mais solos para começar.";
    });
    $("#water-button").addEventListener("click", () => {
      if (!selected.size) {
        showToast("Escolha um recipiente primeiro!");
        $("#lab-message").textContent = "Escolha um ou mais solos antes de regar.";
        return;
      }
      selected.forEach((id) => {
        const vessel = $(`.vessel[data-soil="${id}"]`);
        vessel.classList.remove("watered");
        void vessel.offsetWidth;
        vessel.classList.add("watered");
      });
      const testedThisRound = [...selected];
      if (!introSpoken) {
        introSpoken = true;
        lolaSpeak("Agora vamos investigar como a água se comporta em diferentes tipos de solo!", "thinking", null, lolaAudio.lab.intro);
      }
      window.clearTimeout(labTimer);
      $("#lab-message").textContent = "Observe: as gotas estão atravessando cada amostra!";
      labTimer = window.setTimeout(() => {
        $("#lab-message").textContent = "Experiência pronta! Compare o que aconteceu em cada recipiente.";
        testedThisRound.forEach((id) => tested.add(id));
        renderLabInsights();
        if (activeSectionId === "experimentos") {
          soils.forEach((soil) => {
            if (testedThisRound.includes(soil.id) && !resultsPlayed.has(soil.id)) {
              resultsPlayed.add(soil.id);
              queueLolaSpeech(spokenResults[soil.id], "surprised", lolaAudio.lab[soil.id]);
            }
          });
          if (tested.size === soils.length && !conclusionPlayed) {
            conclusionPlayed = true;
            queueLolaSpeech("Parabéns, cientista! Você descobriu que a água não se comporta do mesmo jeito em todos os solos!", "celebrating", lolaAudio.lab.conclusion);
          }
        }
        testedThisRound.forEach((id) => markCertificateProgress("lab", id));
      }, 2800);
    });
    updateSelectedVessels(selected);

    function renderLabInsights() {
      const comparison = $("#lab-comparison");
      if (revealedThrough < 0) {
        comparison.innerHTML = "";
        comparison.hidden = true;
        return;
      }

      comparison.innerHTML = soils.slice(0, revealedThrough + 1).map((soil) => `
        <article class="lab-insight" data-soil="${soil.id}">
          <h4>${soil.name}</h4>
          <p>${explanations[soil.id]}</p>
          ${tested.has(soil.id) ? `<p class="lab-observation">${observations[soil.id]}</p>` : ""}
        </article>`).join("") +
        (tested.size ? '<p class="comparison-note">A água azul no fundo mostra o que atravessou a amostra. Os copos com contorno verde foram escolhidos para a experiência.</p>' : "");
      comparison.hidden = false;
    }

    return () => {
      window.clearTimeout(labTimer);
      selected.clear();
      tested.clear();
      resultsPlayed.clear();
      revealedThrough = -1;
      introSpoken = false;
      conclusionPlayed = false;
      $$(".lab-pick").forEach((button) => button.setAttribute("aria-pressed", "false"));
      $$(".vessel").forEach((vessel) => vessel.classList.remove("is-selected", "watered"));
      $("#lab-comparison").hidden = true;
      $("#lab-message").textContent = "Escolha um ou mais solos para começar.";
    };
  }

  function updateSelectedVessels(selected) {
    $$(".vessel").forEach((vessel) => vessel.classList.toggle("is-selected", selected.has(vessel.dataset.soil)));
  }

  function setupAnswerToggle(button) {
    button.addEventListener("click", () => {
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      const expanded = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(expanded));
      answer.hidden = !expanded;
      button.textContent = expanded ? "Esconder a pista" : "Mostrar uma pista";
    });
  }

  // Controla a escolha, o plantio e o crescimento das plantas.
  function setupGarden() {
    const select = $("#garden-soil");
    const plantOptions = $("#garden-plant-options");
    const plantTag = $("#plant-tag");
    const plantArt = $("#plant-art");
    const waterButton = $("#garden-water");
    const gardenMessage = $("#garden-message");
    const soilNotes = {
      arenoso: "A água passa rapidamente pelo solo arenoso, que costuma reter poucos nutrientes.",
      argiloso: "As partículas pequenas do solo argiloso retêm água e podem deixar o solo compacto.",
      humoso: "O solo humoso é rico em matéria orgânica e nutrientes e pode reter bem a água.",
      calcario: "Neste exemplo, as pedras do solo calcário podem dificultar o crescimento das raízes; a presença delas não define uma velocidade fixa para a água."
    };

    select.innerHTML += soils.map((soil) => `<option value="${soil.id}">${soil.name}</option>`).join("");
    plantOptions.innerHTML = Object.entries(plantProfiles).map(([id, profile]) => `
      <button type="button" class="plant-choice ${selectedPlant === id ? "is-selected" : ""}" data-plant="${id}" aria-pressed="${selectedPlant === id}">
        <span aria-hidden="true">${profile.emoji}</span>
        <span>${profile.label}</span>
      </button>
    `).join("");

    function updatePlantTag() {
      const profile = selectedPlant ? plantProfiles[selectedPlant] : null;
      plantTag.textContent = profile ? `${profile.emoji} ${profile.label}` : "Plantinha pronta";
      plantArt.dataset.plant = selectedPlant || "";
    }

    function playGardenEvent(eventKey, queued = false) {
      const audioEvent = lolaAudio.garden[eventKey];
      if (!audioEvent) {
        console.error(`Evento de áudio da hortinha não encontrado: ${eventKey}`);
        return false;
      }
      return queued
        ? queueLolaSpeech(audioEvent.transcript, audioEvent.mood, audioEvent.path)
        : lolaSpeak(audioEvent.transcript, audioEvent.mood, null, audioEvent.path);
    }

    function getPlantGrowthResult() {
      if (!selectedPlant || !select.value) return null;
      const profile = plantProfiles[selectedPlant];
      const soilId = select.value;
      const ideal = profile.ideal === soilId;
      const good = profile.good.includes(soilId);
      const okay = profile.okay.includes(soilId);
      const poor = profile.poor.includes(soilId);
      const soilName = soilMap[soilId].name.toLowerCase();
      const plantName = profile.label.toLowerCase();
      const plantArticle = profile.article;
      const plantPossessive = plantArticle === "o" ? "do" : "da";
      let outcome;
      let stage;
      let reason;

      if (ideal) {
        outcome = "healthy";
        stage = "healthy";
        reason = `Nesta simulação, o solo ${soilName} foi escolhido como o mais adequado para o perfil ${plantPossessive} ${plantName}. ${soilNotes[soilId]}`;
      } else if (good) {
        outcome = "lowEnergy";
        stage = "weak";
        reason = `Nesta simulação, o solo ${soilName} foi bom para ${plantArticle} ${plantName}, mas não foi o ideal. O solo preferido para ela é o ${soilMap[profile.ideal].name.toLowerCase()}. ${soilNotes[soilId]}`;
      } else if (okay) {
        outcome = "difficulty";
        stage = "weak";
        reason = `Nesta simulação, a combinação pode trazer dificuldades para ${plantArticle} ${plantName}; o solo preferido para ela é o ${soilMap[profile.ideal].name.toLowerCase()}. ${soilNotes[soilId]}`;
      } else if (poor) {
        outcome = "poor";
        stage = "failed";
        reason = `Nesta simulação, o solo ${soilName} não combina bem com o perfil ${plantPossessive} ${plantName}. ${soilNotes[soilId]}`;
      } else {
        outcome = "difficulty";
        stage = "weak";
        reason = `A combinação pode trazer dificuldades para ${plantArticle} ${plantName}. ${soilNotes[soilId]}`;
      }

      const messages = {
        healthy: `${plantArticle.toUpperCase()} ${plantName} cresceu saudável no solo ${soilName}. ${reason}`,
        lowEnergy: `${plantArticle.toUpperCase()} ${plantName} cresceu com pouca energia no solo ${soilName}. ${reason}`,
        difficulty: `${plantArticle.toUpperCase()} ${plantName} cresceu com dificuldades no solo ${soilName}. ${reason}`,
        poor: `${plantArticle.toUpperCase()} ${plantName} não conseguiu se desenvolver adequadamente no solo ${soilName}. ${reason}`
      };
      return { outcome, stage, message: messages[outcome] };
    }

    plantOptions.addEventListener("click", (event) => {
      const button = event.target.closest(".plant-choice");
      if (!button) return;
      if (gardenStage !== "ready" || button.dataset.plant === selectedPlant) return;
      selectedPlant = button.dataset.plant;
      $$(".plant-choice", plantOptions).forEach((choice) => {
        const active = choice.dataset.plant === selectedPlant;
        choice.classList.toggle("is-selected", active);
        choice.setAttribute("aria-pressed", String(active));
      });
      updatePlantTag();
      $("#garden-message").textContent = selectedPlant ? `${plantProfiles[selectedPlant].emoji} ${plantProfiles[selectedPlant].label} escolhida. Agora escolha o solo.` : "Escolha uma plantinha para começar.";
      playGardenEvent("choice");
    });

    $("#plant-button").addEventListener("click", () => {
      if (!selectedPlant) {
        gardenMessage.textContent = "Primeiro escolha a plantinha que você quer cultivar.";
        return;
      }
      if (!select.value) {
        gardenMessage.textContent = "Escolha um tipo de solo para preparar o canteiro.";
        select.focus();
        return;
      }
      if (gardenStage !== "ready") {
        gardenMessage.textContent = "Sua semente já está plantada. Regue para acompanhar o crescimento!";
        return;
      }
      gardenStage = "planted";
      plantArt.dataset.stage = "seed";
      plantArt.dataset.plant = selectedPlant;
      waterButton.disabled = false;
      select.disabled = true;
      $$(".plant-choice", plantOptions).forEach((choice) => { choice.disabled = true; });
      const profile = plantProfiles[selectedPlant];
      const soilName = soilMap[select.value].name.toLowerCase();
      gardenMessage.textContent = `Semente de ${profile.label.toLowerCase()} plantada no solo ${soilName}. Vamos regar para ver como ela se desenvolve.`;
      playGardenEvent("plant");
      showToast(`${profile.label} no solo ${soilName}!`);
    });

    waterButton.addEventListener("click", () => {
      if (!selectedPlant || gardenStage === "ready") {
        gardenMessage.textContent = "Primeiro escolha a plantinha e plante a semente.";
        return;
      }
      if (gardenTransitionLocked || gardenStage === "complete") return;
      gardenTransitionLocked = true;
      waterButton.disabled = true;
      window.clearTimeout(gardenTransitionTimer);
      gardenTransitionTimer = window.setTimeout(() => {
        gardenTransitionLocked = false;
        waterButton.disabled = gardenStage === "complete";
      }, 900);

      if (gardenStage === "planted") {
        gardenStage = "sprout";
        plantArt.dataset.stage = "sprout";
        gardenMessage.textContent = "A nossa plantinha está começando a crescer! Olha só que bonitinha!";
        playGardenEvent("water");
        playGardenEvent("growth", true);
        return;
      }

      if (gardenStage === "sprout") {
        gardenStage = "leaves";
        plantArt.dataset.stage = "leaves";
        gardenMessage.textContent = lolaAudio.garden.leaves.transcript;
        playGardenEvent("leaves", true);
        return;
      }

      const result = getPlantGrowthResult();
      if (!result) return;
      gardenStage = "complete";
      plantArt.dataset.stage = result.stage;
      gardenMessage.textContent = result.message;
      $("#garden-celebration").hidden = false;
      showToast(result.message);
      playGardenEvent(result.outcome, true);
      markCertificateProgress("garden");
    });

    $("#garden-reset").addEventListener("click", () => resetGarden(true));
    updatePlantTag();
  }

  function resetGarden(stopSpeech = false) {
    window.clearTimeout(gardenTransitionTimer);
    gardenTransitionLocked = false;
    gardenStage = "ready";
    selectedPlant = "";
    if (stopSpeech) {
      stopLolaSpeech();
      lastSpoken = null;
      $("#lola-voice-dialog").hidden = true;
      setLolaMood("normal");
    }
    $("#garden-soil").value = "";
    $("#garden-soil").disabled = false;
    $("#plant-art").dataset.stage = "empty";
    $("#plant-art").dataset.plant = "";
    $("#plant-tag").textContent = "Plantinha pronta";
    $("#garden-water").disabled = true;
    $("#garden-message").textContent = "Escolha uma plantinha e um solo para começar a aventura!";
    $("#garden-celebration").hidden = true;
    $$(".plant-choice").forEach((choice) => {
      choice.classList.remove("is-selected");
      choice.setAttribute("aria-pressed", "false");
      choice.disabled = false;
    });
    $("#lola-repeat").disabled = !lastSpoken || !voiceEnabled;
  }

  // Apresenta as perguntas, as respostas e o resultado do quiz.
  function setupQuiz() {
    let current = 0;
    let score = 0;
    let answered = false;
    let lastFeedbackPhrase = "";
    let lastFeedbackAudio = "";
    let selectedFeedbackAudio = "";
    const correctPhrases = ["Muito bem!", "Resposta certa! Você arrasou!", "Uau! Que explorador inteligente!", "Isso mesmo! Continue assim!"];
    const incorrectPhrases = ["Quase! Vamos aprender juntos?", "Boa tentativa! Não tem problema errar!", "Continue tentando! Cada descoberta nos ensina algo novo!"];
    const content = $("#quiz-content");
    const result = $("#quiz-result");
    const stars = $("#quiz-stars");

    function chooseFeedbackPhrase(phrases, audioFiles) {
      const candidates = phrases.map((phrase, index) => ({ phrase, audio: audioFiles[index] }))
        .filter((item) => item.phrase !== lastFeedbackPhrase && item.audio !== lastFeedbackAudio);
      const choices = candidates.length ? candidates : phrases.map((phrase, index) => ({ phrase, audio: audioFiles[index] }));
      const choice = choices[Math.floor(Math.random() * choices.length)];
      lastFeedbackPhrase = choice.phrase;
      lastFeedbackAudio = choice.audio;
      selectedFeedbackAudio = choice.audio;
      return choice.phrase;
    }

    function renderQuestion() {
      answered = false;
      result.hidden = true;
      content.hidden = false;
      const item = quiz[current];
      $("#quiz-progress").textContent = `Pergunta ${current + 1} de ${quiz.length}`;
      stars.textContent = `${"★".repeat(score)}${"☆".repeat(quiz.length - score)}`;
      stars.setAttribute("aria-label", `${score} ${score === 1 ? "estrela" : "estrelas"}`);
      content.innerHTML = `<span class="question-illustration" aria-hidden="true">${item.illustration}</span>
        <h3 class="quiz-question">${item.question}</h3>
        <button class="quiz-read-button" type="button">🔊 Ouvir pergunta gravada</button>
        <div class="quiz-options">${item.choices.map((choice, index) => `<button class="quiz-option" type="button" data-answer="${index}">${item.type === "truefalse" ? "◉ " : ""}${choice}</button>`).join("")}</div>
        <div id="quiz-feedback-slot"></div>`;
      $(".quiz-read-button", content).addEventListener("click", () => {
        const questionAudio = lolaAudio.quiz.questions[current];
        if (voiceEnabled && questionAudio) lolaSpeak(item.question, "thinking", null, questionAudio);
        else if (voiceEnabled) showToast("Ainda não há um áudio gravado para esta pergunta; leia o enunciado na tela.");
        else showToast("Ative a voz da Lola para ouvir a pergunta.");
      });
      $$(".quiz-option", content).forEach((button) => button.addEventListener("click", () => chooseAnswer(Number(button.dataset.answer))));
    }

    function chooseAnswer(answer) {
      if (answered) return;
      answered = true;
      const item = quiz[current];
      const correct = answer === item.answer;
      if (correct) score += 1;
      const feedbackFiles = correct ? lolaAudio.quiz.correct : lolaAudio.quiz.incorrect;
      const feedbackPhrase = chooseFeedbackPhrase(correct ? correctPhrases : incorrectPhrases, feedbackFiles);
      lolaSpeak(feedbackPhrase, correct ? "happy" : "thinking", null, selectedFeedbackAudio);
      $$(".quiz-option", content).forEach((button) => {
        button.disabled = true;
        const option = Number(button.dataset.answer);
        if (option === item.answer) button.classList.add("is-correct");
        else if (option === answer) button.classList.add("is-wrong");
      });
      $("#quiz-feedback-slot").innerHTML = `<p class="quiz-feedback ${correct ? "correct" : "try-again"}">${correct ? "🌟 Muito bem!" : "🌱 Boa tentativa!"} ${item.explanation}</p>
        <button class="button button-green quiz-next" type="button">${current === quiz.length - 1 ? "Ver meu resultado" : "Próxima pergunta"} ➜</button>`;
      stars.textContent = `${"★".repeat(score)}${"☆".repeat(quiz.length - score)}`;
      stars.setAttribute("aria-label", `${score} ${score === 1 ? "estrela" : "estrelas"}`);
      $(".quiz-next", content).addEventListener("click", () => {
        current += 1;
        if (current === quiz.length) renderResult();
        else renderQuestion();
      });
    }

    function renderResult() {
      content.hidden = true;
      $("#quiz-progress").textContent = "Missão concluída!";
      result.hidden = false;
      result.innerHTML = `<div class="medal" aria-hidden="true">🏅</div><h3>Explorador da Natureza</h3>
        <p>Você conquistou <strong>${score} de ${quiz.length} estrelas</strong>! ${score === quiz.length ? "Que missão incrível!" : "Cada descoberta ajuda você a aprender. Vamos tentar de novo?"}</p>
        <button class="button button-orange" type="button">↻ Jogar novamente</button>`;
      lolaSpeak("Parabéns! Você concluiu o Quiz dos Exploradores! Foi muito divertido aprender com você!", "celebrating", null, lolaAudio.quiz.conclusion);
      markCertificateProgress("quiz");
      $(".button", result).addEventListener("click", () => {
        current = 0;
        score = 0;
        lastFeedbackPhrase = "";
        lastFeedbackAudio = "";
        renderQuestion();
      });
      stars.textContent = `${"★".repeat(score)}${"☆".repeat(quiz.length - score)}`;
    }
    renderQuestion();
    return () => {
      current = 0;
      score = 0;
      lastFeedbackPhrase = "";
      lastFeedbackAudio = "";
      renderQuestion();
    };
  }

  // Controla a exploração do mundo subterrâneo.
  function setupUnderworld() {
    const viewport = $("#underworld-viewport");
    const world = $("#underworld-world");
    const secrets = $$(".secret", world);
    const discovered = new Set();
    let lastSecret = null;
    let descentTimer;
    const secretInfo = {
      worm: {
        name: "A minhoca amiga",
        text: "As minhocas ajudam a misturar a matéria orgânica e criam túneis que facilitam a circulação de ar e água no solo!",
        lola: "Olha só! Uma prima minha! As minhocas ajudam a misturar a matéria orgânica e criam túneis no solo!",
        icon: "🪱"
      },
      roots: {
        name: "Raízes exploradoras",
        text: "As raízes ajudam a segurar as plantas no chão e absorvem água e nutrientes!",
        lola: "Essas são as raízes! Elas ajudam a segurar as plantas e absorvem água e nutrientes!",
        icon: "🌱"
      },
      ants: {
        name: "Formigas trabalhadoras",
        text: "Algumas formigas constroem túneis e movimentam partículas de terra. Elas também são seres vivos que fazem parte desse ambiente!",
        lola: "Você sabia que algumas formigas constroem túneis e movimentam a terra?",
        icon: "🐜"
      },
      stones: {
        name: "Pedras e minerais",
        text: "As pedras e os minerais fazem parte do solo e ajudam a contar sua história. Nem todo solo tem a mesma quantidade ou tamanho de pedras.",
        lola: "Pedrinhas também fazem parte do solo! Elas podem ter diferentes tamanhos e formatos!",
        icon: "🪨"
      },
      water: {
        name: "Uma gotinha viajante",
        text: "A água passa pelos espaços do solo e é importante para as plantas e os seres vivos. O caminho pode ser diferente em cada tipo de solo.",
        lola: "A água é muito importante! Ela ajuda as plantas e vários seres vivos que vivem no solo!",
        icon: "💧"
      }
    };

    $("#discovery-markers").innerHTML = Object.entries(secretInfo).map(([id, info]) =>
      `<span class="discovery-marker" data-marker="${id}" title="${info.name}" aria-label="${info.name}, ainda não descoberto">?</span>`).join("");

    function closePanel(restoreFocus = false) {
      $("#secret-panel").hidden = true;
      if (restoreFocus && lastSecret?.isConnected) lastSecret.focus();
    }

    function setStage(descended) {
      window.clearTimeout(descentTimer);
      viewport.classList.toggle("is-descended", descended);
      $("#descend-button").hidden = descended;
      $("#surface-button").hidden = !descended;
      $("#underworld-stage-label").textContent = descended ? "Você está explorando o subterrâneo" : "Você está na superfície";
      secrets.forEach((secret) => { secret.disabled = !descended; });
      if (!descended) closePanel(false);
    }

    function discover(id) {
      const info = secretInfo[id];
      if (!info) return;
      lastSecret = $(`.secret[data-secret="${id}"]`, world);
      const newlyDiscovered = !discovered.has(id);

      if (newlyDiscovered) {
        discovered.add(id);
        const marker = $(`[data-marker="${id}"]`, $("#discovery-markers"));
        marker.textContent = info.icon;
        marker.classList.add("is-found");
        marker.setAttribute("aria-label", `${info.name}, descoberto`);
        $(`.secret[data-secret="${id}"]`, world).classList.add("is-found");
      }

      $("#secret-title").textContent = info.name;
      $("#secret-description").textContent = info.text;
      $("#secret-panel").hidden = false;
      $("#secret-title").focus();
      $("#lola-message").textContent = info.lola;
      $(".lola-bubble").classList.remove("is-reacting");
      void $(".lola-bubble").offsetWidth;
      $(".lola-bubble").classList.add("is-reacting");
      $("#discovery-count").textContent = `${discovered.size} de 5 descobertas!`;

      if (discovered.size === Object.keys(secretInfo).length && newlyDiscovered) {
        const celebration = "Uhuuul! Você encontrou todos os segredos do subterrâneo! Estou muito orgulhosa de você!";
        $("#lola-message").textContent = celebration;
        $("#underworld-celebration").hidden = false;
        $(".underworld-card").classList.add("is-complete");
        queueLolaSpeech(info.lola, "surprised", lolaAudio.underworld[id]);
        queueLolaSpeech(celebration, "celebrating", lolaAudio.underworld.conclusion);
      } else {
        lolaSpeak(info.lola, "surprised", null, lolaAudio.underworld[id]);
      }
      if (newlyDiscovered) markCertificateProgress("underworld", id);
    }

    $("#descend-button").addEventListener("click", () => {
      activeSectionId = "mundo-subterraneo";
      setStage(true);
      const greeting = "Vamos descer e descobrir os segredos que estão escondidos debaixo da terra!";
      $("#lola-message").textContent = greeting;
      lolaSpeak(greeting, "curious", null, lolaAudio.underworld.intro);
      $("#underworld-stage-label").textContent = "Descendo para o subterrâneo...";
      descentTimer = window.setTimeout(() => {
        $("#underworld-stage-label").textContent = "Você está explorando o subterrâneo";
      }, 1150);
    });
    $("#surface-button").addEventListener("click", () => {
      stopLolaSpeech();
      setLolaMood("normal");
      setStage(false);
    });
    world.addEventListener("click", (event) => {
      const secret = event.target.closest(".secret");
      if (secret && !secret.disabled) discover(secret.dataset.secret);
    });
    $("#secret-close").addEventListener("click", () => closePanel(true));
    $("#secret-continue").addEventListener("click", () => closePanel(true));
    $("#secret-panel").addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePanel(true);
    });
    function resetMission(restoreFocus = false) {
      stopLolaSpeech();
      setLolaMood("normal");
      discovered.clear();
      secrets.forEach((secret) => secret.classList.remove("is-found"));
      Object.keys(secretInfo).forEach((id) => {
        const marker = $(`[data-marker="${id}"]`, $("#discovery-markers"));
        marker.textContent = "?";
        marker.classList.remove("is-found");
        marker.setAttribute("aria-label", `${secretInfo[id].name}, ainda não descoberto`);
      });
      $("#discovery-count").textContent = "0 de 5 descobertas!";
      $("#underworld-celebration").hidden = true;
      $(".underworld-card").classList.remove("is-complete");
      $("#lola-message").textContent = "Olá, explorador! Preparado para descobrir o que existe debaixo dos nossos pés? Vamos juntos!";
      closePanel();
      setStage(false);
      if (restoreFocus) $("#descend-button").focus();
    }

    $("#underworld-reset").addEventListener("click", () => resetMission(true));
    setStage(false);
    return () => {
      resetMission(false);
      $("#lola-message").textContent = "Olá, explorador! Preparado para descobrir o que existe debaixo dos nossos pés? Vamos juntos!";
    };
  }

  // Emite o certificado, com personalização e impressão.
  function setupCertificate() {
    const namePanel = $("#certificate-name-panel");
    const output = $("#certificate-output");
    const nameInput = $("#certificate-name");
    const formError = $("#certificate-form-error");
    let teacherIssuing = false;

    function beginNameEntry(isTeacher = false) {
      if (!isTeacher && !isCertificateUnlocked()) {
        showToast("Complete as aventuras principais para desbloquear seu certificado.");
        return;
      }
      teacherIssuing = isTeacher;
      const entering = namePanel.hidden;
      namePanel.hidden = false;
      output.hidden = true;
      if (entering) {
        nameInput.value = "";
        formError.hidden = true;
        updateCertificateName();
        speakCertificateLine("name");
      }
      nameInput.focus();
    }

    function updateCertificateName() {
      const normalizedName = nameInput.value.trim().replace(/\s+/g, " ");
      $("#certificate-recipient").textContent = normalizedName || "Pequeno Explorador";
      const length = Array.from(normalizedName).length;
      const fontSize = length > 24 ? "1.35rem" : length > 18 ? "1.7rem" : length > 12 ? "2rem" : "2.35rem";
      $("#certificate-recipient").style.setProperty("--recipient-font-size", fontSize);
    }

    function generateCertificate() {
      const normalizedName = nameInput.value.trim().replace(/\s+/g, " ");
      const length = Array.from(normalizedName).length;
      if (!normalizedName || length > 30) {
        formError.textContent = normalizedName ? "O nome deve ter no máximo 30 caracteres." : "Escreva seu primeiro nome para gerar o certificado.";
        formError.hidden = false;
        nameInput.focus();
        return;
      }
      formError.hidden = true;
      nameInput.value = normalizedName;
      updateCertificateName();
      const issuedAt = teacherIssuing ? new Date().toISOString() : certificateProgress.completedAt || new Date().toISOString();
      const parsedDate = new Date(issuedAt);
      $("#certificate-date").textContent = `Data: ${Number.isNaN(parsedDate.getTime()) ? new Date().toLocaleDateString("pt-BR") : parsedDate.toLocaleDateString("pt-BR")}`;
      namePanel.hidden = true;
      output.hidden = false;
      $("#certificate-print-confirmation").hidden = true;
      $("#certificate-continue-print").hidden = true;
      speakCertificateLine("ready");
      $("#certificate-document").scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function startPrintFlow() {
      if (!voiceEnabled) {
        $("#certificate-print-confirmation").hidden = true;
        $("#certificate-continue-print").hidden = true;
        window.print();
        return;
      }
      const confirmation = $("#certificate-print-confirmation");
      const continueButton = $("#certificate-continue-print");
      confirmation.hidden = true;
      continueButton.hidden = true;
      continueButton.disabled = true;
      let speechFinished = false;
      const started = speakCertificateLine("print", () => {
        speechFinished = true;
        continueButton.disabled = false;
      });
      confirmation.hidden = false;
      continueButton.hidden = false;
      continueButton.disabled = started && !speechFinished;
    }

    $("#certificate-receive").addEventListener("click", () => beginNameEntry(false));
    $("#certificate-teacher-open").addEventListener("click", () => beginNameEntry(true));
    $("#certificate-generate").addEventListener("click", generateCertificate);
    nameInput.addEventListener("input", () => {
      formError.hidden = true;
      updateCertificateName();
    });
    nameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        generateCertificate();
      }
    });
    $("#certificate-edit").addEventListener("click", () => {
      namePanel.hidden = false;
      formError.hidden = true;
      nameInput.focus();
    });
    $("#certificate-print").addEventListener("click", startPrintFlow);
    $("#certificate-pdf").addEventListener("click", () => {
      showToast("Na janela de impressão, escolha “Salvar como PDF”.");
      startPrintFlow();
    });
    $("#certificate-continue-print").addEventListener("click", () => {
      stopLolaSpeech();
      window.print();
    });
    $("#certificate-reset-progress").addEventListener("click", () => {
      resetActivities();
    });
    window.addEventListener("afterprint", () => {
      $("#certificate-print-confirmation").hidden = true;
      $("#certificate-continue-print").hidden = true;
    });

    renderCertificateProgress();
    if (isCertificateUnlocked() && !certificateProgress.unlocked) {
      certificateProgress.unlocked = true;
      certificateProgress.completedAt = certificateProgress.completedAt || new Date().toISOString();
      saveCertificateProgress();
      renderCertificateProgress();
    }
    updateCertificateName();
  }

  // Controla a navegação, o modo professora e a tela cheia.
  function setupNavigation() {
    const menu = $("#main-nav");
    const toggle = $(".menu-toggle");
    $(".hero-cta").addEventListener("click", (event) => {
      const phrase = "Oba! Nossa aventura vai começar! Vamos descobrir os diferentes tipos de solo!";
      $("#hero-speech-text").textContent = phrase;
      if (!voiceEnabled) {
        return;
      }
      event.preventDefault();
      lolaSpeak(phrase, "happy", () => { window.location.hash = "#explorar"; }, lolaAudio.start);
    });
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
        toggle.focus();
      }
    });
    menu.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (link) {
        const menuWasOpen = toggle.getAttribute("aria-expanded") === "true";
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
        if (menuWasOpen) toggle.focus({ preventScroll: true });
        const targetId = link.hash.slice(1);
        if (targetId && targetId !== activeSectionId) {
          stopLolaSpeech();
          setLolaMood("normal");
          $("#lola-voice-dialog").hidden = true;
          activeSectionId = targetId;
        }
      }
    });
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || link.classList.contains("hero-cta")) return;
      const targetId = link.hash.slice(1);
      if (targetId && targetId !== activeSectionId) {
        stopLolaSpeech();
        setLolaMood("normal");
        $("#lola-voice-dialog").hidden = true;
        activeSectionId = targetId;
      }
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (activeSectionId !== entry.target.id) {
            activeSectionId = entry.target.id;
            if (speechActive && speechSectionId !== activeSectionId) {
              stopLolaSpeech();
              setLolaMood("normal");
            }
          }
          const link = $(`.main-nav a[href="#${entry.target.id}"]`);
          $$(".main-nav a").forEach((item) => item.removeAttribute("aria-current"));
          if (link) link.setAttribute("aria-current", "location");
        }
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    ["inicio", "explorar", "experimentos", "mundo-subterraneo", "hortinha", "quiz", "certificado"].forEach((id) => observer.observe(document.getElementById(id)));
  }

  function setupTeacherMode() {
    const button = $("#teacher-toggle");
    button.addEventListener("click", () => {
      const enabled = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(enabled));
      document.body.classList.toggle("teacher-mode", enabled);
      $("#certificate-teacher-open").hidden = !enabled;
      showToast(enabled ? "Modo professora ativado. Use os botões de pista para mostrar ou esconder respostas." : "Modo professora desativado.");
    });
    $("#fullscreen-button").addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch (error) {
        showToast("A tela cheia não está disponível neste navegador.");
      }
    });
    document.addEventListener("fullscreenchange", () => {
      const active = Boolean(document.fullscreenElement);
      $("#fullscreen-button").setAttribute("aria-label", active ? "Sair da tela cheia" : "Ativar tela cheia");
      $("#fullscreen-button").title = active ? "Sair da tela cheia" : "Ativar tela cheia";
    });
  }

  // Reinicia as atividades e seus estados.
  function resetActivities() {
    stopLolaSpeech();
    $("#lola-voice-dialog").hidden = true;
    setLolaMood("normal");
    resetCertificateProgress();
    resetGarden();
    resetLab();
    resetUnderworld();
    $$(".teacher-answer").forEach((answer) => { answer.hidden = true; });
    $$(".answer-toggle").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.textContent = "Mostrar uma pista";
    });
    $("#soil-detail").hidden = true;
    $$(".soil-card").forEach((card) => card.setAttribute("aria-expanded", "false"));
    resetQuiz();
    showToast("Atividades reiniciadas. Vamos começar uma nova missão!");
  }

  // Prepara as atividades e conecta seus controles.
  renderSoilCards();
  setupLolaVoice();
  const resetLab = setupLab();
  const resetUnderworld = setupUnderworld();
  setupAnswerToggle($(".answer-toggle"));
  setupGarden();
  setupCertificate();
  const resetQuiz = setupQuiz();
  setupNavigation();
  setupTeacherMode();
  $("#reset-activities").addEventListener("click", resetActivities);
})();
