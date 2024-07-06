
    document.addEventListener('DOMContentLoaded', function() {
      const serviceLinks = document.querySelectorAll('.service-link');
  
      serviceLinks.forEach(link => {
        link.addEventListener('click', function(event) {
          event.preventDefault();
  
          const serviceId = this.getAttribute('href').substring(1);
          const serviceDetails = document.querySelectorAll('.service-info');
  
          serviceDetails.forEach(info => {
            info.classList.remove('active');
          });
  
          const selectedService = document.getElementById(serviceId);
          selectedService.classList.add('active');
        });
      });
    });