document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.navbar-burger').forEach(burger => {
    const menu = document.getElementById(burger.dataset.target)
    if (!menu) {
      console.error(`Navbar menu not found: ${burger.dataset.target}`)
      return
    }

    burger.addEventListener('click', () => {
      const isActive = burger.classList.toggle('is-active')
      menu.classList.toggle('is-active', isActive)
      burger.setAttribute('aria-expanded', String(isActive))
    })
  })

  document.querySelectorAll('.navbar-item.has-dropdown > .navbar-link').forEach(link => {
    link.addEventListener('click', event => {
      if (window.matchMedia('(max-width: 1023px)').matches) {
        event.preventDefault()
        const dropdown = link.parentElement
        const isActive = dropdown.classList.toggle('is-active')
        link.setAttribute('aria-expanded', String(isActive))
      }
    })
  })
})