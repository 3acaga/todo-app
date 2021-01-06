import { useCallback } from "react";
import { useField } from "formik";
import { endOfDay } from "date-fns";
import PropTypes from "prop-types";

import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";
import generatePicker from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";

const DatePickerComponent = generatePicker(dateFnsGenerateConfig);

const FormDatePicker = ({ name, ...props }) => {
  const [field, , helpers] = useField(name);

  const handleChange = useCallback(
    (date) => {
      //
      helpers.setValue(endOfDay(date));
    },
    [helpers],
  );

  return (
    <DatePickerComponent
      //
      name={name}
      value={field.value}
      onChange={handleChange}
      {...props}
    />
  );
};

FormDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormDatePicker;
