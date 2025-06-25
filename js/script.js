// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const storedTheme = localStorage.getItem('theme');

if (storedTheme === 'dark') body.classList.add('dark');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Подставляем текущий год в футер
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Загрузка ссылок из папки social
const socialFiles = [
  'social/tg-link.txt',
  'social/yotube-link.txt',
  'social/scratch.txt',
  'social/game-link.txt'
];

const socialLabels = {
  'tg-link.txt': 'Telegram',
  'yotube-link.txt': 'YouTube',
  'scratch.txt': 'Scratch',
  'game-link.txt': 'Мои игры'
};

const socialList = document.getElementById('social-links');
socialList.innerHTML = '';

socialFiles.forEach(path => {
  fetch(path)
    .then(res => res.text())
    .then(url => {
      const fileName = path.split('/').pop();
      const label = socialLabels[fileName] || fileName;
      if (url.trim()) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = url.trim();
        a.textContent = label;
        a.target = '_blank';
        li.appendChild(a);
        socialList.appendChild(li);
      }
    })
    .catch(console.error);
});
