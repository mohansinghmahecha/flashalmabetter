import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyFlash() {
  const data = useSelector((state) => state.groupCreating);
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);

  // Filter data from Redux state (triggered by changes in data or on mount)
  useEffect(() => {
    const filtered = data.filter(
      (item) => item && item.groupName && item.groupDiscription
    );
    setFilteredData(filtered);
  }, [data]);

  const handleClick = (k) => {
    navigate(`/fullDetailPage/${k}`);
  };

  const [limitedData, setLimitedData] = useState(4);

  return (
    <div>
      {/* if data is more than 0 then show data otherwise show the default paragraph */}
      {filteredData.length > 0 ? (
        <div className="flex w-90 ml-8 mr-8 gap-10 p-8 flex-wrap justify-start">
          {filteredData.slice(0, limitedData).map((item, key) => (
            <div
              key={key}
              className="w-[255px] h-[215px] p-1 flex flex-col items-center overflow-hidden"
            >
              <div className="flex w-full justify-center">
                <img
                  src={item.groupImage}
                  alt=""
                  width={80}
                  height={60}
                  className="rounded-full overflow-hidden object-cover p-1"
                  style={{ marginTop: "-25px" }}
                />
              </div>
              <h1 className="font-bold">{item.groupName}</h1>
              <p className="mt-5">
                <span>{item.groupDiscription}</span>
                <span className="hidden">{item.itemId}</span>
              </p>
              <button
                className="border border-red-600 ml-1 mr-1 mt-5 w-full"
                onClick={() => handleClick(item.itemId)}
              >
                View Card
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* if data not available  */
        <p className="text-center">No Data available, create it.</p>
      )}
      <div className="flex justify-end p-10">
        {/* when clicked see all button it will show the all availbe data  */}
        <button
          className="border border-red-900 p-2 rounded-lg"
          onClick={() => setLimitedData(filteredData.length)}
        >
          See All
        </button>
      </div>
    </div>
  );
}
