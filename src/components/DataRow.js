const DataRow = ({ name, birthDate, gender, address, city, mobileNumber }) => {
  return (
    <tr>
      <td className="px-4 py-2 border">{name}</td>
      <td className="px-4 py-2 border">{birthDate}</td>
      <td className="px-4 py-2 border">{gender}</td>
      <td className="px-4 py-2 border">{address}</td>
      <td className="px-4 py-2 border">{city}</td>
      <td className="px-4 py-2 border">{mobileNumber}</td>
    </tr>
  );
};

export default DataRow;
