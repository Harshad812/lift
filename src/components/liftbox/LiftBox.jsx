import clsx from "clsx";

export const LiftBox = (props) => {
  const { selectedPerson, handleSelectPerson } = props;
  return (
    <div className="lift-box">
      {Array(12)
        .fill(0)
        .map((_, i) => {
          return (
            <div className="lift-item" key={i}>
              <button
                className={clsx("person", {
                  "person-selected": selectedPerson.includes(i),
                })}
                onClick={() => handleSelectPerson(i)}
              ></button>
            </div>
          );
        })}
    </div>
  );
};
