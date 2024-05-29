// ValidateurChaine.js
class ValidateurChaine {
    static reduireEtValiderChaine(chaine, longueurMax) {
      if (typeof chaine !== 'string') {
        console.error("L'argument 'chaine' doit être une chaîne de caractères.");
        return ''; // Retourne une chaîne vide ou lance une erreur selon votre préférence
      }
      let chaineModifiee = chaine.replace(/Appendices/g, "...");
      if (chaineModifiee.length > longueurMax) {
        return chaineModifiee.substring(0, longueurMax - 3) + "...";
      } else {
        return chaineModifiee;
      }
    }
  }
  
  export default ValidateurChaine;
  