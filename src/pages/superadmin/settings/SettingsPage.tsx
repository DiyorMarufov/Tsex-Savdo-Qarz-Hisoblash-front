import { memo, useEffect } from "react";

const SettingsPage = () => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div>
      <h2>SettingsPage</h2>
    </div>
  );
};

export default memo(SettingsPage);
