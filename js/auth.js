import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const form = document.getElementById('loginForm');
const message = document.getElementById('loginMessage');
const togglePassword = document.getElementById('togglePassword');

const eyeIconOpen = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>';
const eyeIconClosed = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l22 22"/><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.4 20.4 0 0 1 5.61-6.72"/><path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47"/></svg>';

if (togglePassword) {
  togglePassword.addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    togglePassword.setAttribute('aria-label', isHidden ? 'Sembunyikan password' : 'Tampilkan password');
    togglePassword.innerHTML = isHidden ? eyeIconClosed : eyeIconOpen;
  });
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    message.textContent = 'Memproses...';
    message.className = 'form-message';

    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.textContent = 'Berhasil masuk! Mengalihkan...';
      message.className = 'form-message success';
      setTimeout(() => (window.location.href = 'dashboard.html'), 800);
    } catch (err) {
      message.textContent = 'Email atau password salah.';
      message.className = 'form-message error';
      console.error(err);
    }
  });
}

// Auto redirect jika sudah login
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.endsWith('login.html')) {
    window.location.href = 'dashboard.html';
  }
});

export async function logout() {
  await signOut(auth);
  window.location.href = 'login.html';
}
