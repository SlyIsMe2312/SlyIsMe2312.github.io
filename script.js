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
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
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
        console.log(`Switched to ${tabName} tab`);
    }
    element.classList.add('active');
}