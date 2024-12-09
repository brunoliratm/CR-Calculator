let disciplines = [];

function calculateCR() {
  let totalCreds = 0;
  let weightedSum = 0;

  disciplines.forEach(discipline => {
    weightedSum += discipline.grade * discipline.ch;
    totalCreds += discipline.ch;
  });

  const cr = totalCreds > 0 ? (weightedSum / totalCreds).toFixed(2) : 0;
  document.getElementById('cr-value').textContent = cr;
}

function renderDisciplines() {
  const listElement = document.getElementById('discipline-list');
  listElement.innerHTML = '';

  disciplines.forEach(discipline => {
    const listItem = document.createElement('li');
    listItem.textContent = `${discipline.subject} - Nota: ${discipline.grade} - CH: ${discipline.ch}`;
    listElement.appendChild(listItem);
  });
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);

  const themeToggleIcon = document.getElementById('theme-toggle').querySelector('i');
  themeToggleIcon.classList.toggle('bi-moon', newTheme === 'light');
  themeToggleIcon.classList.toggle('bi-sun', newTheme === 'dark');
}

document.getElementById('discipline-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const subject = document.getElementById('subject').value;
  const grade = parseFloat(document.getElementById('grade').value);
  const ch = parseInt(document.getElementById('ch').value);

  if (!subject || isNaN(grade) || isNaN(ch)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  disciplines.push({ subject, grade, ch });
  renderDisciplines();
  calculateCR();
  document.getElementById('discipline-form').reset();
});

document.getElementById('theme-toggle').addEventListener('click', function () {
  toggleTheme();
});
