import { useState } from "react";
import ClusterCard from "./ClusterCard";

const ClusterTable = (props) => {
  const [page, setPage] = useState(1);
  const pageLength = 15;
  return (
    <div className="bg-gray-100">
      {props.data
        .slice(
          page * pageLength,
          Math.min(props.data.length, page * pageLength + pageLength)
        )
        .map((row) => (
          <ClusterCard row={row}></ClusterCard>
        ))}
    </div>
  );
};
export default ClusterTable;
