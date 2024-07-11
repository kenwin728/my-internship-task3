import { useDispatch, useSelector } from "react-redux";
import { closeDeleteModal } from "../features/modal/deleteModalSlice";
import { deleteData } from "../features/data/dataSlice";

const DeleteModal = ({ cityArray, sortByCity, handleSortByCityChange }) => {
  const { datas, idToViewEditDelete } = useSelector((store) => store.data);
  const dispatch = useDispatch();
  return (
    <aside className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10 flex items-center justify-center">
      <div className="bg-white w-[80vw] max-w-[400px] rounded py-8 px-4 text-center">
        <h4>Are you sure you want to delete this data?</h4>
        <div className="flex justify-around">
          <button
            type="button"
            className="uppercase rounded mt-9 border border-solid py-2 px-4 bg-transparent border-[#645cff] text-[#645cff] hover:bg-[#a29dff] shadow-[0_1px_3px_rgba(0,0,0,0.2)] cursor-pointer text-sm transition-all duration-[0.3s] ease-linear font-bold inline-block tracking-[0.25rem]"
            onClick={() => {
              const dataToBeDeleted = datas.find(
                (data) => data.id === idToViewEditDelete
              );
              const count = cityArray.filter(
                (city) => city === dataToBeDeleted.city
              ).length;
              if (count <= 1 && sortByCity.includes(dataToBeDeleted.city)) {
                handleSortByCityChange(dataToBeDeleted.city);
              }
              dispatch(deleteData());
              dispatch(closeDeleteModal());
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="uppercase rounded mt-9 border border-solid py-2 px-4 bg-transparent border-[hsl(360,67%,44%)] text-[hsl(360,67%,44%)] hover:bg-[hsl(360,71%,66%)] hover:text-[hsl(360,67%,44%)] hover:border-[hsl(360,71%,66%)] shadow-[0_1px_3px_rgba(0,0,0,0.2)] cursor-pointer text-sm transition-all duration-[0.3s] ease-linear font-bold inline-block tracking-[0.25rem]"
            onClick={() => {
              dispatch(closeDeleteModal());
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DeleteModal;
