/* display date of creaction and current year */
if (document.querySelector('#createYear')) {
    const createYear = document.querySelector('#createYear');
    const currentYear = new Date().getFullYear();

    if (createYear.textContent != currentYear) {
        createYear.innerText += ` - ${currentYear}`;
    }
}