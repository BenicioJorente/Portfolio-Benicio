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

    // Função para o formulário de contato
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Mostrar loading
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                formMessage.textContent = '';
                formMessage.className = 'form-message';
                
                try {
                    const formData = new FormData(this);
                    
                    const response = await fetch(this.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        formMessage.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
                        formMessage.className = 'form-message success';
                        contactForm.reset();
                    } else {
                        throw new Error('Erro ao enviar mensagem');
                    }
                    
                } catch (error) {
                    console.error('Erro:', error);
                    formMessage.textContent = 'Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.';
                    formMessage.className = 'form-message error';
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }

    // Inicializar formulário de contato
    initContactForm();
});