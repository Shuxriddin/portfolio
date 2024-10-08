// хедер скролл
const headerEl = document.getElementById('header');
window.addEventListener("scroll", function () {
    const scrollPos = window.scrollY

    if (scrollPos > 100) {
        headerEl.classList.add('header_mini')
    } else {
        headerEl.classList.remove('header_mini')
    }
})

// модальное окно
document.getElementById('open-modal-btn').addEventListener("click", ()=>{
    document.getElementById('my-modal').classList.add('open')
})
document.getElementById('close-my-modal-btn').addEventListener("click", function () {
    document.getElementById('my-modal').classList.remove('open')
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.getElementById('my-modal').classList.remove('open')
    }
})

// Закрыть модальное окно при клике вне его
document.querySelector("#my-modal .modal__box").addEventListener("click", event => {
    event._isClickWithInModal = true;
})
document.getElementById("my-modal").addEventListener("click", event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove("open")
});

// Бургер меню====
// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("burger").addEventListener("click", function () {
//         document.querySelector(".header").classList.toggle("open")
//     })
// })
document.addEventListener("DOMContentLoaded", function () {
    var burger = document.getElementById("burger");
    var header = document.querySelector(".header");
    var navLinks = document.querySelectorAll(".nav__link");

    burger.addEventListener("click", function () {
        header.classList.toggle("open");
    });

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            header.classList.remove("open");
        });
    });
});
// Закрыть модальное окно при клике вне его
document.getElementById("menu").addEventListener("click", event => {
    event._isClickWithInMenu = true;
})
document.getElementById("burger").addEventListener("click", event => {
    event._isClickWithInMenu = true;
});
document.body.addEventListener("click", event => {
    if (event._isClickWithInMenu) return;
    document.querySelector(".header").classList.remove("open")
})

window.scroll = () => {
    nav.classList.remove("open")
}

// skills block animation=========================================
const ratings = document.querySelectorAll('.skills__rating');

ratings.forEach((rating) => {
    const block = rating.querySelector('.block');
    for (let i = 1; i < 100; i++) {
        rating.innerHTML += "<div class='block'></div>";
        const blocks = rating.querySelectorAll('.block');
        blocks[i].style.transform = 'rotate(' + 3.6 * i + 'deg)';
        blocks[i].style.animationDelay = `${i / 40}s`;
    }

    const counter = rating.querySelector('.counter');
    counter.innerText = 0;

    const target = +counter.getAttribute('data-target');

    const numberCount = () => {
        const value = +counter.innerText;
        if (value < target) {
            counter.innerText = Math.ceil(value + 1);
            setTimeout(numberCount, 5);
        }
    }
    numberCount();
});


// loader

var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
    loader.style.display = "none"
})

// modal menu
var btn = document.getElementById("btn");
btn.addEventListener("click", function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var msg = document.getElementById("message").value;
    var body = 'name: ' + name + '<br/> phone: ' + phone + '<br/> message: ' + msg;

    var nameError = document.getElementById("errorName");
    var phoneError = document.getElementById("errorPhone");

    if (name.length == 0) {
        nameError.innerHTML = 'Введите имя';
        setTimeout(function () {
            nameError.style.display = 'none';
        }, 3000);
        return false;
    } else if (name.length < 2) {
        nameError.innerHTML = 'Имя должно содержать как минимум 2 символа';
        setTimeout(function () {
            nameError.style.display = 'none';
        }, 3000);
        return false;
    }

    if (phone.length == '') {
        phoneError.innerHTML = 'Введите телефон номер';
        setTimeout(function () {
            phoneError.style.display = 'none';
        }, 3000);
        return false;
    }

    Email.send({
        SecureToken: "18823e6e-3016-4aa2-9424-b77cf0bf4931",
        To: 'shuxriddinsolixov2023@gmail.com',
        From: "shuxriddinsolixov2023@gmail.com",
        Subject: "contact message",
        Body: body
    }).then(
        message => {
            if (message === 'OK') {
                swal("Спасибо!", "Сообщение отправлено!", "success");
                reset(); // Call the reset function after successful email sending
            } else {
                swal("Ошибка", "Сообщение не отправлено!", "error");
            }
        }
    );
});

// Define the reset function
function reset() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("message").value = "";
}



// -----Scroll Reveal------------====================================================================
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2200,
    reset: true,
});

sr.reveal(".hero__title", { delay: 100 });
sr.reveal(".hero__content", { delay: 200 })
sr.reveal(".about__title", { delay: 200 })
sr.reveal(".skills__title", { delay: 200 })
sr.reveal(".projects__title", { delay: 200 })
sr.reveal(".footer__title", { delay: 200 })

const srBottom = ScrollReveal({
    origin: 'bottom',
    distance: '80px',
    duration: 2200,
    reset: true,
});

sr.reveal(".hero__text", { delay: 100 });
sr.reveal(".hero__btn", { delay: 100 });
// sr.reveal(".social", { delay: 100 });
sr.reveal(".about__text", { delay: 100 });
sr.reveal(".projects__button", { delay: 100 });
sr.reveal(".skills__list", { delay: 100 })


const srLeft = ScrollReveal({
    origin: 'left',
    distance: '80px',
    duration: 2200,
    reset: true,
})

const srRight = ScrollReveal({
    origin: 'right',
    distance: '80px',
    duration: 2200,
    reset: true,
});

srRight.reveal(".projects__list", { delay: 100 })


// switcher
let root = document.querySelector(":root");
let button = document.querySelector("#themeToggle");

button.addEventListener('click', () => {
  event.preventDefault();
  root.classList.toggle('dark');
})

// progress bar
const progressBarEl = document.getElementById("progress-bar");
window.addEventListener("scroll", () => {
  let height = document.body.scrollHeight - window.innerHeight;
  let scrollPosition = document.documentElement.scrollTop;
  let width = (scrollPosition / height) * 100;
  progressBarEl.style.width = `${width}%`;
});

// accordion
// const accordions = document.getElementsByClassName("box");
// for (let i = 0; i < accordions.length; i++) {
//     accordions[i].addEventListener('click', function() {
//         this.classList.toggle('activate');
//     });
// }
document.addEventListener('DOMContentLoaded', function() {
    const accordions = document.getElementsByClassName("box");
    for (let i = 0; i < accordions.length; i++) {
        accordions[i].addEventListener('click', function() {
            this.classList.toggle('activate');
        });
    }
});