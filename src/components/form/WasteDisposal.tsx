import styles from "./../styling/WasteDisposal.module.scss";
import { schedule } from "../../data/schedule";

const WasteDisposal: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        {Object.entries(schedule).map(([city, months]) => (
          <div key={city}>
            <h2>{city}</h2>
            {Object.entries(months).map(([month, wasteTypes]) => (
              <div key={month}>
                <h3>{month}</h3>
                {Object.entries(wasteTypes).map(([wasteType, dates]) => (
                  <p key={wasteType}>
                    {wasteType}: {dates.join(", ")}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default WasteDisposal;
