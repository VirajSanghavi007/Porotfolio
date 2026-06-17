// =====================================================
//  EMAILJS CONTACT FORM
//  Setup (one-time, takes ~3 minutes):
//
//  1. Go to https://emailjs.com and sign up free
//  2. Email Services → Add Service → Gmail → connect virajsanghavi000@gmail.com
//     Copy the Service ID (looks like "service_xxxxxxx") → paste into EMAILJS_SERVICE_ID
//  3. Email Templates → Create Template → set Subject to anything you want
//     In the body use these exact variables:
//       Name:    {{from_name}}
//       Email:   {{from_email}}
//       Message: {{message}}
//     Copy the Template ID (looks like "template_xxxxxxx") → paste into EMAILJS_TEMPLATE_ID
//  4. Account (top right) → Public Key → copy → paste into EMAILJS_PUBLIC_KEY
//
//  Then save and open index.html — the form will deliver to your Gmail.
// =====================================================

const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // from Account → Public Key
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // from Email Services
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // from Email Templates

(function init() {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS SDK not loaded. Check the <script> tag in index.html.');
        return;
    }
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
})();

function handleFormSubmit(e) {
    e.preventDefault();

    const btn   = e.target.querySelector('.form-submit');
    const name  = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const msg   = document.getElementById('fmessage').value.trim();

    if (!name || !email || !msg) return;

    btn.textContent = 'Sending...';
    btn.disabled    = true;

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  name,
        from_email: email,
        message:    msg,
    })
    .then(() => {
        btn.textContent      = 'Message sent!';
        btn.style.background = 'var(--cyan)';
        setTimeout(() => {
            btn.textContent      = 'Send Message';
            btn.style.background = '';
            btn.disabled         = false;
            e.target.reset();
        }, 3000);
    })
    .catch((err) => {
        console.error('EmailJS error:', err);
        btn.textContent      = 'Failed — try again';
        btn.style.background = '#b91c1c';
        setTimeout(() => {
            btn.textContent      = 'Send Message';
            btn.style.background = '';
            btn.disabled         = false;
        }, 3000);
    });
}
