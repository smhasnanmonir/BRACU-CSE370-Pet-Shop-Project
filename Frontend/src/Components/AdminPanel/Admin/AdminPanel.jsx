import TopRated from "../../Home/TopRated/TopRated";

import Pets from "../../Pets/Pets";
import Vets from "../../Vets/Vets";
import ManageOrders from "../ManageOrders/ManageOrders";

const AdminPanel = () => {
  return (
    <div className="mb-4">
      <h3 className="text-center mt-4">Manage Pets</h3>
      <Pets></Pets>
      <h3 className="text-center mb-4">Manage Vets</h3>
      <Vets></Vets>
      <h3 className="text-center mb-4">Manage Products</h3>
      <TopRated></TopRated>
      <h3 className="text-center mb-4">Manage Customer Orders</h3>
      <ManageOrders></ManageOrders>
    </div>
  );
};

export default AdminPanel;
