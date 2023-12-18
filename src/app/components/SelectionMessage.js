const SelectionMessage = () => {
  return (
    <div
      className="flex flex-1 text-center w-full h-full mt-24"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%", // 100% of the viewport height
        width: "100%", // 100% of the parent container width
        textAlign: "center",
        color: "grey", // Change text color to grey
        fontFamily: "Helvetica-Bold", // Use Roboto font
        fontSize: "24px", // Set font size to 24 pixels
      }}
    >
      <p>Please Select an Ensemble and Distance Measure</p>
    </div>
  );
};

export default SelectionMessage;
