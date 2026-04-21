const catalogItems = [
  {
    name: 'Ocean Crown 62',
    type: 'Yate premium',
    price: 'USD 1.9M',
    specs: ['62 ft', '12 pasajeros', 'Flybridge'],
    image: 'https://images.unsplash.com/photo-1759135695910-0a6aaaab6b14?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200',
    unsplashUrl: 'https://unsplash.com/photos/a-large-modern-yacht-floats-on-the-calm-sea-v-5m2uAzhYM',
    badge: 'Disponible'
  },
  {
    name: 'Velocity 38',
    type: 'Lancha deportiva',
    price: 'USD 420K',
    specs: ['38 ft', '8 pasajeros', 'High performance'],
    image: 'https://images.unsplash.com/photo-1763877506795-640af4c38525?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200',
    unsplashUrl: 'https://unsplash.com/photos/a-modern-speedboat-with-a-colorful-design-cruises-on-water-o1GJjm21lHA',
    badge: 'Nuevo ingreso'
  },
  {
    name: 'Harbor Elite 45',
    type: 'Yate de costa',
    price: 'USD 890K',
    specs: ['45 ft', '10 pasajeros', 'Marina ready'],
    image: 'https://images.unsplash.com/photo-1750879894230-166d2a7637f2?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200',
    unsplashUrl: 'https://unsplash.com/photos/boats-are-docked-in-a-marina-from-above-W-SwOSNzbGU',
    badge: 'En marina'
  },
  {
    name: 'Azure Sail 40',
    type: 'Velero premium',
    price: 'USD 610K',
    specs: ['40 ft', '6 pasajeros', 'Open sea'],
    image: 'https://images.unsplash.com/photo-1542397284385-6010376c5337?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200',
    unsplashUrl: 'https://unsplash.com/photos/white-yacht-in-middle-of-blue-sea-qToVxSYXPYU',
    badge: 'Reserva abierta'
  }
];

const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const catalogGrid = document.getElementById('catalogGrid');
const bookingForm = document.getElementById('bookingForm');
const bookingFeedback = document.getElementById('bookingFeedback');
const productSelect = document.getElementById('productSelect');
const firebaseConfig = window.__FIREBASE_CONFIG__ || null;

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  mobileMenu.hidden = expanded;
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
  });
});

function renderCatalog() {
  if (!catalogGrid) return;

  catalogGrid.innerHTML = catalogItems.map((item) => `
    <article class="catalog-card reveal">
      <div class="catalog-media">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <span class="catalog-badge">${item.badge}</span>
      </div>
      <div class="catalog-body">
        <div>
          <p class="muted">${item.type}</p>
          <h3>${item.name}</h3>
        </div>
        <div class="catalog-meta">
          ${item.specs.map(spec => `<span>${spec}</span>`).join('')}
        </div>
        <strong>${item.price}</strong>
        <div class="card-actions">
          <a class="btn btn-solid js-reserve-product" href="#reservas" data-product="${item.name}">Reservar cita</a>
          <a class="card-link" href="${item.unsplashUrl}" target="_blank" rel="noopener">Ver referencia Unsplash</a>
        </div>
      </div>
    </article>
  `).join('');
}

function setupCatalogReservationLinks() {
  document.querySelectorAll('.js-reserve-product').forEach((button) => {
    button.addEventListener('click', () => {
      const product = button.getAttribute('data-product') || '';
      if (productSelect) {
        productSelect.value = product;
      }
    });
  });
}

function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function validateBirthDate(value) {
  if (!value) return 'La fecha de nacimiento es obligatoria.';

  const selected = new Date(`${value}T00:00:00`);
  const today = new Date();
  const min = new Date('1900-01-01T00:00:00');

  if (Number.isNaN(selected.getTime())) return 'La fecha de nacimiento no es valida.';
  if (selected > today) return 'La fecha de nacimiento no puede estar en el futuro.';
  if (selected < min) return 'La fecha de nacimiento no parece valida.';

  let age = today.getFullYear() - selected.getFullYear();
  const monthDiff = today.getMonth() - selected.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selected.getDate())) {
    age -= 1;
  }

  if (age < 18) return 'El cliente debe ser mayor de edad.';
  return '';
}

function validateAppointmentDate(value) {
  const selected = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!value || Number.isNaN(selected.getTime()) || selected < today) {
    return 'La fecha de cita debe ser hoy o una fecha futura.';
  }

  return '';
}

function setFeedback(target, message, state) {
  if (!target) return;
  target.textContent = message;
  target.dataset.state = state;
}

async function persistToFirebase(collectionName, payload) {
  if (!firebaseConfig) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { mocked: true };
  }

  const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js');
  const { getFirestore, addDoc, collection, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js');

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return addDoc(collection(db, collectionName), {
    ...payload,
    createdAt: serverTimestamp()
  });
}

bookingForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const birthDate = String(formData.get('birthDate') || '');
  const appointmentDate = String(formData.get('appointmentDate') || '');
  const birthError = validateBirthDate(birthDate);
  const appointmentError = validateAppointmentDate(appointmentDate);
  const privacyAccepted = Boolean(formData.get('privacyAccepted'));

  if (birthError) {
    setFeedback(bookingFeedback, birthError, 'error');
    return;
  }

  if (appointmentError) {
    setFeedback(bookingFeedback, appointmentError, 'error');
    return;
  }

  if (!privacyAccepted) {
    setFeedback(bookingFeedback, 'Debes aceptar el tratamiento de datos para continuar.', 'error');
    return;
  }

  const payload = {
    fullName: String(formData.get('fullName') || '').trim(),
    birthDate,
    email: String(formData.get('email') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    product: String(formData.get('product') || '').trim(),
    interest: String(formData.get('interest') || '').trim(),
    appointmentDate,
    appointmentType: String(formData.get('appointmentType') || '').trim(),
    message: String(formData.get('message') || '').trim(),
    privacyAccepted,
    status: 'new',
    crmStage: 'reservation_requested',
    source: 'website'
  };

  try {
    await persistToFirebase('reservations', payload);
    bookingForm.reset();
    setFeedback(
      bookingFeedback,
      firebaseConfig
        ? 'Reserva y lead guardados correctamente en Firebase/Firestore.'
        : 'Formulario validado. Para guardarlo en la nube, agrega tu configuracion Firebase en assets/js/firebase-config.js.',
      'success'
    );
  } catch (error) {
    setFeedback(bookingFeedback, 'No se pudo guardar la reserva. Revisa la configuracion de Firebase.', 'error');
    console.error(error);
  }
});

renderCatalog();
setupCatalogReservationLinks();
revealOnScroll();
