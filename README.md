Task Master - Документація
Task Master - це веб-додаток для управління списком завдань. Користувач може додавати, видаляти, редагувати та відзначати завдання як виконані.

Огляд
Task Master розроблений на React та використовує бібліотеку react-icons для іконок та axios для взаємодії з API.

Інсталяція та Запуск
Клонування репозиторію
bash
Copy code
git clone https://github.com/your-username/task-master.git
cd task-master
Установка залежностей
bash
Copy code
npm install
Запуск проекту
bash
Copy code
npm start
Відкрийте http://localhost:3000 у вашому веб-браузері.

Структура Проекту
plaintext
Copy code
task-master
|-- src
|   |-- components
|   |   |-- TaskInput.jsx
|   |   |-- TaskItem.jsx
|   |   |-- TaskEdit.jsx
|   |   |-- Stats.jsx
|   |-- App.js
|   |-- index.css
|   |-- index.js
|-- public
|   |-- index.html
|-- package.json
|-- README.md
Команди
Запуск тестів:
bash
Copy code
npm test
Збірка для виробництва:
bash
Copy code
npm run build
Технології та Бібліотеки
React
Axios
react-icons
Внесок
Якщо ви бажаєте внести свій внесок у проект, будь ласка, виконайте наступні кроки:
Розробка
Створіть нову гілку: git checkout -b feature/your-feature-name
Внесіть зміни та додайте їх: git add .
Закомітьте зміни: git commit -m "Опис внесених змін"
Запуште гілку на віддалений репозиторій: git push origin feature/your-feature-name
Відкрийте Pull Request на GitHub.
