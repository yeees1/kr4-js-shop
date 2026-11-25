document.querySelectorAll('.confirmation-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.reset();
    const message = form.nextElementSibling;
    message.hidden = false;
    message.focus();
  });
});
