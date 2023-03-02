import clsx from "clsx";

export const FloorButtonBox = (props) => {
  const { selectedFloor, handleSelectFloor, loading } = props;
  const totalFloor = 10;
  return (
    <div className="floor-box">
      <div className="floor-button-box">
        {Array(10)
          .fill(0)
          .map((_, i) => {
            return (
              <div className="item" key={i}>
                <button
                  className={clsx("floor", {
                    "floor-selected": selectedFloor === totalFloor - i - 1,
                  })}
                  disabled={selectedFloor === totalFloor - i - 1 || loading}
                  onClick={() => handleSelectFloor(totalFloor - i - 1)}
                >
                  {totalFloor - i}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
