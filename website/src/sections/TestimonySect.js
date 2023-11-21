import React, { useState, useEffect } from "react";
import { fetchDisplayedTestimonials } from "../serverRelated/ApiRequest";
import { handleDateDifference } from "../functions/handleDateDifference";
import ratingStars from "../functions/ratingStars"; // Importez la fonction, pas le composant React
import Container from "react-bootstrap/Container";

export const TestimonySect = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const data = await fetchDisplayedTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des témoignages :",
          error
        );
      }
    };

    getTestimonials();
  }, []);

  return (
    <section>
      <div className="bg-primary">
        <Container className="p-5">
          {testimonials.map(
            (testimony, index) => (
              console.log(testimony.note),
              (
                <div
                  key={index}
                  className="bg-light testimony-card text-center m-auto mb-5"
                >
                  <p>{ratingStars(testimony.note)}</p>
                  <p className="testimony-text">{testimony.testimony}</p>
                  <p>
                   <span className="testimony-name"> {testimony.name} </span><br />
                   <span className="testimony-date"> Il y a {handleDateDifference(testimony.posted_at)}</span> 
                  </p>
                </div>
              )
            )
          )}
        </Container>
      </div>
    </section>
  );
};
