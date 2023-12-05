const ClusterCard = (props) => {
  return (
    <div className="flex flex-row">
      <div className="m-2">{props.id}</div>
      <div className="m-2">{props.cluster.clusterDemographics.republican}</div>
      <div className="m-2">{props.cluster.clusterDemographics.democratic}</div>
      <div className="m-2">{props.cluster.clusterDemographics.white}</div>
      <div className="m-2">{props.cluster.clusterDemographics.black}</div>
      <div className="m-2">{props.cluster.clusterDemographics.hispanic}</div>
      <div className="m-2">{props.cluster.clusterDemographics.asian}</div>
    </div>
  );
};
export default ClusterCard;
