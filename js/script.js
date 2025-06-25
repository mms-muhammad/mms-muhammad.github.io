const socialFiles = [
  'social/tg-link.txt',
'social/youtube-link.txt',
'social/scratch.txt',
'social/game-link.txt'
];

const socialLabels = {
  'tg-link.txt': 'Telegram',
  'youtube-link.txt': 'YouTube',
  'scratch.txt': 'Scratch',
  'game-link.txt': 'Мои игры'
};

const socialIcons = {
  'tg-link.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.04 15.58l-.39 3.81c.56 0 .8-.24 1.09-.52l2.62-2.52 5.43 3.98c1 .56 1.71.27 1.97-.93L22 7.61c.26-1.16-.4-1.67-1.2-1.38L3.99 11.8c-1.15.44-1.13 1.06-.2 1.36l4.98 1.55 11.58-7.47c.55-.36 1.05-.16.64.23"/></svg>`,
  'youtube-link.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6zM21.8 7.2s-.2-1.42-.82-2.04c-.78-.83-1.66-.83-2.06-.88C15.65 4 12 4 12 4s-3.65 0-6.92.28c-.4.05-1.28.05-2.06.88-.62.62-.82 2.04-.82 2.04S2 8.82 2 10.44v3.12c0 1.62.28 2.9.28 2.9s.2 1.42.82 2.04c.78.83 1.8.8 2.26.89 1.64.18 6.92.28 6.92.28s3.65 0 6.92-.28c.4-.05 1.28-.05 2.06-.88.62-.62.82-2.04.82-2.04s.28-1.28.28-2.9v-3.12c0-1.62-.28-2.9-.28-2.9z"/></svg>`,
  'scratch.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C7 2 4 8 4 8s2.31 3.69 8 3.69c5.69 0 8-3.69 8-3.69S17 2 12 2zM6 14s1.87 1.5 6 1.5c4.13 0 6-1.5 6-1.5S17 20 12 20c-5 0-6-6-6-6z"/></svg>`,
  'game-link.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 8v8h16V8H4zm7 3h2v2h-2v-2zm-1-3h4v1h-4v-1z"/></svg>`
};

function loadSocialLinks() {
  const list = document.getElementById('social-links');
  list.innerHTML = ''; // очистка списка перед загрузкой

  socialFiles.forEach((path, i) => {
    // получаем только имя файла, чтобы взять label и icon
    const filename = path.split('/').pop();

    fetch(path)
    .then(res => {
      if (!res.ok) throw new Error('Ошибка загрузки файла ' + path);
      return res.text();
    })
    .then(link => {
      const li = document.createElement('li');
      li.style.animationDelay = (0.3 + i * 0.15) + 's';
      li.innerHTML = `<a href="${link.trim()}" target="_blank" rel="noopener noreferrer" aria-label="${socialLabels[filename]}">${socialIcons[filename]}${socialLabels[filename]}</a>`;
      list.appendChild(li);
    })
    .catch(() => {
      const li = document.createElement('li');
      li.textContent = 'Не удалось загрузить ' + socialLabels[filename];
      list.appendChild(li);
    });
  });
}

// Переключение темы
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  // Сохраняем выбор в localStorage
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Автозагрузка темы при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
  }
  loadSocialLinks();
});
