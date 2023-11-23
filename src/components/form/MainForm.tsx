import React from "react";

export const MainForm = () => {
  return (
    <div>
      <form>
        <label htmlFor="typeofwaste">Wybierz Rodzaj Smieci</label>
        <input type="text" id="typeofwaste" name="typeofwaste" />
        <label htmlFor="month">Wybierz Miesiac </label>
        <input type="text" id="month" name="month" />
      </form>
      <button>Sprawdz</button>
    </div>
  );
};
export default MainForm;
