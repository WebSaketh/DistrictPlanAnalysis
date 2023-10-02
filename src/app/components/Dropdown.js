//Takes prop "items" which is an array of strings to make

const Dropdown = (props) => {
  const names = props.items;
  const listItems = names.map((item, index) => (
    <li key={index} onClick={props.changeState}>
      <a>{item}</a>
    </li>
  ));
  return (
    <div className="dropdown dropdown-hover mt-0">
      <label
        tabIndex={0}
        className="btn m-1 bg-gray-300 border-gray-300 text-sm opacity-75 text-black"
      >
        {props.title}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
      >
        {listItems}
      </ul>
    </div>
  );
};

export default Dropdown;
