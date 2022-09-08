//Spinner import
import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = () => {
  return (
    <div className="w-screen h-screen flex bg-bgColor justify-center items-center">
      <ClipLoader color={"#000"} loading={true} size={50} />
    </div>
  );
};

export default LoadingSpinner;