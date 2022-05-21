


const baseUrl = 'http://localhost:3000';

const dob = document.getElementById("dob");

function restrictFutureDates(dateElement) {
    let dtToday = new Date();

    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    let maxDate = year + '-' + month + '-' + day;  
    let minDate = (year - 999) + '-' + month + '-' + day; 

    dateElement.setAttribute('max', maxDate);
    dateElement.setAttribute('min', minDate);
}

restrictFutureDates(dob);

function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
   document.getElementById("age").value =  Number(age);
}

dob.addEventListener("change", function(event) {
    getAge(event.target.value)
})

function limitKeypress(event, value, maxLength) {
    if (value != undefined && value.toString().length >= maxLength) {
        event.preventDefault();
    }
}

function avoidSpecialCharacters(event) {
    var character = String.fromCharCode(event.keyCode);
    if (!/[^$%!+]/i.test(character)) {
        event.preventDefault();
    }
}

function allowOnlyAlphabets(event, value, maxLength) {
    if (value != undefined && value.toString().length >= maxLength) {
        event.preventDefault();
    }
    if(!((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123))) {
        event.preventDefault()
    }
}

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });



async function createEmployee() {

    let employee_id = params.employee_id;
    console.log(employee_id)
    
    let employee_name = document.getElementById("name");
    let dob = document.getElementById("dob");
    let age = document.getElementById("age"); 
    let mobile_no = document.getElementById("mobile_no");
    let address1 = document.getElementById("address1");
    let address2 = document.getElementById("address2");
    let pincode = document.getElementById("pincode");
    let state = document.getElementById("state");
    let country = document.getElementById("country");

    let data = {
        employee_name: employee_name.value,
        age: age.value,
        mobile_number: mobile_no.value,
        pincode: pincode.value,
        dob: dob.value,
        address_line1: address1.value,
        address_line2: address2.value,
        state_id: state.value,
        country_id: country.value,
    }


    if(employee_id && employee_id > 0) {
        await fetch(`${baseUrl}/update/${employee_id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }) 
    } else {
        await fetch(`${baseUrl}/create`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
    }

}


