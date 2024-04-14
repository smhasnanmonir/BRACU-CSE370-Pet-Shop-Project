import TopRated from "../../Home/TopRated/TopRated";

import Pets from "../../Pets/Pets";
import Vets from "../../Vets/Vets";

const AdminPanel = () => {
  return (
    <div>
      <Pets></Pets>
      <Vets></Vets>
      <TopRated></TopRated>
    </div>
  );
};

export default AdminPanel;
