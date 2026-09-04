# Configurare înainte de lansare

Câmpurile de mai jos, din `src/lib/site.ts`, sunt goale în acest moment. Fiecare pagină care le folosește este
construită să afișeze secțiunea corespunzătoare doar dacă valoarea este completată (funcția `hasValue()`) sau, în
cazul scripturilor de analitice, să nu încarce scriptul deloc până la completare. Nu trebuie modificat nimic altceva
în cod, doar valorile din acest fișier.

Rulează `grep -n "''" src/lib/site.ts` pentru a vedea rapid ce mai e necompletat.

## Date de companie

| Câmp | Descriere | Unde apare |
|---|---|---|
| `phone` | Telefon de contact | Footer, `/contacte` |
| `anreLicenseNumber` | Numărul licenței ANRE | Footer, homepage, `/despre-noi/licenta-si-transparenta` |
| `anreLicenseDate` | Data eliberării licenței ANRE | `/despre-noi/licenta-si-transparenta` |
| `eicCode` | Codul EIC, de verificat pe anre.md | `/despre-noi/licenta-si-transparenta` |
| `idno` | IDNO Eco Solar Park SRL | Footer, `/contacte`, `/despre-noi/licenta-si-transparenta`, `/politica-de-confidentialitate`, `/termeni-si-conditii` |
| `legalAddress` | Adresa juridică | Aceleași pagini ca `idno`. Odată completată, pe `/contacte` apare automat un link către Google Maps construit din adresă |
| `facebookUrl`, `linkedinUrl`, `instagramUrl` | Linkuri către rețelele sociale existente | Footer, `/contacte` (iconițe, doar pentru câmpurile completate) |

## Servicii externe

| Câmp | Descriere |
|---|---|
| `web3formsKey` | Cheie de acces Web3Forms (cont pe web3forms.com), pentru formularul de ofertă |
| `ga4Id` | ID Google Analytics 4 |
| `gscVerification` | Cod de verificare Google Search Console |
| `clarityId` | ID de proiect Microsoft Clarity |
| `bingUetTagId` | UET tag din Bing/Microsoft Advertising |

Site-ul are un banner real de consimțământ cookie (`src/components/CookieConsent.astro`), cu „Acceptă toate” /
„Respinge opționale” / „Personalizează”, plus un link „Setări cookie” în footer. Google Analytics și Microsoft
Clarity se încarcă doar dacă utilizatorul acceptă categoria „Analitice”; Bing/Microsoft Advertising doar la
acceptarea categoriei „Publicitare”. Niciunul dintre cele trei scripturi nu se încarcă dacă ID-ul corespunzător nu
e completat, indiferent de consimțământ.

## Activitate și piață

| Câmp | Descriere | Unde apare |
|---|---|---|
| `ownGenerationDescription` | Descriere factuală a capacităților proprii de producție (fotovoltaic/eolian), cu MW instalați reali, dacă există | `/despre-noi/licenta-si-transparenta` |
| `wholesaleMarketNote` | Participarea reală la piețele organizate PZU/PPZ (OPEM) sau la alte tranzacții angro | `/piata-libera-energie-electrica`, `/despre-noi/licenta-si-transparenta` |
| `preParticipantsCount` | Numărul de producători activi în grupul PRE administrat de Ecosolar | `/servicii-echilibrare-pre` |
| `clientPlatformStatus` | Dacă platforma de client (contorizare, facturare electronică, prognoză) este live | Homepage; până la completare, cardul afișează în schimb suportul telefonic/email |
| `ppaThresholdText` | Pragul de consum de la care se propune o structură de tip PPA | `/pentru-afaceri/solutii-industriale` |
| `switchingProcessingDays` | Termenul real de procesare a cererii de schimbare a furnizorului | `/piata-libera-energie-electrica` (FAQ) |
| `returnToRegulatedSupplierNote` | Condițiile reale de revenire la furnizorul reglementat | `/piata-libera-energie-electrica` (FAQ) |

## Prețuri

`currentEcosolarTariffBaniKWh` și `currentRegulatedTariffBaniKWh` sunt rezervate pentru tariful real Ecosolar și
tariful reglementat ANRE curente, în bani/kWh. Nu sunt conectate momentan la nicio pagină: calculatorul de pe
`/calculator-economie` colectează doar consumul și tariful actual al vizitatorului și trimite datele spre formularul
de ofertă, fără să afișeze o economie estimată, pentru că nu există încă un tarif Ecosolar public de comparat.
Odată completate ambele cifre, se poate decide dacă un calcul de economie afișat public are sens.

## Documente

`contractTemplateUrl`, `switchRequestFormUrl` și `powerOfAttorneyTemplateUrl` așteaptă căi către fișiere reale
(model de contract de furnizare, formular de cerere de schimbare a furnizorului, model de împuternicire). Fișierele
se încarcă în `public/documente/`, iar câmpurile primesc calea rezultată (de exemplu `/documente/contract-model.pdf`).
Odată completat cel puțin unul, pe pagina `/oferta` apare automat un bloc „Documente utile” cu linkurile
corespunzătoare.

## Ce nu e în acest fișier

- **Detalii bancare**: nu se afișează pe site public, sunt necesare doar pentru șabloanele proprii de contract și
  facturare ale companiei.
- **Studii de caz**: pagina dedicată nu există încă, pentru că nu există cifre de economie confirmate de clienți
  reali. Se adaugă separat, când apar.
- **Fotografii ale obiectivelor**: se adaugă direct în `public/` și, dacă e cazul, în `og-image.jpg` sau în hero-ul
  homepage-ului.
- **Adresa de destinație a formularelor**: contactul afișat pe site e `SITE.email`, dar destinatarul real al
  emailurilor trimise prin formular e stabilit de contul Web3Forms asociat cu `web3formsKey`, nu de acest câmp.

## Revizuire juridică

`politica-de-confidentialitate`, `politica-cookie` și `termeni-si-conditii` (ro și ru) au nevoie de o revizuire
juridică finală înainte de publicare.

## Verificări finale

- [ ] `grep -n "''" src/lib/site.ts` nu ar trebui să mai listeze câmpuri esențiale pentru lansare.
- [ ] Formularul de pe `/oferta` și `/contacte` livrează efectiv un email.
- [ ] Bannerul de cookie funcționează pe mobil și desktop, în ambele limbi.
- [ ] JSON-LD validat cu Google Rich Results Test pe homepage, un articol și o pagină cu FAQ.
- [ ] `sitemap-index.xml` trimis în Google Search Console.
- [ ] Comutatorul de limbă RO/RU testat pe câteva pagini diferite.
