const searchbutton = document.querySelector('#add-time');
searchbutton.addEventListener('click', clonefield);

function clonefield(){
    const getfield = document.querySelector('.schedule-item').cloneNode(true);
    const getinputs = getfield.querySelectorAll('input');
    getinputs.forEach(field => field.value="");
    const appendfield = document.querySelector('#schedule-items');
    appendfield.appendChild(getfield);    
}
