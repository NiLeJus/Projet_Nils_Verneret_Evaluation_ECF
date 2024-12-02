import { AboutSect } from "../sections/AboutSect";
import { TestimonySect } from "../sections/TestimonySect";
import { ReactComponent as Logo } from "../visuals/brand/LOGO_FULL_LIGHT.svg";

export const Home = () => {
  return (
    <div className="bg-image pt-5">

      <div className=" btn-wrapper">

      <Logo className="home-logo" />
      </div>
   
      <div className="container btn-wrapper text-slogan text-center">
        <p>
          Votre vehicule au meilleur prix, <br /> entre les meilleures mains.
        </p>
      </div>
      <div className="line mt-5"></div>
      <AboutSect />
      <TestimonySect className="pt-5" />
    </div>
  );
};
