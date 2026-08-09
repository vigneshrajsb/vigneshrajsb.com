/* Swaps the shimmer placeholder for the blur-up settle as images arrive. */
document.querySelectorAll('.frame img').forEach(function (img) {
  if (img.complete && img.naturalWidth) {
    img.classList.add('ready');
    return;
  }
  var done = function () {
    img.classList.add('loaded');
  };
  img.addEventListener('load', done, { once: true });
  img.addEventListener('error', done, { once: true });
});
