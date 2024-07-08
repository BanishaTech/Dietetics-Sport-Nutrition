function showService(serviceId) {
  const details = document.querySelectorAll('.service-detail');

  // Ocultar todas las secciones de detalles
  details.forEach(detail => {
    detail.classList.add('hidden');
  });

  // Mostrar la sección de detalles seleccionada
  const targetDetail = document.getElementById(serviceId);
  if (targetDetail) {
    targetDetail.classList.remove('hidden');
  }
}