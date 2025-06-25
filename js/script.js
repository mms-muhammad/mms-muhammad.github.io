const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
  body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

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

const socialIcons = {
  'tg-link.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.04 16.71l.01-.01 5.55-5.12-7.94-2.6 13.38-5.05-1.92 17.07-3.81-3.3z"/></svg>`,
  'yotube-link.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6zM21.8 7.2s-.2-1.42-.82-2.04c-.78-.83-1.66-.83-2.06-.88C15.65 4 12 4 12 4s-3.65 0-6.92.28c-.4.05-1.28.05-2.06.88-.62.62-.82 2.04-.82 2.04S2 8.82 2 10.44v3.12c0 1.62.28 2.9.28 2.9s.2 1.42.82 2.04c.78.83 1.8.8 2.26.89 1.64.18 6.92.28 6.92.28s3.65 0 6.92-.28c.4-.05 1.28-.05 2.06-.88.62-.62.82-2.04.82-2.04s.28-1.28.28-2.9v-3.12c0-1.62-.28-2.9-.28-2.9z"/></svg>`,
  'scratch.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C7 2 4 8 4 8s2.31 3.69 8 3.69c5.69 0 8-3.69 8-3.69S17 2 12 2zM6 14s1.87 1.5 6 1.5c4.13 0 6-1.5 6-1.5S17 20 12 20c-5 0-6-6-6-6z"/></svg>`,
  'game-link.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 8v8h16V8H4zm7 3h2v2h-2v-2zm-1-3h4v1h-4v-1z"/></svg>`
};

function loadSocialLinks() {
  const list = document.getElementById('social-links');
  list.innerHTML = '';

  socialFiles.forEach((filename, i) => {
    fetch(filename)
    .then(res => {
      if (!res.ok) throw new Error('Ошибка загрузки файла ' + filename);
      return res.text();
    })
    .then(link => {
      const li = document.createElement('li');
      li.style.animationDelay = (2.7 + i * 0.3) + 's';
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

loadSocialLinks();
