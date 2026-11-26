document.addEventListener('DOMContentLoaded', function() {
    // 1. Palautelomakkeen toiminnallisuus
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

    // 2. Ruokalistan suodatus
    const suodatinPainikkeet = document.querySelectorAll('.filter-buttons button');
    const tuoteKortit = document.querySelectorAll('.tuote-kortti');

    suodatinPainikkeet.forEach(painike => {
        painike.addEventListener('click', () => {
            const suodatinArvo = painike.getAttribute('data-filter');

            tuoteKortit.forEach(kortti => {
                const kategoria = kortti.getAttribute('data-kategoria') || '';

                // Näytetään tai piilotetaan ehdon mukaan
                if (suodatinArvo === 'kaikki' || kategoria.includes(suodatinArvo)) {
                    kortti.style.display = ''; // Tyhjä palauttaa oletusasettelun (esim. flex/grid)
                } else {
                    kortti.style.display = 'none';
                }
            });
        });
    });
});