const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });

// This client-side demo prepares an email; it does not transmit or store form data.
const supportForm = document.getElementById("support-form");
supportForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!supportForm.reportValidity()) return;
  const data = new FormData(supportForm);
  const subject = encodeURIComponent("Support enquiry - Rescue Shinyalu Foundation");
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nPhone: ${data.get("phone")}\nWard / village: ${data.get("location")}\nEnquiry category: ${data.get("type")}\n\nDescription:\n${data.get("details")}\n\nConsent to be contacted: Yes`
  );
  document.querySelector(".form-status").textContent = "Your email application should open with the enquiry prepared. Please review and send it.";
  window.location.href = `mailto:hello@juliusganerahfoundation.org?subject=${subject}&body=${body}`;
});
