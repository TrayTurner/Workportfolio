/**
 * Server von gofinmon
 * Autor: Team-03
 * Aufteilung der Aufgaben gekennzeichnet durch Namen im jeweiligen Code-Abschnitt
 * Version 1.5 (15.07.2019)
 */

// Import & Konfiguration des Servers; Anastasia Ruppel

import * as express from "express";
import * as mysql from "mysql";
import {MysqlError} from "mysql";
import * as session from "Express-Session"; // von Sophie Multiszewski

const router: express.Express = express();

router.use("/", express.static(__dirname + "/client")); // Korrigiert von Anastasia
router.use(express.urlencoded({extended: false}));
router.use(express.json());

// Freigabe des Assets Ordner, damit die Bilder, Icons und CSS mit der HTML mitgeschickt werden; Ceyhan Efer
router.use("/Assets", express.static("Assets"));
// Server schickt HTML; Ceyhan Efer
router.get("/", (request, response) => {

    response.sendFile(__dirname + "/client/index.html");
});
// Session Einbindung; Sophie Multiszewski
router.use(session({
    cookie: {
        expires: new Date(Date.now() + (1000 * 60 * 60)),
    },
    secret: Math.random().toString(),
}));

// Import & Konfiguration der Datenbankanbindung; Anastasia Ruppel
const connection: mysql.Connection = mysql.createConnection({
    database: "gofinmon",
    host: "localhost",
    password: "", // muss aber eigentlich unbedingt verschlüsselt sein
    user: "root",
});

// Verbindungsaufbau zur Datenbank; Anastasia Ruppel

connection.connect((err: mysql.MysqlError) => {
    if (err === undefined) {
        console.log("Fehler im Verbindungsaufbaus: " + err);
    } else {
        console.log("Die Verbindung wurde erfolgreich aufgebaut");
    }
});

// Erstellung der Klasse User; Ceyhan Efer

class User {
    public userid: number;
    private vorname: string;
    private nachname: string;
    private geburtstagtag: number;
    private geburtsmonat: number;
    private geburtsjahr: number;
    public email: string;
    private strasse: string;
    private hausnr: string;
    private ort: string;
    private plz: string;
    private telefonnummer: string;
    private bic: string;
    private iban: string;
    public passwort: string;
    public fk_benutzergruppen_id: number; // komplette Gruppenzuweisung von Sophie Multiszewski
    // jedem User wird bei der Registrierung die fk_benutzergruppen_id = 4 zugewiesen

    constructor(userid: number, vorname: string, nachname: string, geburtstagtag: number,
                geburtsmonat: number, geburtsjahr: number, email: string, strasse: string,
                hausnr: string, ort: string, plz: string, telefonnummer: string, bic: string,
                iban: string, passwort: string, fk_benutzergruppen_id: number) {
        this.userid = userid;
        this.vorname = vorname;
        this.nachname = nachname;
        this.geburtstagtag = geburtstagtag;
        this.geburtsmonat = geburtsmonat;
        this.geburtsjahr = geburtsjahr;
        this.email = email;
        this.strasse = strasse;
        this.hausnr = hausnr;
        this.ort = ort;
        this.plz = plz;
        this.telefonnummer = telefonnummer;
        this.bic = bic;
        this.iban = iban;
        this.passwort = passwort;
        this.fk_benutzergruppen_id = fk_benutzergruppen_id; // in der datenbank fk_benutzergruppen_id
    }
}

// Klasse Kurs zur Bearbeitung dieser im Client - Benjamin James Turner
class Kurs {
    public kursid: number;
    public kursname: string;
    public preis: string;
    public fk_benutzer_id: number;

    constructor(kursid: number, kursname: string, preis: string, fk_benutzer_id: number) {
        this.kursid = kursid;
        this.kursname = kursname;
        this.preis = preis;
        this.fk_benutzer_id = fk_benutzer_id;
    }
}

// Post Route für die Erstellung eines Kurses (Admin); Sophie Multiszewski
router.post("/createKurs", (req, res, next) => {
    // console.log(req.session.fk_benutzergruppen_id);
   // console.log("Bei createKurs: " + typeof req.session.fk_benutzegruppen_id);
   // console.log("Bei createKurs: " + req.session.fk_benutzegruppen_id);

    if (req.session.fk_benutzegruppen_id === 2) { // Benutzergruppe Bedingung erstellt; Sophie Multiszewski
        const createQuery: string = "INSERT INTO kurs ( fk_benutzer_id, kursname, preis) VALUES (?, ?, ?);";
        const kurse = req.body;
        const fk_benutzer_id: number = req.session.fk_benutzegruppen_id;
        const kursname: string = kurse.kursname;
        const preis: string = kurse.preis;
        // console.log("Te: ");
        if (kursname === "" || preis === "") {
            res.status(400);
            res.send("Bitte alles ausfüllen");
        } else {
            connection.query(createQuery, [fk_benutzer_id, kursname, preis],
                (err: mysql.MysqlError | null) => {
                    if (err === null) {
                        res.status(201);
                        res.send("Kurs erfolgreich hinzugefügt");
                    } else {
                        console.log(err);
                        res.status(500);
                        res.send("Erstellung eines Kurses fehlgeschlagen");
                    }
                });
        }
    } else {
        res.status(401).send("Nicht erlaubt");
    }
});

// Login Grundgerüst: Sophie Multiszewski, Funktion: Benjamin James Turner,
// Bearbeitet von Anastasia Ruppel und Ceyhan Efer

router.post("/login", function(req: express.Request, res: express.Response): void {
    const status: number = 500;
    const message: string = "";
    const email: string = req.body.loginemail;
    const passwort: string = req.body.loginpasswort;
    const vorname: string = req.body.vorname;
    const nachname: string = req.body.nachname;
    const fk_benutzergruppen_id = req.body.fk_benutzergruppen_id;

    console.log(email); //Wurde zum Testen benutzt.
    console.log(passwort);
    if (email !== undefined && passwort !== undefined) {
        let query: string;
        const getData: [string, string] = [email, passwort];
        query = "SELECT pk_benutzer_id, email, passwort, vorname, nachname, fk_benutzergruppen_id FROM benutzer " +
            "WHERE email = ? AND passwort = ?;";

        connection.query(query, getData, function(err: MysqlError | null, rows: any) {
            if (!err) {
                // console.log(err);
                console.log(rows);
                // console.log(rows[0].fk_benutzergruppen_id);
                if (rows.length > 0) {
                    if (rows[0].passwort === passwort) {
                        console.log((rows[0].vorname));
                        req.session.loginemail = email;
                        req.session.loginpasswort = passwort;
                        req.session.vorname = rows[0].vorname;
                        req.session.nachname = rows[0].nachname;
                        req.session.benutzer_id = rows[0].pk_benutzer_id; // wichtig für die get, put, delete route
                        req.session.kurs_id = rows[0].pk_kurs_id;
                        req.session.fk_benutzegruppen_id = rows[0].fk_benutzergruppen_id; // wichtig für die Gruppenzuweisung
                        req.session.fk_benutzer_id = rows[0].fk_benutzer_id;
                        console.log("Bei Login:" + req.session.fk_benutzegruppen_id);
                        res.status(200);
                        res.json({
                            id: rows[0].pk_benutzer_id,
                            nachname: rows[0].nachname,
                            vorname: rows[0].vorname,
                            benutzergruppe: rows[0].fk_benutzergruppen_id,
                        });

                    } else {
                        res.status(401);
                        res.send("Das Passwort ist nicht richtig");
                    }
                } else {
                    res.status(401);
                    res.send("E-Mail und Passwort stimmen nicht überein");
                }
            } else {
                res.status(505);
                res.send("Fehler in der Datenbank" + err.code);
            }
        });
    } else {
        res.status(400);
        res.send("Nicht alle nötigen Daten eingegeben");
    }
});

// GET-Route für Profil anzeigen von Jessica Palladino & Anastasia Ruppel
router.get("/login/check", (req: express.Request, res: express.Response) => {

    if (req.session.benutzer_id === undefined) {
        res.status(404);
        res.send("Benutzer ist nicht eingeloggt");
    } else {
        res.status(200);
        console.log("Im checkLogin: " + req.session.fk_benutzegruppen_id);
        res.json({
            nachname: req.session.nachname,
            vorname: req.session.vorname,
        });
    }
});

// POST-Route für die Registrierung; Ceyhan Efer

router.post("/create", (req: express.Request, res: express.Response, next) => {
    const vorname: string = req.body.vorname;
    const nachname: string = req.body.nachname;
    const geburtstagtag: number = req.body.geburtstagtag;
    const geburtsmonat: number = req.body.geburtsmonat;
    const geburtsjahr: number = req.body.geburtsjahr;
    const email: string = req.body.email;
    const strasse: string = req.body.strasse;
    const hausnr: string = req.body.hausnr;
    const ort: string = req.body.ort;
    const plz: string = req.body.plz;
    const telefonnummer: string = req.body.telefonnummer;
    const bic: string = req.body.bic;
    const iban: string = req.body.iban;
    const passwort: string = req.body.passwort;
    const fk_benutzergruppen_id: number = 4; // Content User ist die 4 in der DB

    if (vorname === "" || nachname === "" || geburtstagtag.toString() === "" || geburtsmonat.toString() === "" ||
        geburtsjahr.toString() === "" ||
        email === "" || strasse === "" || hausnr === "" || ort === "" || plz === ""
        || telefonnummer === "" ||
        bic === "" || iban === "" || passwort === "") {
        res.status(400);
        res.send("Bitte alles ausfüllen");
    } else {
        const createQuery: string = "INSERT INTO benutzer (vorname, nachname, geburtstagtag, geburtsmonat, " +
            "geburtsjahr, email, strasse, hausnr, ort, plz, telefonnummer, bic, iban, passwort, " +
            "fk_benutzergruppen_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        connection.query(createQuery, [vorname, nachname, geburtstagtag, geburtsmonat, geburtsjahr, email,
                strasse, hausnr, ort, plz, telefonnummer, bic, iban, passwort, fk_benutzergruppen_id],
            (err: mysql.MysqlError | null) => {
                if (err === null) {
                    res.status(201);
                    res.send("Benutzer erfolgreich registriert");
                } else if (email === email) {// Benjamin James Turner
                    res.status(400);
                    res.send("E-Mail schon registriert");
                } else {
                    res.status(500);
                    res.send("Registrierung fehlgeschlagen.");
                }
            });
    }
});

// PUT-Route für Profil bearbeiten; Ceyhan Efer
router.put("/update/:id", (req: express.Request, res: express.Response, next) => {
    const id: number = req.params.id;
    const vorname: string = req.body.vorname;
    const nachname: string = req.body.nachname;
    const geburtstagtag: number = req.body.geburtstagtag;
    const geburtsmonat: string = req.body.geburtsmonat;
    const geburtsjahr: number = req.body.geburtsjahr;
    const email: string = req.body.email;
    const strasse: string = req.body.strasse;
    const hausnr: string = req.body.hausnr;
    const ort: string = req.body.ort;
    const plz: string = req.body.plz;
    const telefonnummer: string = req.body.telefonnummer;
    const bic: string = req.body.bic;
    const iban: string = req.body.iban;
    const passwort: string = req.body.passwort;

    if (vorname === "" || nachname === "" || geburtstagtag.toString() === "" || geburtsmonat === "" ||
        geburtsjahr.toString() === "" ||
        email === "" || strasse === "" || hausnr === "" || ort === "" || plz === "" // undefined in "" geändert v. S.M.
        || telefonnummer === "" ||
        bic === "" || iban === "" || passwort === "") {
        res.status(400);
        res.send("Bitte alles ausfüllen");
    } else {
        const updateQuery: string = "UPDATE benutzer SET vorname = ?, nachname = ?, geburtstagtag = ?, " +
            "geburtsmonat = ?, geburtsjahr = ?, email = ?, strasse = ?, hausnr = ?, ort = ?, plz = ?, " +
            "telefonnummer = ?, bic = ?, iban = ?, passwort = ? WHERE pk_benutzer_id = ?;";
        connection.query(updateQuery, [vorname, nachname, geburtstagtag, geburtsmonat, geburtsjahr, email,
                strasse, hausnr, ort, plz, telefonnummer, bic, iban, passwort, id],
            (err: mysql.MysqlError | null, results: any) => {
                if (err === null) {
                    if (results.affectedRows === 1) {
                        res.status(200);
                        res.send({
                            message: "Der Nutzer wurde erfolgreich editiert",
                            vorname: vorname,
                            nachname: nachname,
                        });
                    } else {
                        res.status(404);
                    }
                } else {
                    res.status(500);
                }
            });
    }
});

// Test get route;Ceyhan Efer
router.get("/benutzer/:id", (request, response, next) => {
    const id = request.params.id; // id wird hier gespeichert
    const readQuery: string = "SELECT * FROM benutzer WHERE pk_benutzer_id = ?;";
    connection.query(readQuery, [id],
        (err: mysql.MysqlError | null, results: any) => {
            // console.log(err);
            if (err === null) {
                if (results.length === 1) {
                    const user: User = new User( // ab Zeile 333 überbearbeitet von Sophie Multiszewski
                        results[0].userid,
                        results[0].vorname,
                        results[0].nachname,
                        results[0].geburtstagtag,
                        results[0].geburtsmonat,
                        results[0].geburtsjahr,
                        results[0].email,
                        results[0].strasse,
                        results[0].hausnr,
                        results[0].ort,
                        results[0].plz,
                        results[0].telefonnummer,
                        results[0].bic,
                        results[0].iban,
                        results[0].passwort,
                        results[0].fk_benutzergruppen_id,
                    );
                    response.status(200);
                    response.json(user);
                } else {
                    response.sendStatus(404);
                }
            } else {
                response.sendStatus(500);
            }
        });
});

// Logout Route: Jessica Palladino & Benjamin James Turner
router.post("/logout", logout);

// Beendet die Session von Jessica Palladino & Benjamin James Turner
function logout(req: express.Request, res: express.Response): void {
    console.log("Alarm Logout");
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.sendStatus(200);
    });
}

// GET-Route von Jessica Palladino & Anastasia Ruppel
router.get("/login/check", (req: express.Request, res: express.Response) => {

    if (req.session.benutzer_id === undefined) {
        res.sendStatus(404);
        alert("Fehler");
    } else {
        res.status(200);
        alert("login checked");
    }
});

// Route zum Löschen eines Users von Benjamin James Turner

router.delete("/delete/benutzer/:id", (req: express.Request, res: express.Response) => {

        const deleteUser: string = "DELETE FROM `benutzer` WHERE `pk_benutzer_id`= ?;";

        connection.query(deleteUser, [req.params.id], (err: MysqlError, result: any) => {
            if (!err) {

                res.send("Benutzer gelöscht").status(200);

            } else {
                res.send("Fehler in der Datenbank" + err.code).status(505);
            }

        });
    },
);

// PUT-Route zum Updaten des Kursnamen (& Preises) in der Kurs-Detailansicht von Anastasia Ruppel,
// überarbeitet von Ceyhan Efer

router.put("/kursupdate/:id", (req: express.Request, res: express.Response) => {
    if (req.session.fk_benutzegruppen_id === 2) {
        const kursid: number = req.params.id;
        const kursname: string = req.body.kursname;
        const preis: string = req.body.preis;

        if (kursname === "" || preis === "") {
            res.status(400);
            res.send("Bitte alles ausfüllen");
        } else {
            const updateQuery: string = "UPDATE kurs SET kursname = ?, preis = ? WHERE pk_kurs_id = ?;";
            connection.query(updateQuery, [kursname, preis, kursid],
                (err: mysql.MysqlError | null, results: any) => {
                    if (err === null) {
                        if (results.affectedRows === 1) {
                            res.status(200);
                            res.json({
                                message: "Der Kurs wurde erfolgreich editiert",
                                kursname: kursname,
                                preis: preis,
                            });
                        } else {
                            res.status(404);
                        }
                    } else {
                        res.status(500);
                    }
                });
        }
    } else {
        res.status(401).json({message: "Nicht erlaubt!"});
    }
});


// GET-Route Kurs anzeigen; Ceyhan Efer & Jessica Palladino
router.get("/kursauslesen/:id", (request, response, next) => {
    const id = request.params.id; // id wird hier gespeichert
    const readQuery: string = "SELECT * FROM kurs WHERE pk_kurs_id = ?;";
    connection.query(readQuery, [id],
        (err: mysql.MysqlError | null, results: any) => {
            // console.log(err);
            if (err === null) {
                if (results.length === 1) {
                    const kurs: Kurs = new Kurs(
                        results[0].kursid,
                        results[0].kursname,
                        results[0].preis,
                        results[0].fk_benutzer_id,
                    );
                    response.status(200);
                    response.json(kurs);
                } else {
                    response.sendStatus(404);
                }
            } else {
                response.sendStatus(500);
            }
        });
});

// Kurslöschen Route (Admin); Sophie Multiszewski

router.delete("/delete/kurs/:id", (req: express.Request, res: express.Response) => {
    if (req.session.fk_benutzegruppen_id === 2) {
        const deleteKurs: string = "DELETE FROM `kurs` WHERE `pk_kurs_id`= ?;";

        connection.query(deleteKurs, [req.params.id], (err: MysqlError, result: any) => {
            if (!err) {

                res.status(200);
                res.send("Kurs erfolgreich gelöscht");

            } else {
                res.send("Fehler in der Datenbank" + err.code).status(505);
            }
        });
    } else {
        res.status(401).send("Nicht erlaubt");

    }
});

// TODO Alle Routen vor "router.listen(8080)" schreiben!

router.listen(8080, "localhost", () => {
    console.log("http://localhost:8080/");
});

/* GET-Route von Jessica Palladino & Anastasia Ruppel
 GET-Route von Jessica Palladino & Anastasia Ruppel
 router.get("/login/profil/:id", (req: express.Request, res: express.Response) => {
    const id: number = req.params.id;

    const readQuery: string = "SELECT * FROM benutzer WHERE pk_benutzer_id = ?;";
    connection.query(readQuery, [id],
        (err: mysql.MysqlError | null, results: any) => {
            if (err === null) {
                if (results.length === 1) {
                    const user: Logged = {
                        luserid: results[0].luserid, lvorname: results[0].lvorname, lnachname: results[0].lnachnname,
                    };
                    res.status(200);
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(500);
            }
        });
}); */

// an der delete route wird gezeigt, wie man einbindet, dass diese nur für den Admin gilt

/*router.delete("/delete/benutzer/:id", (req: express.Request, res: express.Response) => {
       if (req.session.fk_benutzergruppen_id === 2) { // 2 steht für admin in der Datenbank

           const deleteUser: string = "DELETE FROM `benutzer` WHERE `pk_benutzer_id`= ?;";

           connection.query(deleteUser, [req.params.id], (err: MysqlError, result: any) => {
               if (!err) {

                   res.send("Benutzer gelöscht").status(200);

               } else {
                   res.send("Fehler in der Datenbank" + err.code).status(505);
               }

           });
       } else {
           res.status(401).send("Nicht erlaubt");  zw dem 1. if und 2.else gehört die route für den Admin
       }

   },
);*/
