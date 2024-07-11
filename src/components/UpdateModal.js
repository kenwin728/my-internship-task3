import { Formik, Form } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { closeUpdateModal } from "../features/modal/updateModalSlice";
import { MyTextInput, MySelect, DatePickerField } from "./CreateModal";
import { updateData } from "../features/data/dataSlice";

const UpdateModal = ({ uniqueCities, handleSortByCityChange }) => {
  const dispatch = useDispatch();
  const { datas, idToViewEditDelete } = useSelector((store) => store.data);
  const dataToBeUpdated = datas.find((data) => data.id === idToViewEditDelete);
  return (
    <div className="flex items-center justify-center fixed bg-black bg-opacity-70 z-10 w-full h-full overflow-auto">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <button
          className="absolute right-0 top-0 bg-red-600 w-6 h-6 hover:bg-red-700 rounded-lg"
          onClick={() => dispatch(closeUpdateModal())}
        >
          X
        </button>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Update
          </h1>
          <Formik
            initialValues={{
              name: dataToBeUpdated.name,
              birthDate: dataToBeUpdated.birthDate,
              gender: dataToBeUpdated.gender,
              address: dataToBeUpdated.address,
              city: dataToBeUpdated.city,
              mobileNumber: dataToBeUpdated.mobileNumber,
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
              if (!uniqueCities.includes(values.city)) {
                handleSortByCityChange(values.city);
              }
              dispatch(updateData(values));
              setSubmitting(false);
              resetForm();
              dispatch(closeUpdateModal());
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
                  Update
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
