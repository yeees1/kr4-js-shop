const orderForm = document.querySelector('#order-form');
if (orderForm) {
  const fields = [
    { input: orderForm.querySelector('#order-product'), check: value => value !== '', error: 'Выберите товар.' },
    { input: orderForm.querySelector('#order-name'), check: value => value.trim().length >= 2, error: 'Введите имя не короче 2 символов.' },
    { input: orderForm.querySelector('#order-email'), check: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()), error: 'Введите корректный e-mail.' },
    { input: orderForm.querySelector('#order-phone'), check: value => /^(?:\+7|8)?\d{10}$/.test(value.replace(/[\s()-]/g, '')), error: 'Введите номер из 10 цифр или с +7/8.' },
    { input: orderForm.querySelector('input[type="checkbox"]'), check: (_, input) => input.checked, error: 'Подтвердите правильность данных.' }
  ];
  const message = document.querySelector('#order-message');
  fields.forEach(field => {
    const error = document.createElement('small');
    error.classList.add('field-error');
    error.id = `${field.input.id || 'order-confirm'}-error`;
    error.hidden = true;
    field.input.closest('.form-field').append(error);
    field.errorNode = error;
    field.input.setAttribute('aria-describedby', error.id);
  });

  function validate(field) {
    const valid = field.check(field.input.value, field.input);
    field.input.setAttribute('aria-invalid', String(!valid));
    field.errorNode.textContent = valid ? '' : field.error;
    field.errorNode.hidden = valid;
    return valid;
  }

  fields.forEach(field => field.input.addEventListener(field.input.type === 'checkbox' || field.input.tagName === 'SELECT' ? 'change' : 'input', () => {
    if (field.input.getAttribute('aria-invalid') === 'true') validate(field);
    message.hidden = true;
  }));

  orderForm.addEventListener('submit', event => {
    event.preventDefault();
    const valid = fields.map(validate).every(Boolean);
    message.hidden = false;
    if (!valid) {
      message.classList.add('form-message--error');
      message.textContent = 'Проверьте выделенные поля.';
      fields.find(field => field.input.getAttribute('aria-invalid') === 'true').input.focus();
      return;
    }
    message.classList.remove('form-message--error');
    message.textContent = 'Заявка подготовлена. Это демонстрация, данные не отправлены.';
    orderForm.reset();
    fields.forEach(field => { field.input.removeAttribute('aria-invalid'); field.errorNode.hidden = true; });
    message.focus();
  });
}
