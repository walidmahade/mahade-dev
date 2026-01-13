// Initialize Google Analytics gtag
window.dataLayer = window.dataLayer || [];
function gtag(){
  dataLayer.push(arguments);
}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '', {
  page_title: document.title,
  page_location: window.location.href
});
