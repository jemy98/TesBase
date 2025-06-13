const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');  
const indicators = document.querySelectorAll('.indicator');
const totalImages = carouselImages.length;
let counter = 0;
let interval;
function updateCarousel() {
    carouselSlide.style.transform = 'translateX(' + (-counter * 100) + '%)';
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === counter);
    });
}
function nextSlide() {
    counter = (counter + 1) % totalImages;
    updateCarousel();
    resetInterval();
}
function prevSlide() {
    counter = (counter - 1 + totalImages) % totalImages;
    updateCarousel();
    resetInterval();
}
function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
}
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
interval = setInterval(nextSlide, 3000);
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        counter = index;
        updateCarousel();
        resetInterval();
    });
});