import { auth } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const form = document.getElementById('registerForm');
const message = document.getElementById('registerMessage');
const togglePassword = document.getElementById('toggleRegisterPassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

const eyeIconOpen = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>';
const eyeIconClosed = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l22 22"/><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.4 20.4 0 0 1 5.61-6.72"/><path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47"/></svg>';

function attachPasswordToggle(button, inputId, hiddenLabel, visibleLabel) {
  if (!button) return;
  button.addEventListener('click', () => {
    const input = document.getElementById(inputId);
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    button.setAttribute('aria-label', isHidden ? visibleLabel : hiddenLabel);
    button.innerHTML = isHidden ? eyeIconClosed : eyeIconOpen;
  });
}

attachPasswordToggle(togglePassword, 'registerPassword', 'Tampilkan password', 'Sembunyikan password');
attachPasswordToggle(toggleConfirmPassword, 'confirmPassword', 'Tampilkan password konfirmasi', 'Sembunyikan password konfirmasi');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      message.textContent = 'Password dan konfirmasi tidak cocok.';
      message.className = 'form-message error';
      return;
    }

    message.textContent = 'Memproses...';
    message.className = 'form-message';

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      message.textContent = 'Akun berhasil dibuat! Mengalihkan...';
      message.className = 'form-message success';
      setTimeout(() => (window.location.href = 'dashboard.html'), 800);
    } catch (err) {
      const errorMessages = {
        'auth/email-already-in-use': 'Email sudah terdaftar.',
        'auth/invalid-email': 'Format email tidak valid.',
        'auth/operation-not-allowed': 'Pendaftaran dengan email/password tidak diizinkan.',
        'auth/weak-password': 'Password terlalu lemah. Gunakan minimal 6 karakter.',
        'auth/network-request-failed': 'Masalah jaringan. Periksa koneksi internet Anda.',
      };
      const errorText = errorMessages[err?.code] || err?.message || 'Terjadi kesalahan saat membuat akun.';
      message.textContent = `Gagal membuat akun: ${errorText}`;
      message.className = 'form-message error';
      console.error(err);
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.endsWith('register.html')) {
    window.location.href = 'dashboard.html';
  }
});
