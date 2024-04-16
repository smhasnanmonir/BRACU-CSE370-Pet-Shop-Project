import TopRated from "../../Home/TopRated/TopRated";

import Pets from "../../Pets/Pets";
import Vets from "../../Vets/Vets";

const AdminPanel = () => {
  return (
    <div>
      <h3 className="text-center mt-4">Manage Pets</h3>
      <Pets></Pets>
      <h3 className="text-center mb-4">Manage Vets</h3>
      <Vets></Vets>
      <h3 className="text-center mb-4">Manage Products</h3>
      <TopRated></TopRated>
    </div>
  );
};

export default AdminPanel;
