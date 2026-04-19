document.addEventListener('DOMContentLoaded', () => {

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 70;
            
            const targetPosition = target.offsetTop - navbarHeight;
            
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
        if (skills && current === 'mixed') {
            current = 'skills';
        }
        if (experience && current === 'mixed') {
            current = 'experience';
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


const projectData = {
    domora: {
        title: "Domora Website",
        images: ['domora-main.png', 'domora-charts.png', 'domora-mobile.png'],
        desc: "Full-stack website with MySQL integration and Chart.js analytics."
    },
    taskflow: {
        title: "TaskFlow AI",
        images: ['profile.jpg', 'profile2.jpg', 'taskflow-pdf.png', 'profile3.jpg', 'b.png', 'a.png', 'b.png', 'a.png', 'b.png', 'a.png', 'b.png', 'a.png', 'b.png', 'a.png', 'b.png', 'a.png', 'b.png'],
        desc: "AI-driven task management system with PDF summary generation."
    }
};

let currentProject = null;
let currentIndex = 0;
let thumbnailsBuilt = false;

function openGallery(key) {
    currentProject = projectData[key];
    currentIndex = 0;
    thumbnailsBuilt = false;
    
    document.getElementById('galleryModal').classList.remove('hidden');
    updateModalView();
}

function updateModalView() {
    const mainImg = document.getElementById('currentMainImg');
    const thumbStrip = document.getElementById('thumbStrip');
    
    mainImg.src = currentProject.images[currentIndex];
    
    // Build thumbnails only once
    if (!thumbnailsBuilt) {
        thumbStrip.innerHTML = '';
        currentProject.images.forEach((img, index) => {
            const t = document.createElement('img');
            t.src = img;
            t.className = 'thumb';
            t.onclick = () => { currentIndex = index; updateModalView(); };
            thumbStrip.appendChild(t);
        });
        thumbnailsBuilt = true;
    }
    
    // Update active class and scroll position
    const thumbs = thumbStrip.querySelectorAll('.thumb');
    thumbs.forEach((thumb, index) => {
        if (index === currentIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

function closeModal() {
    document.getElementById('galleryModal').classList.add('hidden');
}

function changeSlide(dir) {
    currentIndex += dir;
    if (currentIndex < 0) currentIndex = currentProject.images.length - 1;
    if (currentIndex >= currentProject.images.length) currentIndex = 0;
    updateModalView();
}