// Estado global de la aplicación
let questionsPool = [];          // Todas las preguntas cargadas desde questions_db.js
let currentTestQuestions = [];   // Las 100 preguntas elegidas para el examen actual
let userAnswers = {};            // Respuestas del usuario { indice_pregunta: 'letra' }
let examMode = true;             // true = Modo Examen (tiempo, feedback al final), false = Modo Práctica (feedback inmediato)
let testGraded = false;          // Indica si el examen ya ha sido corregido y entregado
let timerInterval = null;        // Referencia del intervalo del temporizador
let timeRemaining = 6000;        // Tiempo restante en segundos (100 minutos estándar)
const EXAM_DURATION = 6000;      // 100 minutos en segundos

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar preguntas de la base de datos
    if (typeof questionsData !== "undefined" && Array.isArray(questionsData)) {
        questionsPool = questionsData;
        console.log(`Base de datos cargada: ${questionsPool.length} preguntas.`);
    } else {
        showToast("Error: No se pudo cargar la base de datos de preguntas.", "error");
        renderEmptyState();
        return;
    }
    
    // 2. Escuchar eventos de la interfaz
    setupEventListeners();
    
    // 3. Generar el primer examen automático
    generateNewTest();
});

// Configurar los listeners para botones y controles
function setupEventListeners() {
    // Alternar modos (Examen vs Práctica)
    document.getElementById("mode-examen-btn").addEventListener("click", () => setExamMode(true));
    document.getElementById("mode-practica-btn").addEventListener("click", () => setExamMode(false));
    
    // Botón de regenerar examen
    document.getElementById("regenerate-btn").addEventListener("click", () => {
        if (!testGraded && Object.keys(userAnswers).length > 0) {
            if (confirm("¿Estás seguro de que quieres regenerar el examen? Perderás tu progreso actual.")) {
                generateNewTest();
            }
        } else {
            generateNewTest();
        }
    });
    
    // Botón de entregar examen
    document.getElementById("submit-btn").addEventListener("click", () => {
        deliverExam();
    });
    
    // Botón de reiniciar respuestas
    document.getElementById("reset-btn").addEventListener("click", () => {
        if (confirm("¿Estás seguro de que quieres borrar todas tus respuestas de este test?")) {
            resetCurrentAnswers();
        }
    });
    
    // Botones del modal de resultados
    document.getElementById("modal-review-btn").addEventListener("click", () => {
        closeResultsModal();
        showToast("Revisando examen. Las respuestas correctas están resaltadas en verde.", "info");
    });
    
    document.getElementById("modal-new-btn").addEventListener("click", () => {
        closeResultsModal();
        generateNewTest();
    });
}

// Cambiar el modo de simulación
function setExamMode(isExam) {
    if (examMode === isExam) return;
    
    if (Object.keys(userAnswers).length > 0 && !testGraded) {
        if (!confirm("Cambiar de modo restablecerá el examen actual. ¿Deseas continuar?")) {
            return;
        }
    }
    
    examMode = isExam;
    
    // Actualizar botones de la interfaz
    if (examMode) {
        document.getElementById("mode-examen-btn").classList.add("active");
        document.getElementById("mode-practica-btn").classList.remove("active");
        document.getElementById("timer-container").style.display = "flex";
        document.getElementById("submit-btn").style.display = "inline-flex";
    } else {
        document.getElementById("mode-practica-btn").classList.add("active");
        document.getElementById("mode-examen-btn").classList.remove("active");
        document.getElementById("timer-container").style.display = "none";
        document.getElementById("submit-btn").style.display = "none";
    }
    
    generateNewTest();
    showToast(examMode ? "Modo Examen activado (100 min, feedback al entregar)" : "Modo Práctica activado (feedback inmediato, sin tiempo)", "info");
}

// Genera un examen de 100 preguntas respetando la regla 30% general, 70% específico
function generateNewTest() {
    testGraded = false;
    userAnswers = {};
    
    // Separar preguntas por bloques
    const generalQuestions = questionsPool.filter(q => q.block === "general");
    const specificQuestions = questionsPool.filter(q => q.block === "especifico");
    
    console.log(`Pool General: ${generalQuestions.length}, Pool Específico: ${specificQuestions.length}`);
    
    if (generalQuestions.length < 30 || specificQuestions.length < 70) {
        showToast("Error: No hay suficientes preguntas en la base de datos para cumplir los pesos (30 General / 70 Específico).", "error");
        renderEmptyState();
        return;
    }
    
    // Obtener 30 aleatorias de General
    const selectedGeneral = getRandomElements(generalQuestions, 30);
    // Obtener 70 aleatorias de Específico
    const selectedSpecific = getRandomElements(specificQuestions, 70);
    
    // Combinar y guardar
    currentTestQuestions = [...selectedGeneral, ...selectedSpecific];
    
    // Reiniciar temporizador
    clearInterval(timerInterval);
    if (examMode) {
        timeRemaining = EXAM_DURATION;
        updateTimerDisplay();
        startTimer();
    }
    
    // Renderizar
    renderDashboard();
    renderQuestionsList();
    renderQuestionsGrid();
    
    // Desplazar al inicio
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    showToast("¡Nuevo examen generado! 30% General y 70% Específico.", "success");
}

// Restablece las respuestas del examen actual
function resetCurrentAnswers() {
    userAnswers = {};
    testGraded = false;
    
    // Si es modo examen, reiniciar timer también
    if (examMode) {
        clearInterval(timerInterval);
        timeRemaining = EXAM_DURATION;
        updateTimerDisplay();
        startTimer();
    }
    
    renderDashboard();
    renderQuestionsList();
    renderQuestionsGrid();
    showToast("Respuestas limpiadas. Examen reiniciado.", "info");
}

// Obtener elementos aleatorios de un array sin repetir
function getRandomElements(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Inicia el temporizador
function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        // Alerta cuando quedan menos de 5 minutos
        if (timeRemaining === 300) {
            document.getElementById("timer-container").classList.add("danger");
            showToast("¡Atención! Quedan menos de 5 minutos para finalizar el examen.", "warning");
        }
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            finishExamAutomatic();
        }
    }, 1000);
}

// Actualiza el texto del reloj
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const secondsStr = seconds < 10 ? "0" + seconds : seconds;
    
    document.getElementById("timer-value").textContent = `${minutesStr}:${secondsStr}`;
}

// Finaliza el examen automáticamente al agotarse el tiempo
function finishExamAutomatic() {
    showToast("¡Tiempo agotado! Tu examen se entregará automáticamente.", "warning");
    deliverExam(true);
}

// Entrega y corrige el examen
function deliverExam(force = false) {
    if (testGraded) {
        showToast("Este examen ya ha sido entregado y calificado.", "warning");
        return;
    }
    
    const answeredCount = Object.keys(userAnswers).length;
    
    if (!force && answeredCount < 100) {
        const confirmDelivery = confirm(`Has respondido ${answeredCount} de 100 preguntas. ¿Estás seguro de que quieres entregar el examen? Las preguntas no respondidas contarán como 0 puntos.`);
        if (!confirmDelivery) return;
    }
    
    clearInterval(timerInterval);
    testGraded = true;
    
    // Calcular resultados
    let correct = 0;
    let incorrect = 0;
    
    currentTestQuestions.forEach((q, idx) => {
        const userAnswer = userAnswers[idx];
        if (userAnswer) {
            if (userAnswer === q.answer) {
                correct++;
            } else {
                incorrect++;
            }
        }
    });
    
    const blank = 100 - correct - incorrect;
    
    // Fórmula de puntuación oficial: Aciertos - (Errores * 0.33)
    const rawScore = correct - (incorrect * 0.33);
    const finalScore = Math.max(0, parseFloat(rawScore.toFixed(2)));
    
    // Nota sobre 10
    const grade = parseFloat((finalScore / 10).toFixed(2));
    const aprobado = finalScore >= 50;
    
    // Actualizar Modal de Resultados
    document.getElementById("modal-score-grade").textContent = grade.toFixed(2);
    
    const badge = document.getElementById("modal-status-badge");
    if (aprobado) {
        badge.textContent = "¡APROBADO!";
        badge.className = "results-badge aprobado";
    } else {
        badge.textContent = "SUSPENSO";
        badge.className = "results-badge suspenso";
    }
    
    document.getElementById("modal-stat-correct").textContent = correct;
    document.getElementById("modal-stat-incorrect").textContent = incorrect;
    document.getElementById("modal-stat-score").textContent = finalScore.toFixed(2);
    
    // Dibujar el círculo de progreso animado
    const progressCircle = document.getElementById("modal-circle-progress");
    // El stroke-dasharray del círculo es 440 (perímetro con r=70: 2 * pi * 70 = 440 aprox)
    const dashOffset = 440 - (440 * (finalScore / 100));
    
    // Retrasar un poco la animación del círculo para que se aprecie al abrir el modal
    setTimeout(() => {
        progressCircle.style.strokeDashoffset = dashOffset;
    }, 300);
    
    // Mostrar modal
    document.getElementById("results-modal").classList.add("active");
    
    // Actualizar interfaz para mostrar las respuestas correctas/incorrectas
    renderDashboard();
    renderQuestionsList();
    renderQuestionsGrid();
}

// Cierra el modal de resultados
function closeResultsModal() {
    document.getElementById("results-modal").classList.remove("active");
}

// Renderiza los contadores y barras de progreso del Dashboard superior
function renderDashboard() {
    const answeredCount = Object.keys(userAnswers).length;
    document.getElementById("dashboard-answered").textContent = `${answeredCount} / 100`;
    
    // Progreso general
    const progressGeneral = (answeredCount / 100) * 100;
    document.getElementById("dashboard-progress-bar").style.width = `${progressGeneral}%`;
    
    // Contar por bloques
    let generalAnswered = 0;
    let specificAnswered = 0;
    
    currentTestQuestions.forEach((q, idx) => {
        if (userAnswers[idx]) {
            if (q.block === "general") generalAnswered++;
            else specificAnswered++;
        }
    });
    
    document.getElementById("dashboard-general").textContent = `${generalAnswered} / 30`;
    const progressGen = (generalAnswered / 30) * 100;
    document.getElementById("dashboard-progress-gen").style.width = `${progressGen}%`;
    
    document.getElementById("dashboard-specific").textContent = `${specificAnswered} / 70`;
    const progressSpec = (specificAnswered / 70) * 100;
    document.getElementById("dashboard-progress-spec").style.width = `${progressSpec}%`;
    
    // Si el examen está corregido, mostrar la nota en vivo en el dashboard
    const scoreCard = document.getElementById("stat-score-card");
    if (testGraded) {
        let correct = 0;
        let incorrect = 0;
        currentTestQuestions.forEach((q, idx) => {
            const userAnswer = userAnswers[idx];
            if (userAnswer) {
                if (userAnswer === q.answer) correct++;
                else incorrect++;
            }
        });
        const finalScore = Math.max(0, correct - (incorrect * 0.33));
        document.getElementById("dashboard-score-val").textContent = `${finalScore.toFixed(2)} pts`;
        document.getElementById("dashboard-score-label").textContent = `Nota Final (${(finalScore / 10).toFixed(2)}/10)`;
    } else {
        document.getElementById("dashboard-score-val").textContent = examMode ? "--" : "Inmediato";
        document.getElementById("dashboard-score-label").textContent = examMode ? "Calificación" : "Práctica Activa";
    }
}

// Renderiza la lista completa de las 100 preguntas
function renderQuestionsList() {
    const container = document.getElementById("questions-list");
    container.innerHTML = "";
    
    currentTestQuestions.forEach((q, idx) => {
        const card = document.createElement("div");
        card.className = "question-card";
        card.id = `q-card-${idx}`;
        
        // Determinar badges
        const blockText = q.block === "general" ? "Temas Generales (Bloque I)" : "Temas Específicos (Bloques II-IV)";
        const blockClass = q.block === "general" ? "badge-general" : "badge-specific";
        
        let badgesHtml = `
            <span class="badge ${blockClass}">${blockText}</span>
            <span class="badge badge-year">Año ${q.year}</span>
        `;
        
        if (q.is_reserve) {
            badgesHtml += `<span class="badge" style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa;">Pregunta Reserva</span>`;
        }
        
        // Si la pregunta está marcada como importante (repetida en varios años)
        if (q.important) {
            badgesHtml += `<span class="badge badge-important"><i class="fas fa-star"></i> Pregunta Frecuente</span>`;
        }
        
        // Texto de la pregunta
        const questionTextHtml = `${idx + 1}. ${q.question}`;
        
        // Renderizar opciones
        let optionsHtml = "";
        const optionKeys = ['a', 'b', 'c', 'd'];
        
        optionKeys.forEach(key => {
            const optionText = q.options[key];
            if (!optionText) return;
            
            const isSelected = userAnswers[idx] === key;
            let optionClass = isSelected ? "selected" : "";
            
            // Si el examen está entregado y corregido, o estamos en Modo Práctica
            if (testGraded || (!examMode && userAnswers[idx])) {
                if (key === q.answer) {
                    // Esta es la correcta
                    optionClass = "correct";
                } else if (isSelected && userAnswerIsNotCorrect(idx, q.answer)) {
                    // Esta fue elegida incorrectamente
                    optionClass = "incorrect";
                } else if (!isSelected && isSelectedAnswerWrong(idx, q.answer) && key === q.answer) {
                    // Si el usuario falló, marcamos la correcta que debió elegir
                    optionClass = "correct-answer-missed";
                }
            }
            
            optionsHtml += `
                <div class="option-item ${optionClass}" onclick="selectOption(${idx}, '${key}')">
                    <div class="option-marker">${key}</div>
                    <div class="option-content">${escapeHTML(optionText)}</div>
                </div>
            `;
        });
        
        card.innerHTML = `
            <div class="q-card-header">
                <span class="q-number-badge">Pregunta ${idx + 1}</span>
                <div class="q-badges">
                    ${badgesHtml}
                </div>
            </div>
            <h2 class="q-text">${escapeHTML(questionTextHtml)}</h2>
            <div class="options-list">
                ${optionsHtml}
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Helpers para clases de opciones
function userAnswerIsNotCorrect(qIdx, correctAns) {
    return userAnswers[qIdx] !== correctAns;
}

function isSelectedAnswerWrong(qIdx, correctAns) {
    return userAnswers[qIdx] && userAnswers[qIdx] !== correctAns;
}

// Renderiza la cuadrícula de navegación rápida de la barra lateral
function renderQuestionsGrid() {
    const grid = document.getElementById("questions-grid");
    grid.innerHTML = "";
    
    currentTestQuestions.forEach((q, idx) => {
        const item = document.createElement("a");
        item.href = `#q-card-${idx}`;
        item.className = "grid-item";
        item.textContent = idx + 1;
        
        // Manejar clics para scroll suave y foco visual
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.getElementById(`q-card-${idx}`);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "center" });
                
                // Efecto de parpadeo visual en la tarjeta
                target.classList.add("active-target");
                setTimeout(() => {
                    target.classList.remove("active-target");
                }, 1500);
            }
        });
        
        // Estilos según el estado
        if (userAnswers[idx]) {
            item.classList.add("answered");
            
            // Si el examen está corregido, o estamos en Modo Práctica
            if (testGraded || (!examMode && userAnswers[idx])) {
                if (userAnswers[idx] === q.answer) {
                    item.classList.add("correct");
                } else {
                    item.classList.add("incorrect");
                }
            }
        }
        
        if (q.important) {
            item.classList.add("important");
        }
        
        grid.appendChild(item);
    });
}

// Selecciona una opción en una pregunta
function selectOption(qIdx, optionKey) {
    if (testGraded) {
        showToast("El examen ya ha sido entregado. Genera uno nuevo para volver a jugar.", "warning");
        return;
    }
    
    // En modo práctica, si ya respondió, no dejamos cambiar (para incentivar el aprendizaje directo)
    if (!examMode && userAnswers[qIdx]) {
        return;
    }
    
    // Guardar respuesta
    userAnswers[qIdx] = optionKey;
    
    // Si estamos en Modo Práctica, lanzamos un feedback auditivo/visual inmediato
    if (!examMode) {
        const q = currentTestQuestions[qIdx];
        if (optionKey === q.answer) {
            showToast(`¡Pregunta ${qIdx + 1} Correcta!`, "success");
        } else {
            showToast(`Pregunta ${qIdx + 1} Incorrecta. Era la: ${q.answer.toUpperCase()}`, "error");
        }
    }
    
    // Re-renderizar elementos afectados para optimizar rendimiento
    renderDashboard();
    renderQuestionsGrid();
    
    // Actualizar visualmente solo la tarjeta seleccionada (evita renderizar las 100 tarjetas completas)
    const card = document.getElementById(`q-card-${qIdx}`);
    if (card) {
        const optionItems = card.querySelectorAll(".option-item");
        const optionKeys = ['a', 'b', 'c', 'd'];
        const q = currentTestQuestions[qIdx];
        
        optionItems.forEach((item, idx_opt) => {
            const key = optionKeys[idx_opt];
            const isSelected = key === optionKey;
            
            item.className = "option-item";
            if (isSelected) item.classList.add("selected");
            
            // Modo Práctica: aplicar colores correct/incorrect inmediatos
            if (!examMode) {
                if (key === q.answer) {
                    item.classList.add("correct");
                } else if (isSelected && key !== q.answer) {
                    item.classList.add("incorrect");
                } else if (!isSelected && key === q.answer) {
                    item.classList.add("correct-answer-missed");
                }
            }
        });
    }
}

// Muestra notificaciones flotantes premium
function showToast(message, type = "info") {
    const toast = document.getElementById("toast-notification");
    const icon = toast.querySelector("i");
    const text = toast.querySelector("span");
    
    text.textContent = message;
    
    // Limpiar clases previas
    toast.className = "toast";
    icon.className = "fas";
    
    if (type === "success") {
        toast.style.borderLeft = "4px solid var(--success)";
        icon.classList.add("fa-check-circle", "text-success");
    } else if (type === "error") {
        toast.style.borderLeft = "4px solid var(--error)";
        icon.classList.add("fa-times-circle", "text-error");
    } else if (type === "warning") {
        toast.style.borderLeft = "4px solid var(--warning)";
        icon.classList.add("fa-exclamation-triangle", "text-warning");
    } else {
        toast.style.borderLeft = "4px solid var(--primary)";
        icon.classList.add("fa-info-circle");
        icon.style.color = "var(--primary)";
    }
    
    toast.classList.add("show");
    
    // Ocultar a los 3.5 segundos
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

// Renderiza un estado vacío si no se cargó la BD
function renderEmptyState() {
    const container = document.getElementById("questions-list");
    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-database empty-state-icon"></i>
            <h3>No se encontraron preguntas</h3>
            <p>Por favor, asegúrate de que el archivo 'questions_db.js' esté en la misma carpeta y se cargue correctamente.</p>
        </div>
    `;
}

// Helper para escapar HTML y prevenir XSS
function escapeHTML(str) {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
