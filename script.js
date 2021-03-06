window.onload = function () {
    var menuicon = document.getElementsByClassName("menu-icon");
    for (var i = 0; i < menuicon.length; i++) {
        menuicon[i].addEventListener("click", function (e) {
            e.preventDefault();
            setaClasse();
        });
    };

    var clicado = document.getElementsByClassName("clicado");
    for (var i = 0; i < clicado.length; i++) {
        clicado[i].addEventListener("click", function () {
            setaClasse();
        });
    };

    function setaClasse() {
        var menu = document.getElementsByClassName("menu");
        for (var i = 0; i < menu.length; i++) {
            menu[i].classList.toggle("menu-active");
        };
    }

    $('.menu a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var id = $(this).attr('href'),
            targetOffset = $(id).offset().top;

        $('html, body').animate({
            scrollTop: targetOffset - 80
        }, 700);
    });

    function setaImagem() {

        var settings = {
            primeiraImg: function () {
                elemento = document.querySelector("#slider a:first-child");
                elemento.classList.add("ativo");
                this.legenda(elemento);
            },

            slide: function () {
                elemento = document.querySelector(".ativo");
                if (elemento.nextElementSibling) {
                    elemento.nextElementSibling.classList.add("ativo");
                    settings.legenda(elemento.nextElementSibling);
                    elemento.classList.remove("ativo");
                } else {
                    elemento.classList.remove("ativo");
                    settings.primeiraImg();
                }
            },

            proximo: function () {
                clearInterval(intervalo);
                elemento = document.querySelector(".ativo");

                if (elemento.nextElementSibling) {
                    elemento.nextElementSibling.classList.add("ativo");
                    settings.legenda(elemento.nextElementSibling);
                    elemento.classList.remove("ativo");
                } else {
                    elemento.classList.remove("ativo");
                    settings.primeiraImg();
                }
                intervalo = setInterval(settings.slide, 4000);
            },

            anterior: function () {
                clearInterval(intervalo);
                elemento = document.querySelector(".ativo");

                if (elemento.previousElementSibling) {
                    elemento.previousElementSibling.classList.add("ativo");
                    settings.legenda(elemento.previousElementSibling);
                    elemento.classList.remove("ativo");
                } else {
                    elemento.classList.remove("ativo");
                    elemento = document.querySelector("#slider a:last-child");
                    elemento.classList.add("ativo");
                    settings.legenda(elemento);
                }
                intervalo = setInterval(settings.slide, 4000);
            },

            legenda: function (obj) {
                var legenda = obj.querySelector("img").getAttribute("alt");
                document.querySelector("figcaption").innerHTML = legenda;
            }
        }

        //chama o slide
        settings.primeiraImg();

        //chama a legenda
        settings.legenda(elemento);

        //chama o slide à um determinado tempo
        var intervalo = setInterval(settings.slide, 4000);

        document.querySelector(".next").addEventListener("click", settings.proximo, false);
        document.querySelector(".prev").addEventListener("click", settings.anterior, false);
    }

    setaImagem();

    $(window).scroll(function(){
        if ($(this).scrollTop() > 150) {
            $('.botao-topo').fadeIn();
        } else {
            $('.botao-topo').fadeOut();
        }
    });

    $('.botao-topo').click(function(){
        $('html, body').animate({
            scrollTop : 0
        }, 700);
        // return false;
    });
}