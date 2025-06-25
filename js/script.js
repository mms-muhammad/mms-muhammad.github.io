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
  'youtube-link.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6zM21.8 7.2s-.2-1.42-.82-2.04c-.78-.83-1.66-.83-2.06-.88C15.65 4 12 4 12 4s-3.65 0-6.92.28c-.4.05-1.28.05-2.06.88-.62.62-.82 2.04-.82 2.04S2 8.82 2 10.44v3.12c0 1.62.28 2.9.28 2.9s.2 1.42.82 2.04c.78.83 1.8.8 2.26.9 1.63.29 6.92.28 6.92.28s3.64 0 6.92-.28c.4-.05 1.28-.05 2.06-.88.62-.62.82-2.04.82-2.04s.28-1.28.28-2.9v-3.12c0-1.62-.28-2.9-.28-2.9z"/></svg>`,
  'scratch.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f6851f"/></svg>`,
  'game-link.txt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 7v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7h16zm-6 6h2v2h-2v-2zm0-4h2v2h-2V9z"/></svg>`
};

async function loadLinks() {
  const ul = document.getElementById('social-links');
  ul.innerHTML = '';

  for (const file of socialFiles) {
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error('Ошибка загрузки');
      const url = (await res.text()).trim();

      const li = document.createElement('li');
      const icon = socialIcons[file] || '';
      const label = socialLabels[file] || 'Ссылка';

      li.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${icon} ${label}</a>`;
      ul.appendChild(li);
    } catch {
      // Если файл не загрузился, покажем пустой элемент
      const li = document.createElement('li');
      li.textContent = `Ссылка ${socialLabels[file] || file} недоступна`;
      ul.appendChild(li);
    }
  }
}

// Переключатель неона
document.getElementById('neon-toggle').addEventListener('click', () => {
  document.body.classList.toggle('neon-off');
});

// Переключатель темы (светлая/тёмная)
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

window.addEventListener('DOMContentLoaded', () => {
  loadLinks();
});
