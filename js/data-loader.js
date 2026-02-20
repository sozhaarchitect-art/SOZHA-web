/* 
   Sozha Architecture - Data Loader 
   Handles fetching and rendering content (Hardcoded for Offline Compatibility)
*/

/* --- DATA SOURCES --- */
const projectsData = [
    {
        "id": "project-new-1",
        "title": "Royal Master Bedroom",
        "category": "interior",
        "location": "Chennai",
        "area": "400 sq.ft",
        "year": "2026",
        "image": "images/luxury-bedroom.png",
        "featured": true,
        "description": "A neo-classical master bedroom design featuring intricate gold molding, custom joinery, and a luxurious ambiance."
    },
    {
        "id": "project-1",
        "title": "The Azure Villa",
        "category": "residential",
        "location": "Chennai, ECR",
        "area": "4,500 sq.ft",
        "year": "2024",
        "image": "https://images.unsplash.com/photo-1600596542815-e32cbeeab7d6?q=80&w=2600&auto=format&fit=crop",
        "featured": true,
        "description": "A luxury beach house designed to maximize ocean views while maintaining privacy. The design integrates sustainable materials with a modern aesthetic."
    },
    {
        "id": "project-2",
        "title": "Urban Heights Office",
        "category": "commercial",
        "location": "Bangalore",
        "area": "12,000 sq.ft",
        "year": "2023",
        "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        "featured": true,
        "description": "A modern workspace fostering collaboration through open design and ergonomic layouts. Glass facades ensure ample natural light throughout the day."
    },
    {
        "id": "project-3",
        "title": "Minimalist Loft",
        "category": "interior",
        "location": "Mumbai",
        "area": "1,200 sq.ft",
        "year": "2025",
        "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2600&auto=format&fit=crop",
        "featured": false,
        "description": "Transforming a compact apartment into a spacious, light-filled sanctuary. Defaulting to neutral tones and natural textures."
    },
    {
        "id": "project-4",
        "title": "Green Valley Resort",
        "category": "landscape",
        "location": "Coorg",
        "area": "3 Acres",
        "year": "2024",
        "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2300&auto=format&fit=crop",
        "featured": true,
        "description": "Eco-friendly resort blending seamlessly with the surrounding nature. Utilizing vernacular architecture techniques."
    },
    {
        "id": "project-5",
        "title": "Skyline Penthouse",
        "category": "residential",
        "location": "Dubai",
        "area": "6,000 sq.ft",
        "year": "2025",
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
        "featured": true,
        "description": "Opulence meets modernity. A high-rise residence with panoramic views and bespoke interior detailing."
    },
    {
        "id": "project-6",
        "title": "Zen Garden House",
        "category": "landscape",
        "location": "Kyoto",
        "area": "2,500 sq.ft",
        "year": "2023",
        "image": "https://images.unsplash.com/photo-1598367772323-38f36fceae77?q=80&w=2600&auto=format&fit=crop",
        "featured": false,
        "description": "A tranquil home surrounded by carefully curated Japanese gardens, blurring the lines between indoor and outdoor spaces."
    },
    {
        "id": "project-7",
        "title": "Tech Hub HQ",
        "category": "commercial",
        "location": "Hyderabad",
        "area": "25,000 sq.ft",
        "year": "2024",
        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
        "featured": false,
        "description": "A futuristic office campus designed for a leading tech giant, featuring smart building systems and sustainable energy solutions."
    },
    {
        "id": "project-8",
        "title": "Industrial Chic Cafe",
        "category": "interior",
        "location": "Pune",
        "area": "1,800 sq.ft",
        "year": "2024",
        "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2694&auto=format&fit=crop",
        "featured": false,
        "description": "Repurposing an old warehouse into a vibrant cafe. Exposed brick walls and raw metal fixtures define the aesthetic."
    },
    {
        "id": "project-9",
        "title": "The Glass Pavilion",
        "category": "residential",
        "location": "Kerala",
        "area": "3,500 sq.ft",
        "year": "2025",
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
        "featured": true,
        "description": "A home that floats above water. Extensive use of structural glass connects the residents directly with the backwaters."
    }
];

// Update Unsplash URLs to be smaller for faster loading
projectsData.forEach(p => {
    if (p.image.includes('unsplash.com')) {
        p.image = p.image.replace('w=2600', 'w=800').replace('w=2700', 'w=800').replace('w=2574', 'w=800').replace('w=2301', 'w=800').replace('w=2300', 'w=800').replace('w=2531', 'w=800');
    }
});

const blogsData = [
    {
        "id": "1",
        "title": "The Future of Sustainable Architecture",
        "date": "Oct 12, 2025",
        "author": "Ar. Sozha",
        "summary": "Exploring how eco-friendly materials and energy-efficient designs are shaping modern homes."
    },
    {
        "id": "2",
        "title": "Minimalism: More Than Just a Trend",
        "date": "Nov 05, 2025",
        "author": "Design Team",
        "summary": "Why clutter-free spaces lead to a clutter-free mind. Tips for achieving the minimal look."
    }
];

/* --- LOGIC --- */

document.addEventListener('DOMContentLoaded', () => {
    // Check which page we are on and load appropriate data
    if (document.getElementById('featured-projects-grid')) {
        loadFeaturedProjects();
    }

    if (document.getElementById('projects-grid')) {
        loadAllProjects();
    }

    if (document.getElementById('project-detail-container')) {
        loadProjectDetails();
    }

    if (document.getElementById('blog-grid')) {
        loadBlogs();
    }

    if (document.getElementById('interiors-grid')) {
        loadInteriorProjects();
    }
});

/* --- Featured Projects (Home) --- */
function loadFeaturedProjects() {
    try {
        const projects = projectsData; // Use hardcoded data
        const container = document.getElementById('featured-projects-grid');
        const featured = projects.filter(p => p.featured).slice(0, 4);

        container.innerHTML = featured.map(project => createProjectCard(project)).join('');

        // Ensure visibility for newly added items
        setTimeout(() => {
            container.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
        }, 100);

        injectHoverStyles();

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

/* --- Interior Projects (Interiors Page) --- */
function loadInteriorProjects() {
    try {
        const projects = projectsData;
        const container = document.getElementById('interiors-grid');

        // Filter for category 'interior'
        const interiors = projects.filter(p => p.category === 'interior');

        renderProjects(interiors, container);
        injectHoverStyles();

    } catch (error) {
        console.error('Error loading interior projects:', error);
    }
}

/* --- All Projects (Portfolio) --- */
function loadAllProjects() {
    try {
        const projects = projectsData; // Use hardcoded data
        const container = document.getElementById('projects-grid');

        // Initial Render
        renderProjects(projects, container);
        injectHoverStyles();

        // Filter Logic
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter data
                const filter = btn.getAttribute('data-filter');
                const filtered = filter === 'all'
                    ? projects
                    : projects.filter(p => p.category === filter);

                renderProjects(filtered, container);
            });
        });

    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<p>Error loading projects.</p>';
    }
}

function renderProjects(projects, container) {
    if (projects.length === 0) {
        container.innerHTML = '<p class="text-center" style="grid-column: 1/-1; opacity: 0.5;">No projects found in this category.</p>';
        return;
    }
    container.innerHTML = projects.map(project => createProjectCard(project)).join('');
    // Simple fade in for new elements
    const cards = container.querySelectorAll('.project-card');
    cards.forEach(card => card.classList.add('visible'));
}

/* --- Project Details --- */
function loadProjectDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('project-detail-container');

    if (!id) {
        container.innerHTML = '<div class="container text-center"><h2>Project not found</h2><a href="projects.html" class="btn">Back to Projects</a></div>';
        return;
    }

    try {
        const projects = projectsData; // Use hardcoded data
        const project = projects.find(p => p.id === id);

        if (!project) {
            container.innerHTML = '<div class="container text-center"><h2>Project not found</h2><a href="projects.html" class="btn">Back to Projects</a></div>';
            return;
        }

        // Render Detail View
        container.innerHTML = `
            <!-- Hero Image -->
            <div style="width: 100%; height: 70vh; margin-bottom: 4rem;">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>

            <!-- Project Info -->
            <section class="container" style="margin-bottom: 4rem; padding-bottom: 4rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <div class="fade-up visible">
                    <span class="uppercase text-accent">${project.category}</span>
                    <h1 style="font-size: 3rem; margin: 1rem 0;">${project.title}</h1>
                        <div>
                            <h3 style="margin-bottom: 1.5rem;">Overview</h3>
                            <p>${project.description}</p>
                            <br>
                            <p>We approached this project with a singular vision: to create a space that transcends the ordinary. By utilizing sustainable materials and optimizing natural light, we engineered an environment that is both aesthetically pleasing and functionally superior.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Gallery Placeholder -->
            <section class="container" style="margin-bottom: 6rem;">
                <h3 style="margin-bottom: 2rem;">Gallery</h3>
                <div class="grid-2">
                    <img src="${project.image}" style="width:100%; aspect-ratio: 4/3; object-fit: cover;" alt="Gallery 1">
                    <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop" style="width:100%; aspect-ratio: 4/3; object-fit: cover; filter: grayscale(20%);" alt="Gallery 2">
                </div>
            </section>
            
            <div class="container text-center">
                 <a href="contact.html?project=${project.id}" class="btn btn-primary">Enquire About Similar Project</a>
            </div>
        `;

    } catch (error) {
        console.error('Error loading detail:', error);
    }
}

/* --- Blogs --- */
function loadBlogs() {
    try {
        const blogs = blogsData; // Use hardcoded data
        const container = document.getElementById('blog-grid');

        container.innerHTML = blogs.map(blog => `
            <div class="blog-card fade-up" style="border: 1px solid rgba(255,255,255,0.1); padding: 2rem; transition: background 0.3s;">
                <span class="text-accent" style="font-size: 0.8rem;">${blog.date}</span>
                <h3 style="margin: 1rem 0;">${blog.title}</h3>
                <p style="font-size: 0.9rem; margin-bottom: 1.5rem;">${blog.summary}</p>
                <a href="#" style="text-decoration: underline; font-size: 0.9rem;">Read More</a>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading blogs:', error);
    }
}

/* --- Utilities --- */
function createProjectCard(project) {
    return `
        <div class="project-card fade-up">
            <a href="project-detail.html?id=${project.id}" class="project-link">
                <div class="project-image-wrapper" style="position: relative; overflow: hidden; aspect-ratio: 4/3;">
                    <img src="${project.image}" alt="${project.title}" 
                         onload="this.classList.add('loaded')" 
                         style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease;">
                    
                    <!-- Gradient Overlay -->
                    <div class="gradient-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.9) 100%); opacity: 0.8; transition: opacity 0.3s ease;"></div>
                    
                    <!-- Hover Overlay (Darken) -->
                    <div class="hover-overlay" style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.4); opacity: 0; transition: opacity 0.3s ease;"></div>

                    <!-- Project Info (Now Inside) -->
                    <div class="project-info" style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 1.5rem; z-index: 2; transform: translateY(10px); transition: transform 0.3s ease;">
                        <span class="category uppercase text-accent" style="font-size: 0.75rem; letter-spacing: 2px; display: block; margin-bottom: 0.5rem;">${project.category}</span>
                        <h3 style="font-size: 1.25rem; margin: 0; color: #fff; font-weight: 500;">${project.title}</h3>
                        <p style="font-size: 0.85rem; opacity: 0.8; color: #d4d4d4; margin-top: 0.25rem;">${project.location}</p>
                    </div>
                </div>
            </a>
        </div>
    `;
}

function injectHoverStyles() {
    if (!document.getElementById('hover-styles')) {
        const style = document.createElement('style');
        style.id = 'hover-styles';
        style.textContent = `
            .project-link:hover img { transform: scale(1.05); }
            .project-link:hover .hover-overlay { opacity: 1; }
            .project-link:hover .project-info { transform: translateY(0); }
            .blog-card:hover { background: rgba(255,255,255,0.05); }
        `;
        document.head.appendChild(style);
    }
}
