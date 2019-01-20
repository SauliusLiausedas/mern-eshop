export function codeResponse(code) {
    switch (code) {
        case 401:
            return 'Neteisingi prisijungimo duomenys';
        case 404:
            return 'Nieko nerasta pagal šią užklausą';
        case 409:
            return 'Jau yra vartotojas su registruotas šiuo el. pašto adresu';
        case 422:
            return 'Neužpildėte privalomų laukelių';
    }
}