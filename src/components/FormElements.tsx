import React, { useState } from "react";
import { useField } from "formik";

export const TextInput = ({ ...props }: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>
        <input type="text" {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const PasswordInput = ({ ...props }: any) => {
  const [passwordVissible, setPasswordVissible] = useState(false);
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>
        <input
          type={passwordVissible ? "text" : "password"}
          {...field}
          {...props}
        />
        <i
          className={passwordVissible ? "fa fa-eye" : "fa fa-eye-slash"}
          onClick={() => setPasswordVissible(!passwordVissible)}
        ></i>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

// export const Checkbox = ({ children, ...props }) => {
//   const [field, meta] = useField({ ...props, type: "checkbox" });
//   return (
//     <>
//       <label className="checkbox">
//         <input {...field} {...props} type="checkbox" />
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };
