import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { closeCreateModal } from "../features/modal/createModalSlice";
import { addData } from "../features/data/dataSlice";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

const DatePickerField = ({ label, ...props }) => {
  const [field, meta, { setValue }] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <DatePicker
        {...field}
        {...props}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        selected={field.value ? new Date(field.value) : null}
        onChange={(date) => {
          const formattedDate = format(date, "MM/dd/yyyy");
          setValue(formattedDate);
        }}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

const CreateModal = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 z-10 relative">
      <button
        className="absolute right-0 top-0 bg-red-600 w-6 h-6 hover:bg-red-700 rounded-lg"
        onClick={() => dispatch(closeCreateModal())}
      >
        X
      </button>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create
        </h1>
        <Formik
          initialValues={{
            name: "",
            birthDate: "",
            gender: "",
            address: "",
            city: "",
            mobileNumber: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            mobileNumber: Yup.string()
              .phone("PH", "not valid mobile number")
              .required("Required"),
            address: Yup.string().required("Required"),
            gender: Yup.string()
              .required("Required")
              .test("valid-gender", "Invalid gender", function (value) {
                return ["Male", "Female"].includes(value);
              }),
            birthDate: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(addData(values));
            setSubmitting(false);
            resetForm();
            dispatch(closeCreateModal());
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 md:space-y-6">
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Enter name"
              />
              <DatePickerField
                label="Birth Date"
                name="birthDate"
                placeholderText={"Please select a date"}
              />
              <MySelect label="Gender" name="gender">
                <option value="">Choose gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </MySelect>
              <MyTextInput
                label="Address"
                name="address"
                type="text"
                placeholder="Enter address"
              />
              <MyTextInput
                label="City"
                name="city"
                type="text"
                placeholder="Enter city"
              />
              <MyTextInput
                label="Mobile Number"
                name="mobileNumber"
                type="text"
                placeholder="Enter mobile number"
              />
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={isSubmitting}
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateModal;
