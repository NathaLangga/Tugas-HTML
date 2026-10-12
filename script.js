document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#kontak form');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');

  // Email valid: harus ada tepat satu "@", ada teks sebelum dan sesudahnya, tanpa spasi
  const emailPattern = /^[^\s@]+@[^\s@]+$/;

  function validateEmail() {
    const value = emailInput.value.trim();
    let message = '';

    if (value === '') {
      message = 'Email wajib diisi.';
    } else if (!value.includes('@')) {
      message = 'Email harus mengandung tanda @.';
    } else if (!emailPattern.test(value)) {
      message = 'Format email tidak valid. Contoh: nama@email.com';
    }

    emailError.textContent = message;
    emailInput.classList.toggle('invalid', message !== '');
    emailInput.setAttribute('aria-invalid', message !== '' ? 'true' : 'false');
    return message === '';
  }

  // Validasi langsung saat mengetik dan saat keluar dari kolom email
  emailInput.addEventListener('input', validateEmail);
  emailInput.addEventListener('blur', validateEmail);

  // Blokir submit jika email tidak valid
  form.addEventListener('submit', (event) => {
    // Karena form memakai novalidate, kolom nama dan pesan dicek manual
    const requiredFields = [document.getElementById('nama'), document.getElementById('pesan')];
    const emptyField = requiredFields.find((field) => field.value.trim() === '');

    if (emptyField) {
      event.preventDefault();
      emptyField.focus();
      return;
    }

    if (!validateEmail()) {
      event.preventDefault();
      emailInput.focus();
    }
  });
});
