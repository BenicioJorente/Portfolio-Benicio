document.addEventListener('DOMContentLoaded', () => {

    // Efeito de rolagem para o cabeçalho
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animação de elementos ao rolar a página (Scroll Reveal)
    const revealItems = document.querySelectorAll('.reveal-item');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            // Define o ponto de gatilho para a animação
            // No caso, quando o elemento estiver a 100px acima da parte de baixo da tela
            if (itemTop < windowHeight - 100) {
                item.classList.add('is-visible');
            }
        });
    };

    // Adiciona o evento de rolagem e chama a função
    window.addEventListener('scroll', revealOnScroll);
    // Chama a função uma vez no carregamento para os elementos que já estão visíveis
    revealOnScroll();


    // Funcionalidade do menu hambúrguer para dispositivos móveis
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

});

    // NOVA LÓGICA PARA O FORMULÁRIO DE CONTATO
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const object = {};
        formData.forEach((value, key) => object[key] = value);
        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://formsubmit.co/ajax/jorente.benicio@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            if (response.ok) {
                formMessage.textContent = 'Obrigado pelo contato, logo retornaremos!';
                formMessage.classList.add('success');
                contactForm.reset();

                setTimeout(() => {
                    formMessage.classList.remove('success');
                    formMessage.textContent = '';
                }, 5000);
            } else {
                formMessage.textContent = 'Ops! Algo deu errado. Tente novamente mais tarde.';
                formMessage.classList.remove('success');
            }
        } catch (error) {
            console.error('Erro:', error);
            formMessage.textContent = 'Ops! Algo deu errado. Verifique sua conexão e tente novamente.';
            formMessage.classList.remove('success');
        }
    });

