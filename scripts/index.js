'use strict';

const content = document.querySelector('.content');
const container = document.querySelector('.grid-container');
const button = document.querySelector('.button');
const input = document.querySelector('.contact-info');
const message = document.querySelector('.message-input p');
const showCount = document.querySelector('.message p');

const contactsArray = new Array();

class Contact {
    #name;
    #city;
    #email;

    constructor(name, city, email) {
        this.#name = name;
        this.#city = city;
        this.#email = email;
    }

    get name() {
        return this.#name;
    }

    get city() {
        return this.#city;
    }

    get email() {
        return this.#email;
    }
}

function addContact(contact) {
    const contactInfo = contact.split(',');
    const contactName = contactInfo[0].trim() ; // removing spaces
    const contactCity = contactInfo[1].trim();
    const contactEmail = contactInfo[2].trim();
    try {
        const newContact = new Contact(contactName, contactCity, contactEmail);
        contactsArray.push(newContact); // adds elements at the beginning of the array
        console.log(contactsArray);
    } catch (error) {
        console.log(error);
    }
}

function showCounter() {
    const count = contactsArray.length;
    showCount.innerHTML = `Saved contacts: ${count}`;
}

function deleteContact(index) {
    contactsArray.splice(index, 1);
    console.log(contactsArray);
    listContacts();
    showCounter();
}

function listContacts() {
    const container = document.createElement('div');
    container.classList.add('grid-container');
    content.replaceChildren(container); 

    contactsArray.forEach((contact) => {
        const div = document.createElement('div');
        div.title = "Click to delete contact";
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        p1.innerHTML = `<b>Name:</b> ${contact.name}`;
        p2.innerHTML = `<b>City:</b> ${contact.city}`;
        p3.innerHTML = `<b>Email:</b> ${contact.email}`;
        container.prepend(div); // Inset before first <div>
       // console.log(div);
        div.addEventListener('click', function() {
           // console.log(contactsArray.lastIndexOf(contact));
            deleteContact(contactsArray.lastIndexOf(contact));
        });
    });
}

// Validation

function isEmail(mail) {
    let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return patternEmail.test(mail);
}

function isName(name) {
    let patternName = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
    return patternName.test(name);
}

function isCity(city) {
    let patternCity = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
    return patternCity.test(city);
}

function isValid(inputVal) {
    const inputArray = inputVal.split(',');
   // console.log(inputArray.length);

    if(!(inputArray.length === 3)) { 
        message.innerHTML = 'Enter 3 values separated with commas! name, city, email'; 
        input.classList.add('invalid'); return false; ///////
    } else {
        inputArray[0] = inputArray[0].trim(); // removing spaces
        inputArray[1] = inputArray[1].trim();
        inputArray[2] = inputArray[2].trim();
        if(!isName(inputArray[0])) { message.innerHTML = 'Invalid name!'; input.classList.add('invalid'); return false;}
        if(!isCity(inputArray[1]) ) { message.innerHTML = 'Invalid city!'; input.classList.add('invalid'); return false;}
        if(!isEmail(inputArray[2])) { message.innerHTML = 'Invalid email! user@email.com'; input.classList.add('invalid'); return false;}
        input.classList.remove('invalid'); /////
        return true;
    }
}

button.addEventListener('click', () => {
    console.log(input.value);
    if (!(input.value === '')) {
        if(isValid(input.value)) {
            addContact(input.value);
            listContacts();
            showCounter();
            message.innerHTML = ' ';
            input.value = '';
        }
    } else {
        message.innerHTML = 'Invalid input! Format: name, city, email';
    }
});