export function formatDateToDmy(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2); // Prend les deux derniers chiffres de l'année
  
    return `${day}/${month}/${year}`;
  }