const Tile = (props) => {
  return (
    <div className="collapse collapse-arrow rounded-lg p-3 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium">{props.title}</div>
      <div className="collapse-content">
        <p>
          {props.children}
          {props.state}
          {props.year}
          {props.district}
        </p>
      </div>
    </div>
  );
};
export default Tile;
