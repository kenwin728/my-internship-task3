import CreateModal from "./components/CreateModal";
import DeleteModal from "./components/DeleteModal";
import UpdateModal from "./components/UpdateModal";
import ViewModal from "./components/ViewModal";
import DataRow from "./components/DataRow";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDatas } from "./features/data/dataSlice";

function App() {
  const { datas } = useSelector((store) => store.data);
  const { isCreateModalOpen } = useSelector((store) => store.createModal);
  const { isDeleteModalOpen } = useSelector((store) => store.deleteModal);
  const { isUpdateModalOpen } = useSelector((store) => store.updateModal);
  const { isViewModalOpen } = useSelector((store) => store.viewModal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDatas());
  }, [dispatch]);
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 min-h-screen mx-auto">
        {isCreateModalOpen && <CreateModal />}
        {isDeleteModalOpen && <DeleteModal />}
        {isUpdateModalOpen && <UpdateModal />}
        {isViewModalOpen && <ViewModal />}
        <table className="bg-white border border-gray-300 absolute">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Birthdate</th>
              <th className="px-4 py-2 border">Gender</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">City</th>
              <th className="px-4 py-2 border">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data) => {
              return <DataRow key={data.id} {...data} />;
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default App;
