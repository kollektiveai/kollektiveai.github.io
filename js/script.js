       // Переменные для toggle модели
        let isFirstModel = true;
        const firstModelUrl = "https://tripreport.github.io/3D/1IEP_mol.glb";
        const secondModelUrl = "https://tripreport.github.io/3D/test_mol.glb";
        
        // Данные для инвентаря атомов
        const atomsInventory = [
            { symbol: 'H', name: 'Водород', charge: '+', hybridization: 's', type: 'donor', progress: 85, enabled: true },
            { symbol: 'C', name: 'Углерод', charge: '', hybridization: 'sp³', type: 'neutral', progress: 70, enabled: true },
            { symbol: 'N', name: 'Азот', charge: '-', hybridization: 'sp²', type: 'acceptor', progress: 60, enabled: true },
            { symbol: 'O', name: 'Кислород', charge: '-', hybridization: 'sp²', type: 'acceptor', progress: 90, enabled: true },
            { symbol: 'F', name: 'Фтор', charge: '-', hybridization: 'sp³', type: 'acceptor', progress: 45, enabled: true },
            { symbol: 'Cl', name: 'Хлор', charge: '', hybridization: 'sp³', type: 'neutral', progress: 30, enabled: true },
            { symbol: 'S', name: 'Сера', charge: '', hybridization: 'sp²', type: 'neutral', progress: 55, enabled: true },
            { symbol: 'P', name: 'Фосфор', charge: '+', hybridization: 'sp³', type: 'donor', progress: 40, enabled: true },
            { symbol: 'Na', name: 'Натрий', charge: '+', hybridization: 's', type: 'donor', progress: 25, enabled: false },
            { symbol: 'K', name: 'Калий', charge: '+', hybridization: 's', type: 'donor', progress: 20, enabled: false },
            { symbol: 'Mg', name: 'Магний', charge: '2+', hybridization: 's', type: 'donor', progress: 35, enabled: true },
            { symbol: 'Ca', name: 'Кальций', charge: '2+', hybridization: 's', type: 'donor', progress: 15, enabled: false },
            { symbol: 'Fe', name: 'Железо', charge: '2+', hybridization: 'd²sp³', type: 'donor', progress: 10, enabled: false },
            { symbol: 'Zn', name: 'Цинк', charge: '2+', hybridization: 'sp³', type: 'donor', progress: 50, enabled: true },
            { symbol: 'Br', name: 'Бром', charge: '', hybridization: 'sp³', type: 'neutral', progress: 65, enabled: true },
            { symbol: 'I', name: 'Йод', charge: '', hybridization: 'sp³', type: 'neutral', progress: 75, enabled: true },
            { symbol: 'Si', name: 'Кремний', charge: '', hybridization: 'sp³', type: 'neutral', progress: 30, enabled: false },
            { symbol: 'B', name: 'Бор', charge: '', hybridization: 'sp²', type: 'neutral', progress: 20, enabled: false },
            { symbol: 'Li', name: 'Литий', charge: '+', hybridization: 's', type: 'donor', progress: 10, enabled: false },
            { symbol: 'Pb', name: 'Свинец', charge: '2+', hybridization: 'sp³', type: 'donor', progress: 5, enabled: false }
        ];
        
        // Данные для GIT таймлайна
        const gitTimelineData = [
            { 
                hash: 'a1b2c3d',
                message: 'Структура определена', 
                details: '3D модель молекулы построена на основе данных PDB',
                author: 'Иван Петров',
                time: '2 часа назад',
                status: 'completed'
            },
            { 
                hash: 'e4f5g6h',
                message: 'Атомы подобраны', 
                details: 'Все необходимые химические элементы доступны в инвентаре',
                author: 'Мария Смирнова',
                time: '1 час назад',
                status: 'completed'
            },
            { 
                hash: 'i7j8k9l',
                message: 'Связи проверены', 
                details: 'Стабильность молекулярных связей подтверждена квантово-химическими расчетами',
                author: 'Алексей Волков',
                time: '30 минут назад',
                status: 'active'
            },
            { 
                hash: 'm0n1o2p',
                message: 'Синтез возможен', 
                details: 'Молекула готова к лабораторному синтезу, ожидание подтверждения',
                author: 'Екатерина Новикова',
                time: '15 минут назад',
                status: 'pending'
            },
            { 
                hash: 'q3r4s5t',
                message: 'Готов к производству', 
                details: 'Можно начинать синтез',
                author: 'Дмитрий Козлов',
                time: 'только что',
                status: 'pending'
            }
        ];
        
        // Инициализация инвентаря атомов
        function initAtomInventory() {
            const atomGrid = document.getElementById('atom-grid');
            
            atomsInventory.forEach((atom, index) => {
                const atomCell = document.createElement('div');
                atomCell.className = `atom-cell ${atom.type} ${atom.enabled ? '' : 'disabled'}`;
                atomCell.title = `${atom.name} (${atom.symbol})${atom.enabled ? '' : ' - недоступен'}`;
                atomCell.dataset.index = index;
                
                atomCell.innerHTML = `
                    ${atom.charge ? `<div class="charge-indicator">${atom.charge}</div>` : ''}
                    <div class="element-symbol">${atom.symbol}</div>
                    <div class="hybridization">${atom.hybridization}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${atom.progress}%"></div>
                    </div>
                `;
                
                if (atom.enabled) {
                    atomCell.addEventListener('click', () => {
                        handleAtomClick(atom);
                    });
                }
                
                atomGrid.appendChild(atomCell);
            });
        }
        
        // Инициализация GIT таймлайна
        function initGitTimeline() {
            const gitTimeline = document.getElementById('git-timeline');
            
            gitTimelineData.forEach((item, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.className = `git-timeline-item ${item.status}`;
                timelineItem.dataset.hash = item.hash;
                
                timelineItem.innerHTML = `
                    <div class="git-timeline-marker"></div>
                    <div class="git-timeline-branch"></div>
                    <div class="git-timeline-content">
                        <div class="git-timeline-commit">
                            <span class="git-commit-hash">${item.hash.substring(0, 7)}</span>
                            <span>${item.time}</span>
                        </div>
                        <div class="git-timeline-message">${item.message}</div>
                        <div class="git-timeline-details">${item.details}</div>
                        <div class="git-timeline-meta">
                            <div class="git-author">
                                <div class="git-author-avatar"></div>
                                <span>${item.author}</span>
                            </div>
                            <div class="git-status">${getStatusText(item.status)}</div>
                        </div>
                    </div>
                `;
                
                // Добавляем обработчик клика
                timelineItem.addEventListener('click', () => {
                    handleTimelineItemClick(item, timelineItem);
                });
                
                gitTimeline.appendChild(timelineItem);
            });
        }
        
        // Получение текста статуса
        function getStatusText(status) {
            const statusMap = {
                'completed': 'Завершено',
                'active': 'В процессе',
                'pending': 'Ожидание'
            };
            return statusMap[status] || status;
        }
        
        // Обработка клика по элементу таймлайна
        function handleTimelineItemClick(item, element) {
            console.log(`Выбран коммит: ${item.hash} - ${item.message}`);
            
            // Визуальная обратная связь
            element.style.transform = 'translateX(5px)';
            setTimeout(() => {
                element.style.transform = '';
            }, 200);
            
            // Показываем уведомление
            showNotification(`Коммит ${item.hash.substring(0, 7)}: ${item.message}`);
        }
        
        // Обработка клика по атому
        function handleAtomClick(atom) {
            console.log(`Выбран атом: ${atom.name} (${atom.symbol})`);
            
            // Временная обратная связь
            const atomElement = document.querySelector(`.atom-cell[title*="${atom.name}"]`);
            if (atomElement) {
                atomElement.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    atomElement.style.transform = '';
                }, 200);
            }
            
            // Обновление поля ввода с символом атома
            const chatInput = document.querySelector('.chat-input');
            const currentText = chatInput.value;
            chatInput.value = currentText + (currentText ? ' ' : '') + atom.symbol;
            
            // Фокус на поле ввода
            chatInput.focus();
            
            // Обновляем таймлайн
            updateGitTimeline();
        }
        
        // Обновление GIT таймлайна
        function updateGitTimeline() {
            const timelineItems = document.querySelectorAll('.git-timeline-item');
            
            // Случайным образом обновляем статусы
            const statuses = ['completed', 'active', 'pending'];
            
            timelineItems.forEach((item, index) => {
                // Сброс всех классов статусов
                item.classList.remove('completed', 'active', 'pending');
                
                // Определяем новый статус
                let newStatus;
                if (index < 2) {
                    newStatus = 'completed';
                } else if (index === 2) {
                    newStatus = 'active';
                } else {
                    // Для последних элементов случайный статус, но чаще pending
                    newStatus = Math.random() > 0.3 ? 'pending' : 
                                (Math.random() > 0.5 ? 'completed' : 'active');
                }
                
                item.classList.add(newStatus);
                
                // Обновляем текст статуса
                const statusElement = item.querySelector('.git-status');
                if (statusElement) {
                    statusElement.textContent = getStatusText(newStatus);
                }
            });
            
            // Обновляем энергию связывания
            const energies = ['-12.5', '-13.2', '-11.8', '-12.9', '-13.5', '-14.1'];
            const randomEnergy = energies[Math.floor(Math.random() * energies.length)];
            document.querySelector('.energy-value').textContent = `${randomEnergy} ккал/моль`;
            
            // Анимация обновления
            const energyDisplay = document.querySelector('.energy-display');
            energyDisplay.style.transform = 'translateX(-50%) scale(1.05)';
            setTimeout(() => {
                energyDisplay.style.transform = 'translateX(-50%) scale(1)';
            }, 300);
        }
        
        // Обработка боковых панелей
        const leftPanel = document.getElementById('left-panel');
        const rightPanel = document.getElementById('right-panel');
        const leftPanelToggle = document.getElementById('left-panel-toggle');
        const rightPanelToggle = document.getElementById('right-panel-toggle');
        
        // Переменные для отслеживания состояния панелей
        let leftPanelOpen = false;
        let rightPanelOpen = false;
        
        // Открытие/закрытие левой панели
        leftPanelToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            leftPanelOpen = !leftPanelOpen;
            
            if (leftPanelOpen) {
                leftPanel.classList.add('open');
                leftPanelToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
            } else {
                leftPanel.classList.remove('open');
                leftPanelToggle.innerHTML = '<i class="fas fa-chevron-right"></i>';
            }
        });
        
        // Открытие/закрытие правой панели
        rightPanelToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            rightPanelOpen = !rightPanelOpen;
            
            if (rightPanelOpen) {
                rightPanel.classList.add('open');
                rightPanelToggle.innerHTML = '<i class="fas fa-chevron-right"></i>';
            } else {
                rightPanel.classList.remove('open');
                rightPanelToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
            }
        });
        
        // Функция для показа уведомлений
        function showNotification(message) {
            // Создаем элемент уведомления
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: rgba(120, 190, 32, 0.9);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                z-index: 1000;
                font-size: 14px;
                animation: slideIn 0.3s ease;
            `;
            
            // Добавляем CSS для анимации
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            notification.textContent = message;
            document.body.appendChild(notification);
            
            // Удаляем уведомление через 3 секунды
            setTimeout(() => {
                notification.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }
        
        // Обработка модального окна справки
        const helpButton = document.getElementById('help-button');
        const helpModalOverlay = document.getElementById('help-modal-overlay');
        const helpModalClose = document.getElementById('help-modal-close');
        
        // Открытие модального окна справки
        helpButton.addEventListener('click', () => {
            helpModalOverlay.classList.add('active');
        });
        
        // Закрытие модального окна справки при клике на крестик
        helpModalClose.addEventListener('click', () => {
            helpModalOverlay.classList.remove('active');
        });
        
        // Закрытие модального окна справки при клике на оверлей
        helpModalOverlay.addEventListener('click', (e) => {
            if (e.target === helpModalOverlay) {
                helpModalOverlay.classList.remove('active');
            }
        });
        
        // Обработка модального окна настроек
        const settingsButton = document.getElementById('settings-button');
        const settingsModalOverlay = document.getElementById('settings-modal-overlay');
        const settingsModalClose = document.getElementById('settings-modal-close');
        
        // Открытие модального окна настроек
        settingsButton.addEventListener('click', () => {
            settingsModalOverlay.classList.add('active');
        });
        
        // Закрытие модального окна настроек при клике на крестик
        settingsModalClose.addEventListener('click', () => {
            settingsModalOverlay.classList.remove('active');
        });
        
        // Закрытие модального окна настроек при клике на оверлей
        settingsModalOverlay.addEventListener('click', (e) => {
            if (e.target === settingsModalOverlay) {
                settingsModalOverlay.classList.remove('active');
            }
        });
        
        // Закрытие всех модальных окон при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                helpModalOverlay.classList.remove('active');
                settingsModalOverlay.classList.remove('active');
            }
        });
        
        // Обработка кнопки генерации молекулы
        const generateButton = document.getElementById('generate-button');
        const chatInput = document.querySelector('.chat-input');
        const moleculeViewer = document.getElementById('molecule-viewer');
        
        generateButton.addEventListener('click', () => {
            if (chatInput.value.trim()) {
                // Анимация кнопки
                const originalIcon = generateButton.innerHTML;
                generateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                generateButton.disabled = true;
                
                // Toggle механика: меняем модель при каждом вводе промпта
                setTimeout(() => {
                    if (isFirstModel) {
                        moleculeViewer.src = secondModelUrl;
                        console.log('Переключено на тестовую модель');
                        isFirstModel = false;
                    } else {
                        moleculeViewer.src = firstModelUrl;
                        console.log('Переключено на основную модель');
                        isFirstModel = true;
                    }
                    
                    // Показываем уведомление в консоли
                    const modelName = isFirstModel ? "Киназный домен c-Abl + STI-571" : "Тестовая молекула";
                    console.log(`Модель переключена на: ${modelName} по промпту: "${chatInput.value}"`);
                    
                    // Добавляем новый коммит в GIT таймлайн
                    addNewGitCommit(chatInput.value);
                    
                    // Очищаем поле ввода
                    chatInput.value = '';
                    
                    // Обновляем таймлайн
                    updateGitTimeline();
                    
                    // Возвращаем иконку
                    generateButton.innerHTML = originalIcon;
                    generateButton.disabled = false;
                    
                    // Показываем уведомление
                    showNotification('Молекула сгенерирована успешно!');
                }, 500);
            } else {
                showNotification('Введите промпт для генерации молекулы');
            }
        });
        
        // Добавление нового коммита в GIT таймлайн
        function addNewGitCommit(prompt) {
            const gitTimeline = document.getElementById('git-timeline');
            const newCommit = {
                hash: generateRandomHash(),
                message: `Сгенерирована новая молекула`,
                details: `По промпту: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`,
                author: 'ИИ-ассистент',
                time: 'только что',
                status: 'active'
            };
            
            const timelineItem = document.createElement('div');
            timelineItem.className = `git-timeline-item ${newCommit.status}`;
            timelineItem.dataset.hash = newCommit.hash;
            
            timelineItem.innerHTML = `
                <div class="git-timeline-marker"></div>
                <div class="git-timeline-branch"></div>
                <div class="git-timeline-content">
                    <div class="git-timeline-commit">
                        <span class="git-commit-hash">${newCommit.hash.substring(0, 7)}</span>
                        <span>${newCommit.time}</span>
                    </div>
                    <div class="git-timeline-message">${newCommit.message}</div>
                    <div class="git-timeline-details">${newCommit.details}</div>
                    <div class="git-timeline-meta">
                        <div class="git-author">
                            <div class="git-author-avatar"></div>
                            <span>${newCommit.author}</span>
                        </div>
                        <div class="git-status">${getStatusText(newCommit.status)}</div>
                    </div>
                </div>
            `;
            
            // Добавляем в начало таймлайна
            gitTimeline.insertBefore(timelineItem, gitTimeline.firstChild);
            
            // Ограничиваем количество коммитов
            if (gitTimeline.children.length > 8) {
                gitTimeline.removeChild(gitTimeline.lastChild);
            }
            
            // Добавляем обработчик клика
            timelineItem.addEventListener('click', () => {
                handleTimelineItemClick(newCommit, timelineItem);
            });
        }
        
        // Генерация случайного хэша
        function generateRandomHash() {
            const chars = '0123456789abcdef';
            let hash = '';
            for (let i = 0; i < 8; i++) {
                hash += chars[Math.floor(Math.random() * chars.length)];
            }
            return hash;
        }
        
        // Генерация молекулы по нажатию Enter
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                generateButton.click();
            }
        });
        
        // Закрытие боковых панелей при клике вне их
        document.addEventListener('click', (e) => {
            const target = e.target;
            const isLeftPanel = leftPanel.contains(target);
            const isRightPanel = rightPanel.contains(target);
            const isLeftToggle = target === leftPanelToggle || leftPanelToggle.contains(target);
            const isRightToggle = target === rightPanelToggle || rightPanelToggle.contains(target);
            
            // Закрываем левую панель если клик вне ее и не на ее кнопку
            if (leftPanelOpen && !isLeftPanel && !isLeftToggle) {
                leftPanelOpen = false;
                leftPanel.classList.remove('open');
                leftPanelToggle.innerHTML = '<i class="fas fa-chevron-right"></i>';
            }
            
            // Закрываем правую панель если клик вне ее и не на ее кнопку
            if (rightPanelOpen && !isRightPanel && !isRightToggle) {
                rightPanelOpen = false;
                rightPanel.classList.remove('open');
                rightPanelToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
            }
        });
        
        // Обработка нажатий на кнопки панелей (предотвращаем всплытие)
        leftPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        rightPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Форма поиска уже настроена на перенаправление на RCSB.org
        const searchForm = document.getElementById('search-form');
        const searchInput = document.querySelector('.search-input');
        
        searchForm.addEventListener('submit', (e) => {
            const query = searchInput.value.trim();
            if (!query) {
                e.preventDefault();
                showNotification('Введите поисковый запрос');
                return;
            }
            
            console.log(`Поиск по RCSB PDB: ${query}`);
        });
        
        // Автодополнение или подсказки при фокусе
        searchInput.addEventListener('focus', () => {
            searchInput.placeholder = 'Например: insulin, hemoglobin, 1IEP...';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.placeholder = 'RCSB PDB';
        });
        
        // Инициализация при загрузке страницы
        window.addEventListener('load', () => {
            console.log('Панели готовы к работе');
            console.log('Основная модель:', firstModelUrl);
            console.log('Тестовая модель:', secondModelUrl);
            console.log('Поиск настроен на перенаправление на RCSB.org');
            
            // Инициализация инвентаря атомов
            initAtomInventory();
            console.log('Инвентарь атомов инициализирован');
            
            // Инициализация GIT таймлайна
            initGitTimeline();
            console.log('GIT таймлайн инициализирован');
            
            // Устанавливаем начальное значение энергии связывания
            document.querySelector('.energy-value').textContent = '-12.5 ккал/моль';
            
            // Инициализируем таймлайн
            updateGitTimeline();
        });
