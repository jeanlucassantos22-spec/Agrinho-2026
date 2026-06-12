document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Rolagem Suave ao clicar nos links do menu e botões internos
    const links = document.querySelectorAll('.nav-link, .btn-cta');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if(targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if(targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 90, // Desconto do cabeçalho fixo
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Marcar automaticamente o link ativo no menu conforme rola a tela
    const sections = document.querySelectorAll('header, section, footer');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === current) {
                link.classList.add('active');
            }
        });
    });

    // 3. Clique nos planos (Redirecionamento automático com mensagens customizadas para o Jean)
    const botoesPlanos = document.querySelectorAll('.btn-plan');
    botoesPlanos.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            const nomePlano = this.getAttribute('data-plano');
            let mensagem = `Olá Jean! Estava navegando no site e gostaria de solicitar mais informações sobre o *Plano ${nomePlano}*.`;
            
            if(nomePlano === "Premium") {
                mensagem = "Olá Jean! Gostaria de fazer um orçamento personalizado para um projeto sob demanda.";
            }

            // Codifica a mensagem para formato de URL válida
            const urlWhatsApp = `https://wa.me{encodeURIComponent(mensagem)}`;
            
            // Abre o WhatsApp em nova aba
            window.open(urlWhatsApp, '_blank');
        });
    });
});
