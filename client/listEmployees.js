window.onload = async function() {
    const baseUrl = 'http://localhost:3000';
    let employees = await (await fetch(`${baseUrl}/employees`)).json();
    const container = document.getElementsByClassName('cards')[0];

    employees.forEach((employee, idx) => {
        const content = `
           <div class="card card-1" id=${idx}>
            <p class="card__exit" data-employee_id="${employee.employee_id}"><i class="fas fa-times"></i></p>
              <h3 class="card__title">Name: ${employee.employee_name}
                <p>Age: ${employee.age}</p>
                <p>Mobile Number: ${employee.mobile_number}</p>
                <p>Address: ${employee.address_line1}</p>
              </h3>
              <p class="card__apply">
                <a class="card__link" href="./index.html?employee_id=${employee.employee_id}">Update Now <i class="fas fa-arrow-right"></i></a>
              </p>
            </div>
        `;
        container.innerHTML += content;
})

const allCardsArr = document.querySelectorAll('.card__exit');
    allCardsArr.forEach(function(card) {
    card.addEventListener('click', async function() {
        
        let employee_id = this.getAttribute('data-employee_id');

        await fetch(`${baseUrl}/delete/${employee_id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        window.location.reload();
    });
});



};
