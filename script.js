document.addEventListener('DOMContentLoaded', () => {

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Get navbar height (adjust based on your navbar)
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 70;
            
            // Calculate position with offset
            const targetPosition = target.offsetTop - navbarHeight;
            
            // Smooth scroll to adjusted position
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    const skills = document.getElementById('skills').classList.contains('active');
    const experience = document.getElementById('experience').classList.contains('active');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (skills) {
            current = 'skills';
        }

        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        alert(`Copied: ${email}`);
    }).catch(() => {
        alert('Failed to copy email');
    });
}

function switchTab(tabName, element) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('d-none');
    });

    document.querySelectorAll('.tab-link').forEach(tab => {
        tab.classList.remove('active');
    });

    let tabContent = document.getElementById(tabName + '-content');
    if (tabContent) {
        tabContent.classList.remove('d-none');
        document.getElementById('skills-nav').classList.remove('active');
        document.getElementById('experience-nav').classList.remove('active');
    }
    if (tabName == 'skills') {
        document.getElementById('skills-nav').classList.add('active');
    }
    if (tabName == 'experience') {
        document.getElementById('experience-nav').classList.add('active');
    }

    element.classList.add('active');
    window.scrollTo({
        top: document.getElementById('mixed').offsetTop - document.querySelector('.navbar').offsetHeight + 16,
        behavior: 'smooth'
    });
}