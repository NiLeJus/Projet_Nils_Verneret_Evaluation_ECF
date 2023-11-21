import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { capitalizeFirstLetter } from "../../../../functions/capitalizeFirstLetter";
import { fetchVehicleConditions } from "../../../../serverRelated/ApiRequest";

export const VehicleConditionForm = ({ onConditionChange }) => {
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    const handleFetchVehicleConditions = async () => {
      try {
        const data = await fetchVehicleConditions();

        const transformedConditions = data.map((condition) => ({
          value: condition.id.toString(),
          label: capitalizeFirstLetter(condition.name),
        }));

        setConditions(transformedConditions);
      } catch (error) {
        console.error("Error fetching conditions:", error);
      }
    };

    handleFetchVehicleConditions();
  }, []);

  const handleConditionChange = (selectedOption) => {
    setSelectedCondition(selectedOption);
    if (onConditionChange) {
      onConditionChange(selectedOption.value);
    }
  };

  return (
    <>
      <Select
        value={selectedCondition}
        onChange={handleConditionChange}
        options={conditions}
        isSearchable
      />
    </>
  );
};

export default VehicleConditionForm;
