import ClusterCard from "./ClusterCard";

const ClusterTable = (props) => {
  return (
    <div className="bg-gray-100">
      {props.data
        .slice(
          page * pageLength,
          Math.min(data.length, page * pageLength + pageLength)
        )
        .map((row) => (
          <ClusterCard row={row}></ClusterCard>
        ))}
    </div>
  );
};
export default ClusterTable;
