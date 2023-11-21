export function handleDateDifference(isoDate) {
  console.log(isoDate);
  
  const currentDate = new Date();
  console.log(currentDate);    

  const parsedDate = new Date(isoDate);
  console.log(parsedDate);    

  const timeDifference = currentDate - parsedDate;
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const monthsDifference = Math.floor(daysDifference / 30.4375); // Moyenne de jours par mois
  const yearsDifference = Math.floor(monthsDifference / 12);

  if (monthsDifference < 1) {
    // Moins d'un mois, afficher le nombre de jours
    return `${daysDifference} jour${daysDifference !== 1 ? 's' : ''}`;
  } else if (monthsDifference >= 1 && monthsDifference < 12) {
    // Entre 1 mois et moins d'un an, afficher le nombre de mois
    return `${monthsDifference} mois`;
  } else {
    // Plus d'un an, afficher le nombre d'années
    return `${yearsDifference} an${yearsDifference !== 1 ? 's' : ''}`;
  }
}
