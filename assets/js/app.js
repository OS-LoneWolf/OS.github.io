/**
 * zz Personal Site Core Scripts - Matte Glass Edition
 */

document.addEventListener('DOMContentLoaded', () => {
  // Highlight active section tab
  highlightActiveTab();

  // Initialize client-side filtering on blog listing page
  initBlogFiltering();
});

/**
 * Normalizes window.location.pathname and adds the 'active' class
 * to the corresponding section tab link.
 */
function highlightActiveTab() {
  const currentPath = window.location.pathname;
  let page = currentPath.split('/').pop();
  
  // Normalize directories / empty roots to index.html
  if (page === '' || page === 'website' || currentPath.endsWith('/')) {
    page = 'index.html';
  }

  const tabLinks = document.querySelectorAll('.section-tabs .tab-link');
  
  tabLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const targetPage = href.split('/').pop();
    
    // Check if path matches page, or if viewing detail page highlight Blog + Notes tab
    if (page === targetPage || 
       (page === 'index.html' && (href === './' || href === '.')) ||
       (page.startsWith('post-') && targetPage === 'blog-notes.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Filter blog items based on category tabs
 */
function initBlogFiltering() {
  const filterBtns = document.querySelectorAll('.filter-tabs .filter-btn');
  const items = document.querySelectorAll('.item-list .writeup-item');
  
  if (filterBtns.length === 0 || items.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      // Toggle active states
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter the items list
      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'flex';
          // Fade in animation
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.2s ease';
            item.style.opacity = '1';
          }, 20);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}
