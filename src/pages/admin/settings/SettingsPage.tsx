import { memo, useEffect } from "react";

const AdminSettingsPage = () => {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <div>
      <h2>AdminSettingsPage</h2>
    </div>
  );
};

export default memo(AdminSettingsPage);
