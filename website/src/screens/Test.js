import OptionsForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/OptionsForm";
import VehicleKeyinfoForm from "../components/vehicleRelated/vehicleForm/VehicleKeyinfoForm";
import BrandForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/BrandForm";
import ModelForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/ModelForm";
import VehicleTypeForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/VehicleTypeForm";
import FuelTypeForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/FuelForm";
import TransmissionForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/TransmissionForm";
import ColorForm from "../components/vehicleRelated/vehicleForm/keyInfosForm/ColorForm";

export const Test = () => {
  return (
    <>
    <VehicleKeyinfoForm/> <br/>
    <OptionsForm /> <br/>
    <BrandForm /> <br/>
    <ModelForm /> <br/>
    <VehicleTypeForm/> <br/>
    <FuelTypeForm/> <br/>
    <TransmissionForm/> <br/>
    <ColorForm/> <br/>
    </>
  );
};

export default Test;
