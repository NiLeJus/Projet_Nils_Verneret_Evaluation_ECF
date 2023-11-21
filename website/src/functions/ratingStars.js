import React from 'react';
import StarsIcons from '../components/general/StarsIcons';

// ratingStars.js
function ratingStars(rating) {
  console.log(rating)
  // Fonction pour calculer les étoiles en fonction du rating
  const calculateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return { fullStars, hasHalfStar, emptyStars };
  };

  const { fullStars, hasHalfStar, emptyStars } = calculateStars(rating);

  // Génère les étoiles en utilisant les composants SVG importés
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarsIcons.Full  className="star-icon" key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<StarsIcons.Half className="star-icon" key="half" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarsIcons.Empty className="star-icon" key={`empty${i}`} />);
    }
    console.log(stars)
    return stars;
  };

  return <div className="rating-stars">{renderStars()}</div>;
}

export default ratingStars;
