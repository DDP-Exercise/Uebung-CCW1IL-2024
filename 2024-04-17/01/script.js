class Contact {
    constructor(name, phone, email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}

$(document).ready(function() {
    const contactList = [];

    // Laden der vorhandenen Kontakte beim Start der Anwendung
    $.ajax({
        url: 'contacts.json', // Pfad zur JSON-Datei mit den Kontakten
        dataType: 'json',
        success: function(data) {
            contactList.push(...data); // Füge die geladenen Kontakte zur contactList hinzu
            displayContacts(); // Anzeige der geladenen Kontakte
        },
        error: function(xhr, status, error) {
            console.error('Error loading contacts:', status, error);
        }
    });

    $('#contactForm').submit(function(event) {
        event.preventDefault();
        const name = $('#name').val();
        const phone = $('#phone').val();
        const email = $('#email').val();
        const newContact = new Contact(name, phone, email);
        contactList.push(newContact);
        saveContacts(); // Speichern der Kontaktliste in der JSON-Datei
        displayContacts();
        $('#contactForm')[0].reset();
    });

    function displayContacts() {
        $('#contactList').empty();
        contactList.forEach(function(contact, index) {
            $('#contactList').append(`
        <li class="list-group-item">
          <strong>${contact.name}</strong><br>
          Telefon: ${contact.phone}<br>
          E-Mail: ${contact.email}<br>
          <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Löschen</button>
        </li>
      `);
        });
    }

    $('#contactList').on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        contactList.splice(index, 1);
        saveContacts(); // Speichern der Kontaktliste nach dem Löschen eines Kontakts
        displayContacts();
    });

    function saveContacts() {
        $.ajax({
            url: 'save_contacts.php', // Pfad zum PHP-Skript zum Speichern der Kontakte
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(contactList),
            success: function(response) {
                console.log('Contacts saved successfully:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error saving contacts:', status, error);
            }
        });
    }
});
