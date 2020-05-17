/**
 * Client von gofinmon
 * Autor: Team-03
 * Aufteilung der Aufgaben gekennzeichnet durch Namen im jeweiligen Code-Abschnitt
 * Version 1.5 (15.07.2019)
 */

//  Variablen globalisieren von Sophie Multiszewski
let ivorname: JQuery; // i steht für input
let inachname: JQuery;
let igeburtstagtag: JQuery;
let igeburtsmonat: JQuery;
let igeburtsjahr: JQuery;
let iemail: JQuery;
let istrasse: JQuery;
let ihausnr: JQuery;
let iort: JQuery;
let iplz: JQuery;
let itelefonnummer: JQuery;
let ibic: JQuery;
let iiban: JQuery;
let ipasswort: JQuery;
let irepeatpasswort: JQuery;
let forminput: JQuery;
let userid: JQuery;
let pedit: JQuery;
let formedit: JQuery;
let editid: JQuery;
let editmodal: JQuery;
let editvorname: JQuery;
let editnachname: JQuery;
let editgeburtstagtag: JQuery;
let editgeburtsmonat: JQuery;
let editgeburtsjahr: JQuery;
let editemail: JQuery;
let editstrasse: JQuery;
let edithausnr: JQuery;
let editort: JQuery;
let editplz: JQuery;
let edittelefonnummer: JQuery;
let editbic: JQuery;
let editiban: JQuery;
let editpasswort: JQuery;
let lvorname: JQuery;
let lnachname: JQuery;
let profilanzeige: JQuery;
let loeschen: JQuery;
let ikursname: JQuery;
let ipreis: JQuery;
let formkurs: JQuery;
let kursloeschen: JQuery;
let editmodalbtn: JQuery; // Ceyhan Efer
let editmodalkurse: JQuery;
let editmodalbtnkurs: JQuery;
let editkursname: JQuery;
let editpreis: JQuery;
let kurs1: JQuery;
let kurs2: JQuery;
let kurs3: JQuery;
let kurs4: JQuery;
let kursEdit: JQuery;
let kursCreate: JQuery;
let kursSave: JQuery;
let buchen: JQuery;

// Zuweisung erfolgt durch Sophie Multiszewski
$(() => {
    editkursname = $("#editkursname");
    editpreis = $("#editpreis");
    ivorname = $("#vorname");
    inachname = $("#nachname");
    igeburtstagtag = $("#geburtstagtag");
    igeburtsmonat = $("#geburtsmonat");
    igeburtsjahr = $("#geburtsjahr");
    iemail = $("#email");
    istrasse = $("#strasse");
    ihausnr = $("#hausnr");
    iort = $("#ort");
    iplz = $("#plz");
    itelefonnummer = $("#telefonnummer");
    ibic = $("#bic");
    ipasswort = $("#passwort");
    irepeatpasswort = $("#repeatpasswort");
    iiban = $("#iban");
    forminput = $("#forminput");
    userid = $("#userid");
    pedit = $("#edit");
    formedit = $("#formEdit");
    editid = $("#editid");
    editmodal = $("#editmodal");
    editvorname = $("#editvorname");
    editnachname = $("#editnachname");
    editgeburtstagtag = $("#editgeburtstag");
    editgeburtsmonat = $("#editgeburtsmonat");
    editgeburtsjahr = $("#editgeburtsjahr");
    lvorname = $("#lvorname");
    lnachname = $("#lnachname");
    profilanzeige = $("#profilanzeige");
    editemail = $("#editemail");
    editstrasse = $("#editstrasse");
    edithausnr = $("#edithausnr");
    editort = $("#editort");
    editplz = $("#editplz");
    edittelefonnummer = $("#edittelefonnummer");
    editbic = $("#editbic");
    editiban = $("#editiban");
    editpasswort = $("#editpasswort");
    ikursname = $("#kursName");
    ipreis = $("#kursPreis");
    kurs1 = $("#kurs1");
    kurs2 = $("#kurs2");
    kurs3 = $("#kurs3");
    kurs4 = $("#kurs4");
    kursEdit = $("#kursEdit");
    buchen = $("#buchen");
    kursCreate = $("#kursCreate"); // Anastasia Ruppel
    kursSave = $("#kursSave"); // Anastasia Ruppel
    editmodalbtnkurs = $("#editmodalbtnkurs"); // Anastasia Ruppel
    editmodalkurse = $("#editmodalkurse"); // Anastasia Ruppel
    formkurs = $("#formkurs");
    forminput.on("submit", registrieren);
    pedit.on("click", startEdit);
    formkurs.on("submit", Kurs_erstellen);
    kursloeschen = $("#kursDelete");
    kursloeschen.on("click", KursLoeschen);
    editmodalbtn = $("#editmodalbtn"); // Ceyhan Efer
    loeschen = $("#delete"); // Benjamin James Turner
    $("#kursDelete").hide();
    $("#kursCreate").hide();
    $("#kursEdit").hide();
    $("#profil_belegtkurse").hide();
    editmodalbtn.on("click", editUser); // Ceyhan Efer
    loeschen.on("click", deleteUser); // Benjamin James Turner
    editmodalbtnkurs.on("click", editKurs); // Anastasia Ruppel
    kurs1.on("click", Kursanzeigen); // Jessica Palladino
    kurs2.on("click", Kursanzeigen); // Jessica Palladino
    kurs3.on("click", Kursanzeigen); // Jessica Palladino
    kurs4.on("click", Kursanzeigen); // Jessica Palladino
    kursEdit.on("click", startEditKurs);
    kursCreate.on("click", kursBearbeitenAnzeigen);
    kursSave.on("click", Kurs_erstellen);
    $("#navlogoutbtn").on("click", logout);
    checkLogin();
    // Anastasia Ruppel
    $("#loginbtn").on("click", (event) => {
        event.preventDefault();
        const loginemail: string = $("#loginemail").val() as string;
        const loginpasswort: string = $("#loginpasswort").val() as string;
        const data: Object = {
            loginemail: loginemail,
            loginpasswort: loginpasswort,

        };
        clogin(data);
    });
});

// Registrieren Funktion von Sophie Multiszewski, überarbeitet von Jessica Palladino
function registrieren(event: Event) {
    event.preventDefault();
    const vorname: string = ivorname.val().toString().trim();
    const nachname: string = inachname.val().toString().trim();
    const geburtstagtag: number = Number(igeburtstagtag.val());
    const geburtsmonat: number = Number(igeburtsmonat.val());
    const geburtsjahr: number = Number(igeburtsjahr.val());
    const email: string = iemail.val().toString().trim();
    const strasse: string = istrasse.val().toString().trim();
    const hausnr: string = ihausnr.val().toString().trim();
    const ort: string = iort.val().toString().trim();
    const plz: string = iplz.val().toString().trim();
    const telefonnummer: string = itelefonnummer.val().toString().trim();
    const bic: string = ibic.val().toString().trim();
    const iban: string = iiban.val().toString().trim();
    const passwort: string = ipasswort.val().toString().trim();
    const repeatpasswort: string = irepeatpasswort.val().toString().trim();
    const data: Object = { // von Ceyhan Efer
        vorname: vorname,
        nachname: nachname,
        geburtstagtag: geburtstagtag,
        geburtsmonat: geburtsmonat,
        geburtsjahr: geburtsjahr,
        email: email,
        strasse: strasse,
        hausnr: hausnr,
        ort: ort,
        plz: plz,
        telefonnummer: telefonnummer,
        bic: bic,
        iban: iban,
        passwort: passwort,
    };

    // von Anastasia Ruppel
    if (passwort !== repeatpasswort) {
        alert("Die von Ihnen eingegebenen Passwörter stimmen nicht überein");
    } else {

        // Ajax; von Sophie Multiszewski

        $.ajax({
            contentType: "application/json",
            data: JSON.stringify(data),
            error: (jqXHR, textStatus, errorThrown) => {
                alert(jqXHR.responseText);
            },
            success:(data) => {
                ivorname.val("");
                inachname.val("");
                igeburtstagtag.val("");
                igeburtsjahr.val("");
                iemail.val("");
                istrasse.val("");
                ihausnr.val("");
                iort.val("");
                iplz.val("");
                itelefonnummer.val("");
                ibic.val("");
                ipasswort.val("");
                forminput.trigger("reset");
                alert("Registrierung war erfolgreich");
            },
            type: "POST",
            url: "http://localhost:8080/create",
        });
    }
}

// Kurserstellen Funktion (Admin); Sophie Multiszewski
function Kurs_erstellen(event: Event) {
    event.preventDefault();
    const kursname: string = ikursname.val().toString().trim();
    const preis: string = ipreis.val().toString().trim();
    $.ajax({
        contentType: "application/json",
        data: JSON.stringify({
            kursname,
            preis,
        }),
        error: (jqXHR, textStatus, errorThrown) => {
            alert(jqXHR.responseText);
        },
        success: (data) => {// wird vom server ausgeführt
            console.log(data);
            ikursname.val("");
            ipreis.val("");
            $("#kursCreate").show();
            $("#kursSave").hide();
            alert("Kurs wurde erfolgreich hinzugefügt");
        },
        type: "POST",
        url: "http://localhost:8080/createKurs",
    });

}

// LOGIN von Sophie Multiszewski
function clogin(data) {
    $.ajax({
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        url: "http://localhost:8080/login",
        type: "POST",
        error: (jqXHR) => {
            alert(jqXHR.responseText);


        },
        success: (data) => {  // Ergänzung von Anastasia Ruppel
            console.log(data);
            $("#navloginbtn").hide();
            $("#navlogoutbtn").show();
            $("#registrieren").hide();
            $("#hreg").hide();
            $("#hprofil").show();
            $("#edit").show();
            $("#delete").show();
            $("#geheimnis").hide();
            $("#login").hide();
            $("#loginemail").val("");
            $("#loginpasswort").val("");
            $("#profil_belegtkurse").show();
            $("#edit").attr("pk_benutzer_id", data.id); // von Sophie Multiszewski
            $("#editmodalbtn").attr("pk_benutzer_id", data.id);
            $("#delete").attr("pk_benutzer_id", data.id);
            $("#KursDelete").attr("pk_kurs_id", data.id);
            alert("Sie sind erfolgreich angemeldet");
            if ( data.benutzergruppe !== 2) { // ab Zeile 286; Sophie Multiszewski
                 $("#kursDelete").hide();
                  $("#kursCreate").hide();
                $("#kursEdit").hide();
                $("#buchen").show();
            } else {
                $("#kursDelete").show();
                $("#kursCreate").show();
                $("#kursEdit").show();
                $("#buchen").hide();
            }

            anzeigen(data);
        },
    });
}

// Logout von Jessica Palladino & Benjamin James Turner
function logout() {
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/logout",
        error: (jqXHR) => {
            alert("Fehler bei der Abmeldung");
        },
        success: () => {
            $("#navlogoutbtn").hide();
            $("#navloginbtn").show();
            $("#edit").hide();
            $("#delete").hide();
            $("#registrieren").show();
            $("#geheimnis").show();
            $("#profilvorname").hide();
            $("#profilnachname").hide();
            $("#reginputs").show();
            $("#login").show();
            $("#profil_belegtkurse").hide();// Ceyhan Efer und Sophie Multiszewski
            alert("Sie sind erfolgreich abgemeldet");
        },
    });
}

// von Jessica Palladino & Anastasia Ruppel
function checkLogin() {
    $.ajax({
        url: "http://localhost:8080/login/check",
        type: "GET",
        dataType: "json",
        error: (jqXHR) => {
            $("#navloginbtn").show(); // von Sophie Multiszewski
            $("#navlogoutbtn").hide(); // von Sophie Multiszewski
        },
        success: (data) => {
           $("#navlogoutbtn").show(); // von Sophie Multiszewski
           $("#navloginbtn").hide(); // von Sophie Multiszewski
            $("#login").hide(); // Ceyhan Efer und Sophie Multiszewski
            $("#geheimnis").hide();
            $("#registrieren").hide();// Ceyhan Efer und Sophie Multiszewski
            $("#hreg").hide();// Ceyhan Efer und Sophie Multiszewski
            $("#hprofil").show();// Ceyhan Efer und Sophie Multiszewski
            $("#profil_belegtkurse").show();// Ceyhan Efer und Sophie Multiszewski

            console.log(data);

            anzeigen(data);


        },
    });
}

// Profil anzeigen von Jessica Palladino & Anastasia Ruppel
function anzeigen(data: any) {
    $("#reginputs").hide();
    $("#profilvorname").show().html(data.vorname);
    $("#profilnachname").show().html(data.nachname);
}

// Profil löschen von Benjamin Turner & Jessica Palladino
function deleteUser(event: Event) {
    const pk_benutzer_id: string = $(this).attr("pk_benutzer_id");
    $.ajax({
        type: "DELETE",
        url: "/delete/benutzer/" + pk_benutzer_id,
        error: (jqXHR) => {
            alert("Fehler");
        },
        success: (data) => {
            alert("Benutzer gelöscht");
            logout();
        },
    });
}

// Wenn das Modalfenster geöffnet wird, befinden sich die Daten des Nutzers darin; Sophie Multiszewski
function startEdit() {
    const id: string = $(this).attr("pk_benutzer_id");

    $.ajax({
        error: (jqXHR, textStatus, errorThrown) => {
            alert(jqXHR.responseText);
        },
        success: (data) => {
            editmodal.modal("show");
            editvorname.val(data.vorname);
            editnachname.val(data.nachname);
            editgeburtstagtag.val(data.geburtstagtag);
            editgeburtsmonat.val(data.geburtsmonat);
            editgeburtsjahr.val(data.geburtsjahr);
            editemail.val(data.email);
            editstrasse.val(data.strasse);
            edithausnr.val(data.hausnr);
            editort.val(data.ort);
            editplz.val(data.plz);
            edittelefonnummer.val(data.telefonnummer);
            editbic.val(data.bic);
            editiban.val(data.iban);
            editpasswort.val(data.passwort);
        },
        type: "GET",
        url: "http://localhost:8080/benutzer/" + id,
    });
}

// Profil bearbeiten (User) von Ceyhan Efer
function editUser(event: Event) {
    // event.preventDefault();
    const id: string = $(this).attr("pk_benutzer_id");
    const vorname: string = editvorname.val().toString().trim();
    const nachname: string = editnachname.val().toString().trim();
    const geburtstagtag: number = Number(editgeburtstagtag.val());
    const geburtsmonat: string = editgeburtsmonat.val().toString().trim();
    const geburtsjahr: number = Number(editgeburtsjahr.val());
    const email: string = editemail.val().toString().trim();
    const strasse: string = editstrasse.val().toString().trim();
    const hausnr: string = edithausnr.val().toString().trim();
    const ort: string = editort.val().toString().trim();
    const plz: string = editplz.val().toString().trim();
    const telefonnummer: string = edittelefonnummer.val().toString().trim();
    const bic: string = editbic.val().toString().trim();
    const iban: string = editiban.val().toString().trim();
    const passwort: string = editpasswort.val().toString().trim();
    const data: Object = {
        vorname: vorname,
        nachname: nachname,
        geburtstagtag: geburtstagtag,
        geburtsmonat: geburtsmonat,
        geburtsjahr: geburtsjahr,
        email: email,
        strasse: strasse,
        hausnr: hausnr,
        ort: ort,
        plz: plz,
        telefonnummer: telefonnummer,
        bic: bic,
        iban: iban,
        passwort: passwort,
    };

    $.ajax({
        contentType: "application/json",
        data: JSON.stringify(data),
        error: (jqXHR, textStatus, errorThrown) => {
            // alert("Status: " + textStatus + "\nFehler: " + errorThrown);
            alert("Bitte alle Felder ausfüllen"); // nutzerfreundlicher
        },
        success: (data) => {
            editmodal.trigger("reset");
            editmodal.modal("hide");
            anzeigen(data);
            alert("Der Nutzer wurde erfolgreich editiert");
        },
        type: "PUT",
        url: "http://localhost:8080/update/" + id,
    });

}

// Kurs-Detailseite: Modalfenster zum Editieren öffnen; Anastasia Ruppel
function startEditKurs() {
    const id: string = $(this).attr("pk_kurs_id");

    $.ajax({
        error: (jqXHR, textStatus, errorThrown) => {
            alert(jqXHR.responseText);
        },
        success: (data) => {
            editmodalkurse.modal("show");
            editkursname.val(data.kursname);
            editpreis.val(data.preis);
            $("#editmodalbtnkurs").attr("pk_kurs_id", id);
        },
        type: "GET",
        url: "http://localhost:8080/kursauslesen/" + id,
    });
}

// Kurs-Detailseite bearbeiten (Admin) von Anastasia Ruppel
function editKurs() {
    const id: string = $(this).attr("pk_kurs_id");
    const kursname: string = editkursname.val().toString().trim();
    const preis: string = editpreis.val().toString().trim();
    const data: Object = {
        kursname: kursname,
        preis: preis,
    };

    $.ajax({
        contentType: "application/json",
        data: JSON.stringify(data),
        error: (jqXHR, textStatus, errorThrown, ) => {
            //alert("Status: " + jqXHR.responseJSON);
            alert(errorThrown); // Sophie Multiszewski
            //alert("Bitte alle Felder ausfüllen");
        },
        success: (data) => {
            editmodalkurse.modal("hide");
            showKurs(data);
            alert(data.message); // Sophie Multiszewski
        },
        type: "PUT",
        url: "http://localhost:8080/kursupdate/" + id,
    });

}

// Jessica Palladino und Ceyhan Efer
function showKurs(data: any) {
    $("#kursName").hide(); // id = inputfeld
    $("#kursPreis").hide(); // id = neuer Preis
    $("#kursNewName").show().html(data.kursname); // id = neues Feld
    $("#newPreis").show().html(data.preis); // id = preisfeld
}

// Funktion Kursanzeigen; Ceyhan Efer & Jessica Palladino
function Kursanzeigen() {
    const id: string = $(this).attr("pk_kurs_id");
    $.ajax({
        error: (jqXHR, textStatus, errorThrown) => {
            alert(jqXHR.responseText);
        },
        success: (data) => {
            ipreis.val(data.preis);
            ikursname.val(data.kursname);
            $("#kursDelete").attr("pk_kurs_id", id); // von Sophie Multiszewski
            $("#kursEdit").attr("pk_kurs_id", id);
            showKurs(data);
        },
        type: "GET",
        url: "http://localhost:8080/kursauslesen/" + id,
    });
}

// Klickfunktion zum Anzeigen der Inputfelder zum Editieren der Kurse von Anastasia Ruppel
function kursBearbeitenAnzeigen() {
    $("#kursNewName").hide();
    $("#kursName").show();
    $("#newPreis").hide();
    $("#kursPreis").show();
    $("#kursCreate").hide();
    $("#kursSave").show();
}

// Anzeigen der editierten Daten; Anastasia Ruppel
function kursdatenAnzeigen(data: any) {
    $("#kursName").hide();
    $("#kursNewName").show().html(data.kursname); // wichtig: bei Server müssen diese Daten mitgesendet werden
    $("#kursPreis").hide();
    $("#newPreis").show().html(data.preis); // hier ebenfalls (also kursname und preis)
    $("#kursSave").hide();
    $("#kursCreate").show();
}

// Kurs löschen (Admin); Sophie Multiszewski
function KursLoeschen() {
    const pk_kurs_id: string = $(this).attr("pk_kurs_id");
    $.ajax({
        type: "DELETE",
        url: "/delete/kurs/" + pk_kurs_id,
        error: (jqXHR, textStatus, errorThrown) => {
            alert(jqXHR.responseText);
        },
        success: (data) => {
            alert("Kurs wurde erfolgreich gelöscht");
            $("#kursNewName").hide().html(data.kursname);
            $("#newPreis").hide().html(data.preis);
        },
    });
}
