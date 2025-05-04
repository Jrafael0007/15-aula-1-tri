document.addEventListener('DOMContentLoaded', function() {
    // Configuração das datas
    const startDate = new Date('April 10, 2025 00:00:00').getTime();
    const endDate = new Date('December 04, 2025 23:59:59').getTime();
    
    // Elementos da contagem regressiva
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const progressBar = document.getElementById('progress-bar');
    
    // Áudio ambiente
    const ambientSound = document.getElementById('ambient-sound');
    ambientSound.volume = 0.3;
    
    // Tocar áudio quando o usuário interagir com a página
    document.body.addEventListener('click', function() {
        ambientSound.play().catch(e => console.log('Autoplay prevented:', e));
    });
    
    // Lista de objetivos
    const objectiveInput = document.getElementById('new-objective');
    const addBtn = document.getElementById('add-btn');
    const objectiveList = document.getElementById('objective-list');
    
    // Carregar objetivos do localStorage
    let objectives = JSON.parse(localStorage.getItem('fnaf-objectives')) || [];
    
    // Atualizar lista de objetivos
    function updateObjectivesList() {
        objectiveList.innerHTML = '';
        objectives.forEach((obj, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${obj}</span>
                <button class="remove-btn" data-index="${index}">REMOVER</button>
            `;
            objectiveList.appendChild(li);
        });
        
        // Adicionar event listeners aos botões de remover
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                objectives.splice(index, 1);
                localStorage.setItem('fnaf-objectives', JSON.stringify(objectives));
                updateObjectivesList();
                
                // Efeito sonoro
                const sound = new Audio('https://www.myinstants.com/media/sounds/fnaf-jumpscare.mp3');
                sound.volume = 0.2;
                sound.play();
            });
        });
    }
    
    // Adicionar novo objetivo
    addBtn.addEventListener('click', function() {
        if (objectiveInput.value.trim() !== '') {
            objectives.push(objectiveInput.value.trim());
            localStorage.setItem('fnaf-objectives', JSON.stringify(objectives));
            objectiveInput.value = '';
            updateObjectivesList();
            
            // Efeito sonoro
            const sound = new Audio('https://www.myinstants.com/media/sounds/fnaf-2-sound-effect.mp3');
            sound.volume = 0.3;
            sound.play();
        }
    });
    
    // Adicionar com Enter
    objectiveInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });
    
    // Inicializar lista de objetivos
    updateObjectivesList();
    
    // Atualizar contagem regressiva
    function updateCountdown() {
        const now = new Date().getTime();
        
        // Calcular tempo restante
        let timeRemaining;
        let totalDuration = endDate - startDate;
        
        if (now < startDate) {
            // Antes da data de início
            timeRemaining = startDate - now;
            document.querySelector('.countdown-container h2').textContent = 'SEUS OBJETIVOS ESTÃO PRESTES A COMEÇAR';
        } else if (now > endDate) {
            // Depois da data final
            timeRemaining = 0;
            document.querySelector('.countdown-container h2').textContent = 'SEUS OBJETIVOS FORAM ALCANÇADOS!';
        } else {
            // Durante o período
            timeRemaining = endDate - now;
            document.querySelector('.countdown-container h2').textContent = 'SEUS OBJETIVOS ESTÃO MAIS PRÓXIMOS DO QUE PARECEM';
        }
        
        // Calcular dias, horas, minutos e segundos
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Atualizar elementos HTML
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        // Atualizar barra de progresso
        if (now >= startDate && now <= endDate) {
            const elapsed = now - startDate;
            const progress = (elapsed / totalDuration) * 100;
            progressBar.style.width = `${progress}%`;
        } else if (now < startDate) {
            progressBar.style.width = '0%';
        } else {
            progressBar.style.width = '100%';
        }
        
        // Efeitos visuais aleatórios
        if (Math.random() < 0.01) {
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 100);
        }
    }
    
    // Atualizar a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Efeitos aleatórios dos personagens
    setInterval(() => {
        if (Math.random() < 0.05) {
            const characters = document.querySelectorAll('.character');
            const randomChar = characters[Math.floor(Math.random() * characters.length)];
            
            randomChar.style.transform = 'scale(1.1)';
            randomChar.style.boxShadow = '0 0 20px #ff0000';
            
            setTimeout(() => {
                randomChar.style.transform = '';
                randomChar.style.boxShadow = '';
            }, 500);
        }
    }, 3000);
    
    // Efeito de digitação nos objetivos SMART
    const smartDescriptions = document.querySelectorAll('.smart-desc');
    const originalTexts = [];
    
    smartDescriptions.forEach(desc => {
        originalTexts.push(desc.textContent);
        desc.textContent = '';
    });
    
    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeWriter(element, text, i + 1), 50);
        }
    }
    
    setTimeout(() => {
        smartDescriptions.forEach((desc, index) => {
            typeWriter(desc, originalTexts[index]);
        });
    }, 1500);
});