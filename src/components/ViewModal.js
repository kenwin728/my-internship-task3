import { useDispatch, useSelector } from "react-redux";
import { closeViewModal } from "../features/modal/viewModalSlice";

const ViewModal = () => {
  const dispatch = useDispatch();
  const { datas, idToViewEditDelete } = useSelector((store) => store.data);
  const dataToBeViewed = datas.find((data) => data.id === idToViewEditDelete);
  return (
    <aside className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10 flex items-center justify-center overflow-x-auto">
      <button
        className="absolute right-0 top-0 bg-red-600 w-6 h-6 hover:bg-red-700 rounded-lg"
        onClick={() => dispatch(closeViewModal())}
      >
        X
      </button>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              BirthDate
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Mobile
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {dataToBeViewed.name}
            </th>
            <td className="px-6 py-4">{dataToBeViewed.birthDate}</td>
            <td className="px-6 py-4">{dataToBeViewed.gender}</td>
            <td className="px-6 py-4">{dataToBeViewed.address}</td>
            <td className="px-6 py-4">{dataToBeViewed.city}</td>
            <td className="px-6 py-4">{dataToBeViewed.mobileNumber}</td>
          </tr>
        </tbody>
      </table>
    </aside>
  );
};

export default ViewModal;
