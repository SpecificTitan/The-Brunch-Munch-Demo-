/* The Brunch Munch — lightweight demo interactions.
   Replace this placeholder with the real WhatsApp number in international format,
   without +, spaces, or punctuation. Example: 15551234567
*/
const WHATSAPP_NUMBER = 'REPLACE_WITH_WHATSAPP_NUMBER';
const WHATSAPP_PLACEHOLDER = 'REPLACE_WITH_WHATSAPP_NUMBER';

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const toast = document.querySelector('.toast');

const genericWhatsAppMessage = `Hi The Brunch Munch! I’d like to enquire about catering for an event.

I’d love to discuss the details and availability.`;

function buildWhatsAppUrl(message) {
  const encodedMessage = encodeURIComponent(message);
  const destination = WHATSAPP_NUMBER === WHATSAPP_PLACEHOLDER
    ? 'https://wa.me/'
    : `https://wa.me/${WHATSAPP_NUMBER}`;
  return `${destination}?text=${encodedMessage}`;
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 4500);
}

function openWhatsApp(message) {
  if (WHATSAPP_NUMBER === WHATSAPP_PLACEHOLDER) {
    showToast('Demo mode: replace the WhatsApp number in script.js to route enquiries directly.');
  }
  window.location.href = buildWhatsAppUrl(message);
}

// Keep every booking CTA pointed at the same WhatsApp flow.
document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    openWhatsApp(genericWhatsAppMessage);
    closeMobileMenu();
  });
});

function closeMobileMenu() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  primaryNav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  const label = menuToggle.querySelector('.sr-only');
  if (label) label.textContent = 'Open menu';
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  primaryNav.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
  const label = menuToggle.querySelector('.sr-only');
  if (label) label.textContent = isOpen ? 'Open menu' : 'Close menu';
});

primaryNav?.querySelectorAll('a:not([data-whatsapp-link])').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

// Restrained reveal motion, with a no-motion fallback in CSS.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('revealed'));
}

// Frontend-only enquiry form: build a pre-filled click-to-chat message.
const bookingForm = document.querySelector('#booking-form');
bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  const formData = new FormData(bookingForm);
  const value = (key) => String(formData.get(key) || '').trim();
  const eventDate = value('date') || '[Preferred date]';
  const guests = value('guests') || '[Number of guests]';
  const message = value('message') || '[Message]';

  const enquiry = `Hi The Brunch Munch! I’d like to enquire about catering for an event.

Name: ${value('name')}
Phone: ${value('phone')}
Event Type: ${value('eventType')}
Date: ${eventDate}
Guests: ${guests}
Message: ${message}

I’d love to discuss the details and availability.`;

  openWhatsApp(enquiry);
});

// Full-menu preview modal keeps the demo self-contained until the real menu is supplied.
const menuDialog = document.querySelector('[data-menu-dialog]');
const menuModalTrigger = document.querySelector('[data-menu-modal]');
const modalClose = document.querySelector('[data-modal-close]');

menuModalTrigger?.addEventListener('click', () => {
  if (typeof menuDialog?.showModal === 'function') menuDialog.showModal();
});
modalClose?.addEventListener('click', () => menuDialog?.close());
menuDialog?.addEventListener('click', (event) => {
  if (event.target === menuDialog) menuDialog.close();
});
document.querySelector('[data-modal-booking]')?.addEventListener('click', (event) => {
  event.preventDefault();
  menuDialog?.close();
  document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
