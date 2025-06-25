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
  'tg-link.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.04 15.58l-.39 3.81c.56 0 .8-.24 1.09-.52l2.62-2.52 5.43 3.98c1 .56 1.71.27 1.97-.93L22 7.61c.26-1.16-.4-1.67-1.2-1.38L3.99 11.8c-1.15.44-1.13 1.06-.2 1.36l4.98 1.55 11.55-7.24c.55-.33 1.05-.15.64.2"/></svg>`,
  'youtube-link.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 15l5-3-5-3v6z"/><path d="M21.8 8s-.2-1.43-.82-2.06c-.79-.82-1.67-.82-2.07-.87-2.9-.2-7.26-.2-7.26-.2h-.01s-4.37 0-7.27.2c-.41.05-1.28.07-2.08.87C2.4 6.57 2.2 8 2.2 8S2 9.6 2 11.18v1.63c0 1.58.2 3.18.2 3.18s.2 1.43.82 2.06c.79.82 1.83.8 2.3.9 1.67.12 7.1.21 7.1.21s4.37 0 7.27-.2c.41-.05 1.28-.07 2.08-.87.62-.63.82-2.06.82-2.06s.2-1.6.2-3.18v-1.63c0-1.58-.2-3.18-.2-3.18z"/></svg>`,
  'scratch.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f0c419"/><path d="M7.5 8.5l1 1.5 2.5-1.5-2 2 3 1-1 1-5-1.5 1-3.5z" fill="#000"/></svg>`,
  'game-link.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="6" y="9" width="12" height="6" rx="2" ry="2" fill="#3366cc"/><circle cx="9" cy="12" r="1" fill="#fff"/><circle cx="15" cy="12" r="1" fill="#fff"/></svg>`
};

async function loadSocialLinks() {
  const ul = document.getElementById('social-links');
  ul.innerHTML = '';

  for (const file of socialFiles) {
    try {
      const res = await fetch(`social/${file}`);
      if (!res.ok) throw new Error('Ошибка загрузки');
      const link = (await res.text()).trim();
      if (!link) continue;

      const label = socialLabels[file] || 'Ссылка';
      const icon = socialIcons[file] || '';

      const li = document.createElement('li');
      li.innerHTML = `<a href="${link}" target="_blank" rel="noopener noreferrer">${icon}${label}</a>`;
      ul.appendChild(li);
    } catch {
      // Можно добавить fallback или пропустить
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSocialLinks();

  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    // Можно сохранить выбор темы в localStorage
    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // Авто-установка темы из localStorage
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
  }
});
