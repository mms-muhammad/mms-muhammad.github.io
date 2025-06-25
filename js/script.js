document.addEventListener('DOMContentLoaded', () => {
  const greetingEl = document.getElementById('greeting');
  const socialLinksEl = document.getElementById('social-links');
  const toggleLinksBtn = document.getElementById('toggle-links');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const neonToggleBtn = document.getElementById('neon-toggle');
  const scrollTopBtn = document.getElementById('scroll-top');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // Приветствие по времени суток
  function updateGreeting() {
    const hour = new Date().getHours();
    let greet = 'Привет!';
    if (hour >= 5 && hour < 12) greet = 'Доброе утро!';
    else if (hour >= 12 && hour < 18) greet = 'Добрый день!';
    else if (hour >= 18 && hour < 23) greet = 'Добрый вечер!';
    else greet = 'Доброй ночи!';
    greetingEl.textContent = greet;
  }
  updateGreeting();

  // Ссылки соцсетей (можно поменять или загрузить с файла)
  const socialLinks = [
    { name: 'Telegram', url: 'https://t.me/mmsmuhammad', icon: '✈️' },
    { name: 'YouTube', url: 'https://youtube.com/@mmsmuhammad', icon: '▶️' },
    { name: 'GitHub', url: 'https://github.com/mmsmuhammad', icon: '🐙' },
    { name: 'VK', url: 'https://vk.com/mmsmuhammad', icon: '📘' },
  ];

  let linksVisible = true;
  function renderLinks() {
    socialLinksEl.innerHTML = '';
    if (!linksVisible) {
      socialLinksEl.style.display = 'none';
      return;
    }
    socialLinksEl.style.display = 'block';
    socialLinks.forEach((link, i) => {
      const li = document.createElement('li');
      li.style.animationDelay = `${i * 0.2}s`;
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = `${link.icon} ${link.name}`;
      li.appendChild(a);
      socialLinksEl.appendChild(li);
    });
  }
  renderLinks();

  toggleLinksBtn.addEventListener('click', () => {
    linksVisible = !linksVisible;
    renderLinks();
    toggleLinksBtn.textContent = linksVisible ? 'Скрыть ссылки' : 'Показать ссылки';
  });

  // Переключатель темной/светлой темы
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
  }
  loadTheme();

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Переключатель цвета неона (желтый/синий)
  function loadNeon() {
    const savedNeon = localStorage.getItem('neon') || 'yellow';
    document.body.classList.remove('neon-yellow', 'neon-blue');
    document.body.classList.add(`neon-${savedNeon}`);
  }
  loadNeon();

  neonToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('neon-yellow')) {
      document.body.classList.remove('neon-yellow');
      document.body.classList.add('neon-blue');
      localStorage.setItem('neon', 'blue');
    } else {
      document.body.classList.remove('neon-blue');
      document.body.classList.add('neon-yellow');
      localStorage.setItem('neon', 'yellow');
    }
  });

  // Кнопка "Наверх"
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Параллакс эффект
  const parallaxEls = document.querySelectorAll('.parallax');
  window.addEventListener('scroll', () => {
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.speed);
      const offset = window.scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  });

  // Форма обратной связи (имитация отправки)
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    formStatus.textContent = '';
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Пожалуйста, заполните все поля.';
      formStatus.style.color = 'red';
      return;
    }
    if (!validateEmail(email)) {
      formStatus.textContent = 'Введите корректный email.';
      formStatus.style.color = 'red';
      return;
    }

    formStatus.style.color = varGet('--yellow');
    formStatus.textContent = 'Отправка...';

    // Имитация отправки (через 2 сек)
    setTimeout(() => {
      formStatus.style.color = 'limegreen';
      formStatus.textContent = 'Спасибо! Сообщение отправлено.';
      contactForm.reset();
    }, 2000);
  });

  function validateEmail(email) {
    // Простая проверка email
    return /\S+@\S+\.\S+/.test(email);
  }

  function varGet(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }
});
