import { useState } from "react";
import ClusterTable from "src/app/components/InfoPanel/ClusterTable.js";
/*const data = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Victor Wayne" },
  { id: 3, name: "Jane Doe" },
  { id: 1, name: "John Doe" },
  { id: 2, name: "Victor Wayne" },
  { id: 3, name: "Jane Doe" },
  { id: 1, name: "John Doe" },
  { id: 2, name: "Victor Wayne" },
  { id: 3, name: "Jane Doe" },
  { id: 1, name: "John Doe" },
  { id: 2, name: "Victor Wayne" },
  { id: 3, name: "Jane Doe" },
  { id: 1, name: "John Doe" },
  { id: 2, name: "Victor Wayne" },
  { id: 3, name: "Jane Doe" },
  { id: 1, name: "John Doe" },
  { id: 2, name: "Victor Wayne" },
  { id: 3, name: "Jane Doe" },
  { id: 1, name: "John Doe" },
  { id: 2, name: "Victor Wayne" },
  { id: 3, name: "Jane Doe" },
  { id: 1, name: "John Doe" },
  { id: 2, name: "Victor Wayne" },
  { id: 3, name: "Jane Doe" },
];*/
const InfoPanel = (props) => {
  const [page, setPage] = useState(1);
  const pageLength = 15;
  return (
    <div className="flex-1 m-5 text-center content-center lg:h-full lg:w-full lg:mb-0  lg:text-left flex-1">
      <div className="bg-gray-100">PROGRESSBAR</div>
      <ClusterTable clusters={props.clusters}></ClusterTable>
      <div className="bg-gray-100">HEY</div>
    </div>
  );
};
export default InfoPanel;
