function verifier() {
    let numeroCarte = document.getElementById("numeroCarte").value;
    let moisExp = document.getElementById("moisExp").value;
    let anneeExp = document.getElementById("anneeExp").value;
    let CVV = document.getElementById("cvv").value;

    let resultat = verifierCarte(numeroCarte, moisExp, anneeExp, CVV);
    let messageEl = document.getElementById("message");

    messageEl.textContent = resultat.message;
    messageEl.className = resultat.valid ? "message success" : "message error";
}

function verifierCarte(numeroCarte, moisExp, anneeExp, CVV) {
    let typeCarte = identifierTypeCard(numeroCarte);
    if (typeCarte === "Type Inconnu") {
        return { valid: false, message: "Votre carte n'est pas reconnue." };
    }
    if (!verifierLuhn(numeroCarte)) {
        return { valid: false, message: "Numéro de carte invalide." };
    }
    if (!verifierDateExp(moisExp, anneeExp)) {
        return { valid: false, message: "Votre carte est expirée!" };
    }
    if (!verifierCVV(CVV, typeCarte)) {
        return { valid: false, message: "CVV invalide!" };
    }
    return { valid: true, message: "Super, vous pouvez payer." };
}

function verifierDateExp(mois, annee) {
    let maintenant = new Date();
    let anneeActuelle = maintenant.getFullYear();
    let moisActuel = maintenant.getMonth() + 1;
    annee = parseInt(annee, 10);
    mois = parseInt(mois, 10);
    return annee > anneeActuelle || (annee === anneeActuelle && mois >= moisActuel);
}

function verifierLuhn(numeroCarte) {
    let somme = 0;
    let alterner = false;
    numeroCarte = numeroCarte.replace(/\D/g, ""); 

    for (let i = numeroCarte.length - 1; i >= 0; i--) {
        let chiffre = parseInt(numeroCarte[i], 10);
        if (alterner) {
            chiffre *= 2;
            if (chiffre > 9) chiffre -= 9;
        }
        somme += chiffre;
        alterner = !alterner;
    }
    return (somme % 10 === 0);
}

function verifierCVV(CVV, typeCarte) {
    if (!/^[0-9]{3,4}$/.test(CVV)) return false;
    if ((typeCarte === "AmericanExpress" && CVV.length !== 4) || (typeCarte !== "AmericanExpress" && CVV.length !== 3)) {
        return false;
    }
    return true;
}

function identifierTypeCard(numeroCarte) {
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(numeroCarte)) return "Visa";
    if (/^5[1-5][0-9]{14}$|^22[2-9][0-9]{12}$|^2[3-7][0-9]{13}$/.test(numeroCarte)) return "MasterCard";
    if (/^3[47][0-9]{13}$/.test(numeroCarte)) return "AmericanExpress";
    if (/^6011[0-9]{12}$|^6221[2-9][0-9]{10}$|^622[6-9][0-9]{11}$|^64[4-9][0-9]{13}$|^65[0-9]{14}$/.test(numeroCarte)) return "Discover";
    return "Type Inconnu";
}