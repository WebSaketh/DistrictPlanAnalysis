import { useState } from "react";
import ClusterCard from "./ClusterCard";

const ClusterTable = (props) => {
  const [page, setPage] = useState(0);
  const pageLength = 15;
  console.log(props.clusters);
  let i = 0;
  return (
    <div className="bg-gray-100">
      <div className="flex flex-row">
        <div className="m-2">Cluster Id</div>
        <div className="m-2">Republican</div>
        <div className="m-2">Democratic</div>
        <div className="m-2">White</div>
        <div className="m-2">Black</div>
        <div className="m-2">Hispanic</div>
        <div className="m-2">Asian</div>
      </div>
      {props.clusters
        .slice(
          page * pageLength,
          Math.min(props.clusters.length, page * pageLength + pageLength)
        )
        .map((cluster) => (
          <ClusterCard
            cluster={cluster}
            id={page * pageLength + i + 1}
            cs={i++}
          ></ClusterCard>
        ))}
    </div>
  );
};
export default ClusterTable;
