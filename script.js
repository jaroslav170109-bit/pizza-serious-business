document.addEventListener('DOMContentLoaded', function () {
    // 1. Asiakaspalaute
    const lomake = document.getElementById('feedback-form');
    const kuittaus = document.getElementById('palaute-kuittaus');

    function tarkistaKentat() {
        const nimi = document.getElementById('lahettaja')?.value.trim() || '';
        const sahkoposti = document.getElementById('sahkoposti')?.value.trim() || '';
        const viesti = document.getElementById('viesti')?.value.trim() || '';

        if (!nimi || !sahkoposti || !viesti) {
            return 'Täytä kaikki kentät.';
        }
        if (!sahkoposti.includes('@')) {
            return 'Syötä kelvollinen sähköpostiosoite.';
        }
        return '';
    }

    if (lomake && kuittaus) {
        lomake.addEventListener('submit', function (event) {
            event.preventDefault();
            const virhe = tarkistaKentat();

            if (virhe) {
                kuittaus.textContent = virhe;
                kuittaus.style.color = 'crimson';
                return;
            }

            kuittaus.textContent = 'Kiitos palautteestasi!';
            kuittaus.style.color = 'green';
            lomake.reset();
        });
    }

    // 2. Ruokalistan suodatus
    const suodatinPainikkeet = document.querySelectorAll('.filter-buttons button[data-filter]');
    const tuoteKortit = document.querySelectorAll('.tuote-kortti');

    suodatinPainikkeet.forEach((painike) => {
        painike.addEventListener('click', () => {
            const suodatinArvo = painike.getAttribute('data-filter');

            suodatinPainikkeet.forEach((btn) => btn.classList.remove('active'));
            painike.classList.add('active');

            tuoteKortit.forEach((kortti) => {
                const kategoria = kortti.getAttribute('data-kategoria') || '';
                const nayta = suodatinArvo === 'kaikki' || kategoria.includes(suodatinArvo);
                kortti.style.display = nayta ? '' : 'none';
            });
        });
    });

    // 3. Lahjakortit ja etukoodi (20–250 €)
    const summaPainikkeet = document.querySelectorAll('.summa-buttons button[data-arvo]');
    const etukoodiInput = document.getElementById('etukoodi');
    const paivitaBtn = document.getElementById('paivita-summa');
    const valittuArvoSpan = document.getElementById('valittu-arvo');

    let nykyinenSumma = 0;

    function laskeAlennus(summa, koodi) {
        const normalisoitu = koodi.trim().toUpperCase();
        if (normalisoitu === 'ENRICO10') {
            return +(summa * 0.9).toFixed(2);
        }
        if (normalisoitu === 'ALENNUS5') {
            return Math.max(20, +(summa - 5).toFixed(2));
        }
        return summa;
    }

    function paivitaNaytto(summa, koodi = '') {
        if (!valittuArvoSpan) return;
        const loppusumma = laskeAlennus(summa, koodi);
        nykyinenSumma = loppusumma;
        valittuArvoSpan.textContent = loppusumma.toString();
    }

    summaPainikkeet.forEach((painike) => {
        painike.addEventListener('click', () => {
            const arvo = Number(painike.getAttribute('data-arvo'));
            const koodi = etukoodiInput ? etukoodiInput.value : '';
            paivitaNaytto(arvo, koodi);
        });
    });

    if (paivitaBtn && etukoodiInput) {
        paivitaBtn.addEventListener('click', () => {
            const syote = etukoodiInput.value.trim();
            const numero = Number(syote.replace(',', '.'));

            if (!Number.isNaN(numero) && numero > 0) {
                if (numero < 20 || numero > 250) {
                    alert('Lahjakortin summan tulee olla 20–250 €.');
                    return;
                }
                paivitaNaytto(numero, '');
            } else if (syote) {
                const perusSumma = nykyinenSumma > 0 ? nykyinenSumma : 50;
                paivitaNaytto(perusSumma, syote);
            }
        });
    }

    // 4. Tilauslinkit
    const tilausPainikkeet = document.querySelectorAll('[data-palvelu]');
    tilausPainikkeet.forEach((btn) => {
        btn.addEventListener('click', () => {
            const palvelu = btn.getAttribute('data-palvelu');
            console.log('Avataan tilauspalvelu:', palvelu);
        });
    });
});

/*

const paivitaPainike = document.getElementById("paivita summa");
const  syottoKentta = document.getElementById("etukoodi");
const valittuArvo = document.getElementById("valittu-arvo");

const syotettyTeksti = syottoKentta.value.trim();

   
    valittuArvo.textContent = syotettyTeksti;
    
*/