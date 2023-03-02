import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { addTraversal, getLastTraversal } from "../../api";
import { DownArrowIcon, UpArrowIcon } from "../../assets/icons/uparrow";
import { LiftBox, FloorButtonBox } from "../../components";

export const LiftTraversal = () => {
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [lastTraversalData, setLastTraversalData] = useState();
  const [liftDirection, setLiftDirection] = useState("up");
  const [loading, setLoading] = useState(false);

  const lastTraversal = useCallback(async () => {
    const response = await getLastTraversal();
    return response;
  }, []);

  useEffect(() => {
    (async () => {
      const response = await lastTraversal();
      setLastTraversalData(response);
      setSelectedFloor((response.toFloor ?? 1) - 1);
    })();
  }, [lastTraversal]);

  const handleSelectPerson = (i) => {
    if (selectedPerson.includes(i)) {
      setSelectedPerson((prev) => prev.filter((x) => x !== i));
    } else {
      setSelectedPerson((prev) => [...prev, i]);
    }
  };

  const handleSelectFloor = async (i) => {
    let liftDirection = "up";
    if (selectedPerson.length) {
      if (i < lastTraversalData?.toFloor) {
        liftDirection = "down";
      }
      setSelectedFloor(i);
      setLiftDirection(liftDirection);

      if (liftDirection === "up") {
        setLoading(true);
        for (
          let start = lastTraversalData?.toFloor || 0;
          start <= i + 1;
          start++
        ) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setLastTraversalData({ toFloor: start });
        }
        setLoading(false);
      } else {
        setLoading(true);
        for (let start = lastTraversalData?.toFloor; start >= i + 1; start--) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setLastTraversalData({ toFloor: start });
        }
        setLoading(false);
      }

      const response = await addTraversal({
        noOfPerson: selectedPerson.length ?? 0,
        fromFloor: lastTraversalData?.toFloor ?? 0,
        toFloor: i + 1 ?? 0,
        liftDirection: liftDirection ?? "up",
        date: new Date(),
      });

      if (response) {
        setLoading(false);
      }
    } else {
      alert("Please select a person");
    }
  };

  return (
    <div className="container">
      <LiftBox
        selectedPerson={selectedPerson}
        handleSelectPerson={handleSelectPerson}
      />
      <div className="floor-section">
        <div className="floor-counters-box">
          <div className="floor-counters">
            <span className={clsx("", { "floor-runing": loading })}>
              {lastTraversalData?.toFloor || 0}
            </span>
          </div>
          <div className="floor-direction">
            {liftDirection === "down" && (
              <DownArrowIcon width="42px" height="42px" fill="#16FF00" />
            )}
            {liftDirection === "up" && (
              <UpArrowIcon width="42px" height="42px" fill="#a84448" />
            )}
          </div>
        </div>
        <FloorButtonBox
          loading={loading}
          selectedFloor={selectedFloor}
          handleSelectFloor={handleSelectFloor}
        />
      </div>
    </div>
  );
};
