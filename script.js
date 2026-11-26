document.addEventListener('DOMContentLoaded', function() {
    const lomake = document.getElementById('feedback-form');
    const kuittaus = document.getElementById('palaute-kuittaus');

    if (lomake && kuittaus) {

        lomake.addEventListener('submit', function(event) {
            event.preventDefault();

            kuittaus.textContent = 'Kiitos palautteestasi!';
            kuittaus.style.color = 'green';

            lomake.reset();
        });
    }
});