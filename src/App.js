import CreateModal from "./components/CreateModal";
import DeleteModal from "./components/DeleteModal";
import UpdateModal from "./components/UpdateModal";
import ViewModal from "./components/ViewModal";
import DataRow from "./components/DataRow";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getDatas } from "./features/data/dataSlice";
import { openCreateModal } from "./features/modal/createModalSlice";

function App() {
  const { datas } = useSelector((store) => store.data);
  const { isCreateModalOpen } = useSelector((store) => store.createModal);
  const { isDeleteModalOpen } = useSelector((store) => store.deleteModal);
  const { isUpdateModalOpen } = useSelector((store) => store.updateModal);
  const { isViewModalOpen } = useSelector((store) => store.viewModal);
  const cityArray = datas.map((data) => data.city);
  const uniqueCities = [...new Set(cityArray)];
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByCity, setSortByCity] = useState(uniqueCities);
  const [filteredDatas, setFilteredDatas] = useState(datas);
  useEffect(() => {
    dispatch(getDatas());
  }, [dispatch]);
  useEffect(() => {
    let filtered = datas.filter((data) =>
      data.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    filtered = filtered.filter((data) => sortByCity.includes(data.city));
    if (sortByDate) {
      filtered = filtered.sort(
        (a, b) => new Date(a.birthDate) - new Date(b.birthDate)
      );
    }
    setFilteredDatas(filtered);
  }, [datas, searchTerm, sortByDate, sortByCity]);
  const handleSortByDateChange = () => {
    setSortByDate(!sortByDate);
  };
  const handleSortByCityChange = (city) => {
    if (sortByCity.includes(city)) {
      setSortByCity(sortByCity.filter((item) => item !== city));
    } else {
      setSortByCity([...sortByCity, city]);
    }
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 min-h-screen relative overflow-x-auto">
        {isCreateModalOpen && <CreateModal />}
        {isDeleteModalOpen && <DeleteModal />}
        {isUpdateModalOpen && <UpdateModal />}
        {isViewModalOpen && <ViewModal />}
        <h1 className="text-5xl">Table App</h1>
        <div className="py-4 px-7 w-full">
          <div className="flex flex-row items-center space-x-4">
            <input
              className="text-base border hover:border-black pl-1"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={sortByDate}
                onChange={handleSortByDateChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-sm text-gray-700">Sort by BirthDate</span>
            </div>
            <div className="flex items-center space-x-2">
              {uniqueCities.map((city) => (
                <label key={city} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={sortByCity.includes(city)}
                    onChange={() => handleSortByCityChange(city)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{city}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Birthdate
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
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDatas.map((data) => {
              return <DataRow key={data.id} {...data} />;
            })}
          </tbody>
        </table>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none mt-5"
          onClick={() => dispatch(openCreateModal())}
        >
          Create Data
        </button>
      </div>
    </section>
  );
}

export default App;
