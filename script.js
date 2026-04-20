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
        console.log('Email copied to clipboard');
    }).catch(() => {
        console.error('Failed to copy email');
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
        images: ['assets/domora/1.png', 'assets/domora/2.png',  'assets/domora/3.png',  'assets/domora/4.png',  'assets/domora/5.png',  'assets/domora/6.png',  'assets/domora/7.png',  'assets/domora/8.png',  'assets/domora/9.png',  'assets/domora/10.png',  'assets/domora/11.png',  'assets/domora/12.png',
              'assets/domora/13.png',  'assets/domora/14.png',  'assets/domora/15.png',  'assets/domora/16.png',  'assets/domora/17.png',  'assets/domora/18.png',  'assets/domora/19.png',  'assets/domora/20.png',  'assets/domora/21.png',  'assets/domora/22.png',  'assets/domora/23.png'],
        desc: "Full-stack website with MySQL integration and Chart.js analytics."
    },
    taskflow: {
        title: "TaskFlow AI",
        images: ['assets/taskflow/1.png', 'assets/taskflow/2.png', 'assets/taskflow/3.png', 'assets/taskflow/4.png', 'assets/taskflow/5.png', 'assets/taskflow/6.png', 'assets/taskflow/7.png', 'assets/taskflow/8.png', 'assets/taskflow/9.png', 'assets/taskflow/10.png',  'assets/taskflow/11.png',  'assets/taskflow/12.png',  'assets/taskflow/13.png',  'assets/taskflow/14.png',  'assets/taskflow/15.png'],
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