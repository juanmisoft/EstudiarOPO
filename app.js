// app.js – Premium Interactivity, Engines, Databases & Test Simulator for GSI Study Portal

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // ⚖️ LAWS DATABASE
  // ==========================================
  const lawsData = [
    {
      title: "Real Decreto 311/2022 (ENS)",
      badge: "106 menciones",
      badgeType: "gold",
      desc: "Establece el Esquema Nacional de Seguridad. Regula los principios básicos, requisitos mínimos y medidas de seguridad (físicas, lógicas y organizativas) obligatorias para garantizar la protección de la información y los servicios en la administración electrónica.",
      scope: "Todo el Sector Público español e integradores o proveedores tecnológicos privados que colaboren con la administración."
    },
    {
      title: "Real Decreto 4/2010 (ENI)",
      badge: "83 menciones",
      badgeType: "gold",
      desc: "Regula el Esquema Nacional de Interoperabilidad. Define los criterios y condiciones necesarias para garantizar el intercambio de datos, documentos y expedientes electrónicos entre diferentes sistemas y organismos de forma segura y consistente.",
      scope: "Administración General del Estado, Comunidades Autónomas, Entidades Locales y organismos públicos vinculados o dependientes."
    },
    {
      title: "Constitución Española de 1978",
      badge: "22 menciones",
      badgeType: "indigo",
      desc: "Norma suprema de la jerarquía legislativa nacional. Garantiza los derechos fundamentales (artículos 14-29), como la limitación legal al uso de la informática en el art. 18.4, y define la organización de las instituciones clave del Estado.",
      scope: "Nacional (Ciudadanía, Poderes Públicos e Instituciones del Estado)."
    },
    {
      title: "Ley 39/2015 (LPACAP)",
      badge: "13 menciones",
      badgeType: "indigo",
      desc: "Ley del Procedimiento Administrativo Común de las Administraciones Públicas. Establece las bases del procedimiento de tramitación de expedientes, los derechos de los interesados, la validez de los actos administrativos y el uso de registros electrónicos.",
      scope: "Todas las Administraciones Públicas (Territoriales, Institucionales y Entidades Sectoriales)."
    },
    {
      title: "Ley 40/2015 (LRJSP)",
      badge: "13 menciones",
      badgeType: "indigo",
      desc: "Ley de Régimen Jurídico del Sector Público. Regula el funcionamiento interno de los entes públicos, el régimen de responsabilidad patrimonial y las herramientas para la administración digital (Sedes Electrónicas, Actuaciones Automatizadas, Firmas).",
      scope: "Todas las Administraciones Públicas y Sector Público institucional."
    },
    {
      title: "Reglamento (UE) 2016/679 y LO 3/2018",
      badge: "15 menciones",
      badgeType: "indigo",
      desc: "Reglamento General de Protección de Datos (RGPD) y Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD). Regulan el tratamiento lícito, leal y transparente de datos personales y otorgan los derechos ARSULIP+ y digitales.",
      scope: "Nacional y Europeo. Ámbito público y privado con tratamiento de datos."
    },
    {
      title: "Ley 19/2013 (Transparencia y Buen Gobierno)",
      badge: "18 menciones",
      badgeType: "indigo",
      desc: "Regula la transparencia en la actividad pública bajo una doble vertiente: obligaciones de publicidad activa y el derecho subjetivo de acceso del ciudadano a la información. Establece el régimen de buen gobierno y sus sanciones.",
      scope: "Administraciones públicas, empresas públicas, partidos políticos, sindicatos y corporaciones de derecho público."
    },
    {
      title: "Ley Orgánica 3/2007 (Igualdad Efectiva)",
      badge: "10 menciones",
      badgeType: "indigo",
      desc: "Ley para la igualdad efectiva de mujeres y hombres. Contiene medidas destinadas a evitar la discriminación por razón de sexo y establece la obligatoriedad de implementar y evaluar periódicamente planes de igualdad en el ámbito del empleo público.",
      scope: "Nacional. De aplicación transversal en Administraciones Públicas, empresas y particulares."
    },
    {
      title: "Ley 37/2007 (Reutilización de Información)",
      badge: "8 menciones",
      badgeType: "indigo",
      desc: "Regula las condiciones de reutilización de documentos y bases de datos producidos por las AAPP. Facilita la creación de productos de valor añadido (open data), impulsando la economía digital y la rendición de cuentas pública.",
      scope: "Sector público nacional, con exclusiones específicas (archivos de museos, bibliotecas nacionales, etc.)."
    }
  ];

  // ==========================================
  // 📚 GLOSSARY DATABASE
  // ==========================================
  const glossaryGeneral = [
    { term: "Acto Administrativo", definition: "Declaración de voluntad, de juicio, de conocimiento o de deseo realizada por la Administración en ejercicio de una potestad administrativa distinta de la potestad reglamentaria." },
    { term: "Publicidad Activa", definition: "Obligación de los sujetos incluidos en la Ley 19/2013 de publicar de forma periódica y actualizada la información relevante sobre su funcionamiento, contratos, presupuestos e institucionalidad." },
    { term: "Derecho de Acceso", definition: "Facultad subjetiva del ciudadano para solicitar información pública en poder de las administraciones públicas y entidades del sector público sin obligación de justificar interés." },
    { term: "Delegado de Protección de Datos (DPD)", definition: "Figura obligatoria en el sector público encargada de supervisar el cumplimiento de la normativa de protección de datos, asesorar al responsable y actuar como enlace con la AEPD." },
    { term: "Sede Electrónica", definition: "Dirección electrónica, disponible para los ciudadanos a través de redes de telecomunicaciones, cuya titularidad, gestión y administración corresponde a una Administración Pública." },
    { term: "Actuación Administrativa Automatizada", definition: "Cualquier acto o actuación realizada íntegramente a través de un sistema de información adecuadamente programado, sin intervención directa de una persona física." },
    { term: "Firma Electrónica Cualificada", definition: "Firma electrónica avanzada que se crea mediante un dispositivo cualificado de creación de firmas y se basa en un certificado cualificado de firma electrónica." },
    { term: "Procedimiento Administrativo Común", definition: "Conjunto formal de trámites que rige la actuación de la Administración para materializar sus decisiones y garantizar los derechos de los administrados." },
    { term: "Silencio Administrativo", definition: "Ficción legal por la cual, transcurrido el plazo máximo legal para dictar y notificar resolución expresa, se producen efectos estimatorios (positivo) o desestimatorios (negativo)." },
    { term: "Cooperación Interadministrativa", definition: "Principio rector por el cual dos o más administraciones coordinan de mutuo acuerdo sus políticas sectoriales a través de órganos colegiados o convenios formales." },
    { term: "Estatuto Básico del Empleado Público (EBEP)", definition: "Texto refundido que establece las bases del régimen estatutario de los funcionarios públicos y del personal laboral al servicio de las AAPP." },
    { term: "Plan de Igualdad en la AGE", definition: "Instrumento estratégico que recoge las medidas correctoras acordadas para garantizar la ausencia de discriminaciones de género y fomentar la conciliación." },
    { term: "Comisión de Estrategia TIC", definition: "Órgano colegiado de gobernanza encargado de definir las líneas estratégicas en materia de tecnologías de la información y administración digital del Estado." },
    { term: "Reutilización de Información", definition: "El uso de documentos que obran en poder de las administraciones públicas por personas físicas o jurídicas, con fines comerciales o no comerciales." },
    { term: "Derechos ARSULIP+", definition: "El conjunto de derechos de protección de datos: Acceso, Rectificación, Supresión (Olvido), Limitación del tratamiento, Portabilidad, Oposición y decisiones automatizadas." }
  ];

  const glossaryTechnical = [
    { term: "Esquema Nacional de Seguridad (ENS)", definition: "Conjunto de principios básicos, requisitos mínimos y medidas de seguridad agrupadas en categorías (Organización, Marco Operacional y Medidas de Protección) para proteger los sistemas de información del sector público." },
    { term: "Esquema Nacional de Interoperabilidad (ENI)", definition: "Marco normativo que define las normas técnicas y organizativas comunes para posibilitar la compartición segura y efectiva de datos y servicios entre sistemas informáticos gubernamentales." },
    { term: "Cloud Computing (SaaS, PaaS, IaaS)", definition: "Modelo de prestación de servicios tecnológicos que permite el acceso bajo demanda a recursos computacionales escalables e infraestructura física (IaaS), plataformas de desarrollo (PaaS) o software final (SaaS)." },
    { term: "Bases de Datos Relacionales (ACID)", definition: "Sistemas gestores de datos basados en tablas que garantizan robustez e integridad transaccional mediante el cumplimiento de atomicidad, consistencia, aislamiento y durabilidad." },
    { term: "NoSQL (ACID vs BASE)", definition: "Sistemas de almacenamiento de información no relacionales diseñados para escalabilidad horizontal masiva, regidos por el teorema CAP y el paradigma transaccional BASE (Basically Available, Soft State, Eventual Consistency)." },
    { term: "Modelo OSI vs TCP/IP", definition: "Modelos de referencia de comunicaciones de red. OSI se compone de 7 capas teóricas e independientes, mientras que TCP/IP condensa la arquitectura de internet real en 4 capas operativas." },
    { term: "Docker (Volúmenes y Contenedores)", definition: "Tecnología de virtualización a nivel de sistema operativo que empaqueta aplicaciones en contenedores ligeros y portables. Los volúmenes permiten persistir datos fuera del contenedor." },
    { term: "Firma Digital (CAdES, XAdES, PAdES)", definition: "Formatos estándar de firma electrónica cualificada. CAdES (binario CMS), XAdES (estructura XML para metadatos y portabilidad) y PAdES (cifrado e incrustado en archivos PDF nativos)." },
    { term: "DevOps y CI/CD", definition: "Filosofía de desarrollo y operaciones unificadas apoyada en pipelines automatizados de integración continua (CI) y despliegue continuo (CD) para automatizar builds, test y despliegues rápidos." },
    { term: "Metodologías Ágiles (SCRUM)", definition: "Marco de trabajo iterativo para desarrollo complejo caracterizado por roles claros (Product Owner, Scrum Master, Developers) y eventos fijos (Sprints, Daily, Retrospective)." },
    { term: "Bastionado de Sistemas (Hardening)", definition: "Proceso de asegurar un sistema operativo o aplicación reduciendo su superficie de ataque mediante el cierre de puertos innecesarios, desactivación de servicios y refuerzo de políticas." },
    { term: "Arquitectura Microservicios", definition: "Estilo arquitectónico de desarrollo de software consistente en dividir una aplicación compleja en pequeños servicios independientes, desacoplados y comunicados vía API ligera (REST/gRPC)." },
    { term: "Criptografía Asimétrica (Clave Pública)", definition: "Método de cifrado basado en un par de claves matemáticamente relacionadas: una clave pública para cifrar o verificar y una clave privada para descifrar o firmar de forma segura." },
    { term: "Redes Privadas Virtuales (VPN - IPsec vs SSL)", definition: "Túneles virtuales para conectar redes remotas. IPsec opera en capa de red (Capa 3 OSI), ideal para uniones site-to-site estables; SSL/TLS opera en capa de aplicación, óptimo para accesos remotos cliente-servidor." },
    { term: "Sistemas SIEM", definition: "Security Information and Event Management. Herramienta centralizada que recopila, correlaciona y analiza logs de seguridad generados por dispositivos y sistemas en toda la infraestructura de red." },
    { term: "OAuth 2.0 y OpenID Connect (OIDC)", definition: "OAuth 2.0 es un marco estándar abierto para autorización delegada de acceso a recursos de terceros; OpenID Connect es una capa de identidad superior que añade autenticación federada usando JSON Web Tokens." },
    { term: "SAML 2.0 (Security Assertion Markup Language)", definition: "Estándar de intercambio de datos de identidad basado en XML que facilita la autenticación única (Single Sign-On o SSO) entre un proveedor de identidad (IdP) y un proveedor de servicios (SP)." },
    { term: "API Gateway", definition: "Punto de entrada único al sistema que gestiona, protege y enruta las peticiones de los clientes a los distintos microservicios traseros, encargándose del balanceo de carga, la autenticación y el rate limiting." },
    { term: "JWT (JSON Web Token)", definition: "Estándar abierto (RFC 7519) que define un formato compacto y autocontenido para transmitir de forma segura información formateada en JSON firmada criptográficamente con HMAC o RSA." },
    { term: "WSDL (Web Services Description Language)", definition: "Archivo descriptor en formato XML de un servicio web basado en SOAP que especifica la interfaz pública, los métodos, parámetros requeridos y la dirección de red del endpoint." },
    { term: "Hipervisor (Tipo 1 vs Tipo 2)", definition: "Software de virtualización. El Tipo 1 (Bare-metal) se ejecuta directamente sobre el hardware físico (ej: VMware ESXi, Proxmox); el Tipo 2 requiere un sistema operativo anfitrión previo (ej: VirtualBox)." },
    { term: "Kubernetes (K8s)", definition: "Sistema de código abierto de orquestación de contenedores que automatiza el despliegue, el escalado dinámico, el enrutamiento de red y la autocuración (self-healing) de clústeres de contenedores." },
    { term: "DNSSEC (Domain Name System Security Extensions)", definition: "Extensiones del protocolo DNS clásico que proporcionan autenticación de datos de origen e integridad de datos mediante firmas criptográficas en las respuestas DNS para mitigar ataques de spoofing." },
    { term: "DHCP (Dynamic Host Configuration Protocol)", definition: "Protocolo de configuración de red dinámico que asigna de forma automatizada direcciones IP, máscaras de subred, puertas de enlace predeterminadas y servidores DNS a los hosts de la red local." },
    { term: "HTTPS / TLS", definition: "Canal seguro de transferencia web. Combina el protocolo HTTP estándar con cifrado a nivel de transporte (TLS) para salvaguardar la privacidad de datos y autenticar la identidad del sitio servidor." },
    { term: "RAID (RAID 0, 1, 5, 6 y 10)", definition: "Tecnología de almacenamiento secundario que unifica múltiples discos físicos en una sola unidad lógica. RAID 0 (striping), RAID 1 (mirroring), RAID 5 (paridad distribuida) y RAID 6 (doble paridad distribuida)." },
    { term: "SAN vs NAS", definition: "Arquitecturas de almacenamiento de red. NAS (Network Attached Storage) provee acceso a nivel de archivos usando protocolos como NFS/CIFS sobre LAN; SAN (Storage Area Network) ofrece bloques crudos de disco sobre red dedicada." },
    { term: "VoiceXML (VXML)", definition: "Estándar de la W3C basado en lenguaje XML para crear páginas de diálogo de voz interactivas, permitiendo el control y diseño de sistemas IVR con reconocimiento del habla y síntesis de voz." },
    { term: "CRM (Operativo, Analítico y Colaborativo)", definition: "Software de gestión de relaciones con los usuarios. Operativo (front-office/back-office), Analítico (Business Intelligence y explotación predictiva) y Colaborativo (gestión de canales de contacto)." },
    { term: "WFM (Workforce Management)", definition: "Sistemas inteligentes aplicados en centros de contacto para estimar demandas de tráfico, calcular dotación y planificar turnos del personal de atención telefónica mediante algoritmos de Erlang C." },
    { term: "MAGERIT y PILAR", definition: "MAGERIT es la metodología de análisis y gestión de riesgos tecnológicos recomendada para la Administración Pública de España; PILAR es la suite de herramientas que permite modelarla y ejecutarla." },
    { term: "BIA (Business Impact Analysis)", definition: "Estudio de impacto del negocio destinado a evaluar las consecuencias de una interrupción de servicios, fijando el RTO (tiempo objetivo de recuperación) y el RPO (punto objetivo de recuperación)." },
    { term: "Patrones de Diseño GoF", definition: "Soluciones reutilizables predefinidas a problemas recurrentes de arquitectura de software, agrupadas por la Gang of Four en tres familias: Creacionales, Estructurales y de Comportamiento." },
    { term: "WCAG y Principios P.O.U.R.", definition: "Directrices de accesibilidad web estructuradas en 4 pilares: Perceptible (información clara), Operable (navegación completa por teclado), Comprensible (lenguaje simple) y Robusto (compatibilidad técnica)." },
    { term: "Erasure Coding", definition: "Método de tolerancia a fallos distribuidos que trocea un objeto en N fragmentos de datos y M de paridad redundantes, ofreciendo una alta durabilidad con mucho menor impacto en almacenamiento que la réplica o RAID." },
    { term: "Cifrado Homomórfico", definition: "Tipo avanzado de criptografía que posibilita procesar operaciones algebraicas complejas directamente sobre textos cifrados sin descifrarlos en memoria, manteniendo la confidencialidad." },
    { term: "Proxy vs Reverse Proxy", definition: "El Proxy actúa como intermediario para el tráfico saliente de clientes locales hacia internet; el Reverse Proxy intermedia el tráfico entrante de internet para balancear cargas y proteger servidores web." },
    { term: "IPsec (AH vs ESP)", definition: "Marco de seguridad para comunicaciones IP a nivel de Capa 3. AH (Authentication Header) ofrece autenticidad de origen; ESP (Encapsulating Security Payload) añade además confidencialidad por cifrado." },
    { term: "Firma Long-Term (LTV)", definition: "Estructuras de firmas de larga duración (ej: XAdES-A, PAdES-LTV) que incrustan sellos de tiempo y material de revocación (OCSP/CRL) para garantizar la validez legal incluso si el certificado raíz expira." }
  ];


  // ==========================================
  // 🗺️ SPA ROUTING & NAVIGATION
  // ==========================================
  const navItems = document.querySelectorAll('.nav-menu .nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      if (!targetId) return;

      // Update active nav-menu list item
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // Update active section visibility
      document.querySelectorAll('.app-section').forEach(section => {
        section.classList.remove('active');
      });
      
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });


  // ==========================================
  // 🌓 THEME SWITCHER LOGIC
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeSwitchText = document.querySelector('.theme-switch span');

  // Load and apply saved visual preference
  const savedTheme = localStorage.getItem('gsi_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeText(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('gsi_theme', newTheme);
      updateThemeText(newTheme);
    });
  }

  function updateThemeText(theme) {
    if (themeSwitchText) {
      themeSwitchText.textContent = theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro';
    }
  }


  // ==========================================
  // 📝 DYNAMIC LAWS INJECTION & SEARCH
  // ==========================================
  const lawsContainer = document.getElementById('laws-container');
  
  function renderLaws(lawsToRender) {
    if (!lawsContainer) return;
    lawsContainer.innerHTML = '';
    
    if (lawsToRender.length === 0) {
      lawsContainer.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <p style="color: var(--text-muted); font-size: 1rem;">No se encontraron leyes que coincidan con los criterios de búsqueda.</p>
        </div>
      `;
      return;
    }

    lawsToRender.forEach(law => {
      const card = document.createElement('div');
      card.className = 'card law-card';
      
      card.innerHTML = `
        <div class="law-header">
          <span class="law-title">${law.title}</span>
          <span class="badge badge-${law.badgeType}">${law.badge}</span>
        </div>
        <p class="law-desc">${law.desc}</p>
        <div class="law-scope">${law.scope}</div>
      `;
      
      lawsContainer.appendChild(card);
    });
  }

  // Initial laws rendering on page load
  renderLaws(lawsData);

  // Search input event listener
  const lawSearch = document.getElementById('law-search');
  if (lawSearch) {
    lawSearch.addEventListener('input', () => {
      const query = lawSearch.value.toLowerCase().trim();
      const filteredLaws = lawsData.filter(law => {
        return law.title.toLowerCase().includes(query) || 
               law.desc.toLowerCase().includes(query) || 
               law.scope.toLowerCase().includes(query);
      });
      renderLaws(filteredLaws);
    });
  }


  // ==========================================
  // 📚 DYNAMIC GLOSSARY INJECTION & SEARCH
  // ==========================================
  const generalListContainer = document.getElementById('glossary-general-list');
  const technicalListContainer = document.getElementById('glossary-technical-list');

  function renderGlossary(generalTerms, technicalTerms) {
    if (generalListContainer) {
      generalListContainer.innerHTML = '';
      if (generalTerms.length === 0) {
        generalListContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No hay términos generales</p>';
      } else {
        generalTerms.forEach(item => {
          const div = document.createElement('div');
          div.className = 'glossary-item';
          div.innerHTML = `
            <div class="glossary-term">${item.term}</div>
            <div class="glossary-definition">${item.definition}</div>
          `;
          generalListContainer.appendChild(div);
        });
      }
    }

    if (technicalListContainer) {
      technicalListContainer.innerHTML = '';
      if (technicalTerms.length === 0) {
        technicalListContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No hay términos técnicos</p>';
      } else {
        technicalTerms.forEach(item => {
          const div = document.createElement('div');
          div.className = 'glossary-item';
          div.innerHTML = `
            <div class="glossary-term">${item.term}</div>
            <div class="glossary-definition">${item.definition}</div>
          `;
          technicalListContainer.appendChild(div);
        });
      }
    }
  }

  // Sort general and technical glossary terms alphabetically by term
  glossaryGeneral.sort((a, b) => a.term.localeCompare(b.term, 'es', { sensitivity: 'base' }));
  glossaryTechnical.sort((a, b) => a.term.localeCompare(b.term, 'es', { sensitivity: 'base' }));

  // Initial glossary rendering on page load
  renderGlossary(glossaryGeneral, glossaryTechnical);

  // Search input event listener
  const glossarySearch = document.getElementById('glossary-search');
  if (glossarySearch) {
    glossarySearch.addEventListener('input', () => {
      const query = glossarySearch.value.toLowerCase().trim();
      
      const filteredGeneral = glossaryGeneral.filter(item => {
        return item.term.toLowerCase().includes(query) || 
               item.definition.toLowerCase().includes(query);
      });

      const filteredTechnical = glossaryTechnical.filter(item => {
        return item.term.toLowerCase().includes(query) || 
               item.definition.toLowerCase().includes(query);
      });

      renderGlossary(filteredGeneral, filteredTechnical);
    });
  }


  // ==========================================
  // 📝 COLLAPSIBLE ACCORDIONS (SYLLABUS & PRACTICAL QUESTIONS)
  // ==========================================
  document.addEventListener('click', (e) => {
    try {
      const header = e.target.closest('.accordion-header');
      if (!header) return;
      
      const item = header.closest('.accordion-item');
      if (!item) return;

      const isOpen = item.classList.contains('open');
      item.classList.toggle('open');
      header.setAttribute('aria-expanded', !isOpen);
    } catch (error) {
      console.error('Error toggling accordion:', error);
    }
  });

  // Listener para los temas desplegables del temario (Syllabus)
  document.addEventListener('click', (e) => {
    try {
      const topicHeader = e.target.closest('.topic-header');
      if (!topicHeader) return;
      
      const card = topicHeader.closest('.topic-card.collapsible-topic');
      if (!card) return;

      card.classList.toggle('open');
    } catch (error) {
      console.error('Error toggling syllabus topic:', error);
    }
  });


  // ==========================================
  // 📝 PRACTICAL CASES SWITCHER
  // ==========================================
  const caseButtons = document.querySelectorAll('.case-btn');
  caseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const caseId = btn.getAttribute('data-case');
      if (!caseId) return;

      // Toggle active selector buttons
      caseButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Toggle active case content container
      document.querySelectorAll('.case-content-container').forEach(container => {
        container.classList.remove('active');
      });
      const targetContainer = document.getElementById(`case-${caseId}`);
      if (targetContainer) {
        targetContainer.classList.add('active');
      }
    });
  });


  // ==========================================
  // 🎯 INTERACTIVE TEST SIMULATOR ENGINE
  // ==========================================
  let quizQuestions = [];
  let userAnswers = {};
  let currentQuestionIndex = 0;
  let timerInterval = null;
  let secondsElapsed = 0;

  // Fisher-Yates shuffle algorithm to ensure high replayability
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Quiz active/setup DOM Elements
  const btnStartQuiz = document.getElementById('btn-start-quiz');
  const quizSetupState = document.getElementById('quiz-setup-state');
  const quizActiveState = document.getElementById('quiz-active-state');
  const quizResultState = document.getElementById('quiz-result-state');
  const quizReviewArea = document.getElementById('quiz-review-area');
  const quizReviewList = document.getElementById('quiz-review-list');

  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsContainer = document.getElementById('quiz-options-container');
  const quizQuestionNumber = document.getElementById('quiz-question-number');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  
  const btnQuizPrev = document.getElementById('btn-quiz-prev');
  const btnQuizNext = document.getElementById('btn-quiz-next');

  // Start exam event handler
  if (btnStartQuiz) {
    btnStartQuiz.addEventListener('click', () => {
      const selectYear = document.getElementById('select-year').value;
      const selectBlock = document.getElementById('select-block').value;
      const selectNum = parseInt(document.getElementById('select-num').value, 10);

      // Filter global questions database
      let filtered = [];
      if (typeof questionsData !== 'undefined') {
        filtered = questionsData.filter(q => {
          // Year filter
          if (selectYear !== 'all' && q.year !== parseInt(selectYear, 10)) {
            return false;
          }
          // Block filter
          if (selectBlock !== 'all') {
            if (selectBlock === 'general') {
              return q.block === 'general';
            } else if (selectBlock === 'especifico') {
              return q.block !== 'general';
            }
          }
          return true;
        });
      }

      if (filtered.length === 0) {
        alert('No se encontraron preguntas de test con los filtros seleccionados. Inténtalo con otros parámetros.');
        return;
      }

      // Shuffle and slice according to configuration
      quizQuestions = shuffleArray(filtered).slice(0, selectNum);
      userAnswers = {};
      currentQuestionIndex = 0;
      secondsElapsed = 0;

      // Start elapsed timer
      clearInterval(timerInterval);
      document.getElementById('quiz-time-display').textContent = '⏱️ Tiempo: 00:00';
      timerInterval = setInterval(() => {
        secondsElapsed++;
        const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
        const secs = (secondsElapsed % 60).toString().padStart(2, '0');
        document.getElementById('quiz-time-display').textContent = `⏱️ Tiempo: ${mins}:${secs}`;
      }, 1000);

      // Switch panels visibility
      quizSetupState.style.display = 'none';
      quizActiveState.style.display = 'block';
      quizResultState.style.display = 'none';
      quizReviewArea.style.display = 'none';

      // Render first question
      renderQuestion();
    });
  }

  // Render active question details
  function renderQuestion() {
    if (!quizQuestions.length) return;
    const question = quizQuestions[currentQuestionIndex];

    // Meta texts and progress bar
    quizQuestionNumber.textContent = `Pregunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    if (quizProgressFill) {
      quizProgressFill.style.width = `${progressPercent}%`;
    }

    // Load question text
    if (quizQuestionText) {
      quizQuestionText.textContent = question.question;
    }

    // Clear and build options buttons
    if (quizOptionsContainer) {
      quizOptionsContainer.innerHTML = '';
      const optionKeys = ['a', 'b', 'c', 'd'];
      optionKeys.forEach(key => {
        if (question.options && question.options[key]) {
          const optionBtn = document.createElement('button');
          optionBtn.className = 'quiz-option';
          optionBtn.setAttribute('aria-label', `Opción ${key.toUpperCase()}: ${question.options[key]}`);
          
          if (userAnswers[currentQuestionIndex] === key) {
            optionBtn.classList.add('selected');
          }

          optionBtn.innerHTML = `
            <span class="quiz-option-letter">${key.toUpperCase()}</span>
            <span>${question.options[key]}</span>
          `;

          optionBtn.addEventListener('click', () => {
            const currentOptions = quizOptionsContainer.querySelectorAll('.quiz-option');
            currentOptions.forEach(opt => opt.classList.remove('selected'));
            
            optionBtn.classList.add('selected');
            userAnswers[currentQuestionIndex] = key;
          });

          quizOptionsContainer.appendChild(optionBtn);
        }
      });
    }

    // Toggle navigation button styles and labels
    if (btnQuizPrev) {
      btnQuizPrev.disabled = currentQuestionIndex === 0;
    }
    
    if (btnQuizNext) {
      if (currentQuestionIndex === quizQuestions.length - 1) {
        btnQuizNext.innerHTML = 'Finalizar y Corregir 🏁';
        btnQuizNext.className = 'btn btn-accent';
      } else {
        btnQuizNext.innerHTML = 'Siguiente ➡️';
        btnQuizNext.className = 'btn';
      }
    }
  }

  // Question navigation handlers
  if (btnQuizPrev) {
    btnQuizPrev.addEventListener('click', () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
      }
    });
  }

  if (btnQuizNext) {
    btnQuizNext.addEventListener('click', () => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
      } else {
        // Evaluate and correct exam
        finishQuiz();
      }
    });
  }

  // Quiz evaluation and correction (AGE Spanish grading correction)
  const resultScore = document.getElementById('result-score');
  const resultCorrect = document.getElementById('result-correct');
  const resultIncorrect = document.getElementById('result-incorrect');
  const resultComment = document.getElementById('result-comment');

  function finishQuiz() {
    clearInterval(timerInterval);

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    quizQuestions.forEach((q, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer === undefined) {
        unanswered++;
      } else if (userAnswer === q.answer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const total = quizQuestions.length;
    // Baremación oficial AGE: acierto suma +1, error resta -0.33
    let score = (correct - (incorrect * 0.33)) / total * 10;
    if (score < 0) score = 0.0;

    // Show results view
    if (quizActiveState) quizActiveState.style.display = 'none';
    if (quizResultState) quizResultState.style.display = 'block';

    // Populate data
    if (resultScore) resultScore.textContent = `${score.toFixed(2)} / 10`;
    if (resultCorrect) resultCorrect.textContent = correct;
    if (resultIncorrect) resultIncorrect.textContent = incorrect;

    // Evaluate grade and render styled comment
    if (resultComment) {
      resultComment.className = ''; 
      if (score < 5.0) {
        resultComment.textContent = '🔴 SUSPENSO - Sigue estudiando. ¡La constancia es la clave en la oposición! Repasa el temario de leyes e inténtalo de nuevo.';
        resultComment.style.background = 'rgba(239, 68, 68, 0.12)';
        resultComment.style.color = '#f87171';
        resultComment.style.border = '1px solid rgba(239, 68, 68, 0.25)';
      } else if (score < 7.0) {
        resultComment.textContent = '🟡 APTO JUSTO - Buen trabajo, pero necesitas consolidar conocimientos para asegurar plaza. Revisa los fallos detenidamente.';
        resultComment.style.background = 'rgba(245, 158, 11, 0.12)';
        resultComment.style.color = '#fbbf24';
        resultComment.style.border = '1px solid rgba(245, 158, 11, 0.25)';
      } else if (score < 9.0) {
        resultComment.textContent = '🟢 SOBRESALIENTE - ¡Excelente nivel! Vas por muy buen camino para conseguir plaza. Sigue así y no bajes la guardia.';
        resultComment.style.background = 'rgba(16, 185, 129, 0.12)';
        resultComment.style.color = '#34d399';
        resultComment.style.border = '1px solid rgba(16, 185, 129, 0.25)';
      } else {
        resultComment.textContent = '👑 MATRÍCULA DE HONOR - ¡Espectacular! Tienes el temario totalmente dominado. Estás a nivel de número 1 de la oposición.';
        resultComment.style.background = 'rgba(168, 85, 247, 0.12)';
        resultComment.style.color = '#c084fc';
        resultComment.style.border = '1px solid rgba(168, 85, 247, 0.25)';
      }
    }

    // Cache statistical results locally
    const historyEntry = {
      date: new Date().toLocaleDateString(),
      score: score,
      correct: correct,
      incorrect: incorrect,
      total: total
    };

    let history = [];
    try {
      const stored = localStorage.getItem('gsi_quiz_history');
      if (stored) {
        history = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    history.push(historyEntry);
    localStorage.setItem('gsi_quiz_history', JSON.stringify(history));

    // Update history statistics widget view
    updateHistoryView();
  }

  // Update history widget on sidebar
  function updateHistoryView() {
    let history = [];
    try {
      const stored = localStorage.getItem('gsi_quiz_history');
      if (stored) {
        history = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }

    const totalExams = history.length;
    const historyTotal = document.getElementById('history-total');
    const historyAvg = document.getElementById('history-avg');
    const historyQuestions = document.getElementById('history-questions');

    if (historyTotal) historyTotal.textContent = totalExams;

    if (totalExams === 0) {
      if (historyAvg) historyAvg.textContent = '-- / 10';
      if (historyQuestions) historyQuestions.textContent = '0';
    } else {
      const sumScores = history.reduce((sum, entry) => sum + entry.score, 0);
      const avg = sumScores / totalExams;
      const totalQ = history.reduce((sum, entry) => sum + entry.total, 0);

      if (historyAvg) historyAvg.textContent = `${avg.toFixed(2)} / 10`;
      if (historyQuestions) historyQuestions.textContent = totalQ;
    }
  }

  // Set initial statistics on load
  updateHistoryView();

  // Retry exam simulation
  const btnQuizRetry = document.getElementById('btn-quiz-retry');
  if (btnQuizRetry) {
    btnQuizRetry.addEventListener('click', () => {
      if (quizResultState) quizResultState.style.display = 'none';
      if (quizReviewArea) quizReviewArea.style.display = 'none';
      if (quizSetupState) quizSetupState.style.display = 'block';
    });
  }

  // Review answers toggle
  const btnQuizReview = document.getElementById('btn-quiz-review');
  if (btnQuizReview) {
    btnQuizReview.addEventListener('click', () => {
      if (quizReviewArea) {
        if (quizReviewArea.style.display === 'block') {
          quizReviewArea.style.display = 'none';
        } else {
          renderReviewList();
          quizReviewArea.style.display = 'block';
          quizReviewArea.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Build correction details step-by-step list
  function renderReviewList() {
    if (!quizQuestions.length || !quizReviewList) return;
    quizReviewList.innerHTML = '';

    quizQuestions.forEach((q, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.borderLeft = '5px solid var(--glass-border)';
      card.style.marginBottom = '1.5rem';
      
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === q.answer;

      if (userAnswer === undefined) {
        card.style.borderLeftColor = 'var(--accent)';
      } else if (isCorrect) {
        card.style.borderLeftColor = 'var(--success)';
      } else {
        card.style.borderLeftColor = 'var(--error)';
      }

      let headerMeta = `Pregunta ${index + 1} (Examen Oficial GSI ${q.year} - Bloque ${q.block === 'general' ? 'General' : 'Técnico'})`;
      
      let optionsHtml = '';
      const optionKeys = ['a', 'b', 'c', 'd'];
      optionKeys.forEach(key => {
        if (q.options && q.options[key]) {
          let optionClass = 'quiz-option';
          if (key === q.answer) {
            optionClass += ' correct';
          } else if (userAnswer === key && !isCorrect) {
            optionClass += ' incorrect';
          }

          optionsHtml += `
            <div class="${optionClass}" style="cursor: default; pointer-events: none; margin-bottom: 0.5rem;">
              <span class="quiz-option-letter">${key.toUpperCase()}</span>
              <span>${q.options[key]}</span>
            </div>
          `;
        }
      });

      let feedbackHtml = '';
      if (userAnswer === undefined) {
        feedbackHtml = `<p style="color: var(--accent); font-weight: 600; font-size: 0.9rem; margin-top: 1rem;">⚠️ Pregunta no contestada. La opción correcta es la <strong>${q.answer.toUpperCase()}</strong>.</p>`;
      } else if (isCorrect) {
        feedbackHtml = `<p style="color: var(--success); font-weight: 600; font-size: 0.9rem; margin-top: 1rem;">✔️ ¡Correcto! Respondiste la <strong>${userAnswer.toUpperCase()}</strong>.</p>`;
      } else {
        feedbackHtml = `<p style="color: var(--error); font-weight: 600; font-size: 0.9rem; margin-top: 1rem;">❌ Incorrecto. Respondiste la <strong>${userAnswer.toUpperCase()}</strong>. La opción correcta es la <strong>${q.answer.toUpperCase()}</strong>.</p>`;
      }

      card.innerHTML = `
        <h3 style="margin-bottom: 0.5rem; font-size: 1.05rem; color: var(--text-muted);">${headerMeta}</h3>
        <p style="font-weight: 600; font-size: 1.05rem; line-height: 1.5; margin-bottom: 1.5rem; color: var(--text-color);">${q.question}</p>
        <div class="quiz-options">
          ${optionsHtml}
        </div>
        ${feedbackHtml}
      `;

      quizReviewList.appendChild(card);
    });
  }

});
