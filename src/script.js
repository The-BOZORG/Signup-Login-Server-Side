const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const signupMsg = document.getElementById('signupMsg');
const loginMsg = document.getElementById('loginMsg');

const showMessage = (element, message, type = 'error') => {
  element.textContent = message;
  element.style.color = type === 'success' ? 'green' : 'red';
  setTimeout(() => (element.textContent = ''), 3000);
};

const handleFormSubmit = async (
  form,
  url,
  msgElement,
  successMsg,
  errorMsg
) => {
  const formData = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (res.ok) {
      showMessage(msgElement, result.msg || successMsg, 'success');
      form.reset();
    } else {
      showMessage(msgElement, result.msg || errorMsg);
    }
  } catch {
    showMessage(msgElement, 'Server error');
  }
};

// Signup
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleFormSubmit(
    signupForm,
    '/register',
    signupMsg,
    'Register success',
    'Signup error'
  );
});

// Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleFormSubmit(
    loginForm,
    '/login',
    loginMsg,
    'Login success',
    'Username or password is wrong'
  );
});
