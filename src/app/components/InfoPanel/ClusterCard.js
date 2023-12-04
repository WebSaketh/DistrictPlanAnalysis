const ClusterCard = (props) => {
  return (
    <div className="flex flex-row">
      <div className="m-2">{props.row.id}</div>
      <div className="m-2">{props.row.name}</div>
    </div>
  );
};
export default ClusterCard;
